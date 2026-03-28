# 南風心理輔導室 - 充值系統技術架構（方案三）

## 系統架構圖

```
用戶 → Botpress Bot → 充值API → 支付網關 → 數據庫
              ↓
         管理員後台
```

## 技術棧選擇

| 組件 | 推薦技術 | 說明 |
|------|---------|------|
| **後端API** | Node.js + Express | 輕量、易部署 |
| **數據庫** | MongoDB / PostgreSQL | 存儲用戶餘額、充值記錄 |
| **支付網關** | Stripe + FPS | 國際+本地支付 |
| **部署** | Railway / Render | 免費額度、簡單部署 |
| **管理後台** | AdminJS / 自建前端 | 查看充值記錄 |

---

## 第一步：創建數據庫

### MongoDB Schema

```javascript
// User Model
const UserSchema = new mongoose.Schema({
  telegram_id: { type: String, required: true, unique: true },
  username: String,
  balance_hours: { type: Number, default: 0 }, // 剩餘小時數
  total_purchased: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

// Transaction Model
const TransactionSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  telegram_id: { type: String, required: true },
  package: String, // '5h', '10h', '20h', '50h'
  amount_hkd: Number,
  hours_added: Number,
  payment_method: String, // 'stripe', 'fps', 'alipay'
  payment_status: { type: String, enum: ['pending', 'completed', 'failed'] },
  stripe_session_id: String, // Stripe 會話ID
  fps_reference: String, // FPS 參考號
  created_at: { type: Date, default: Date.now },
  completed_at: Date
});

// Usage Log Model
const UsageLogSchema = new mongoose.Schema({
  telegram_id: { type: String, required: true },
  session_start: Date,
  session_end: Date,
  duration_minutes: Number,
  hours_deducted: Number,
  conversation_id: String
});
```

---

## 第二步：創建 API 服務

### 目錄結構
```
southwind-api/
├── server.js              # 主服務器
├── models/
│   ├── User.js
│   ├── Transaction.js
│   └── UsageLog.js
├── routes/
│   ├── payment.js         # 支付相關
│   ├── user.js            # 用戶餘額
│   └── admin.js           # 管理後台
├── services/
│   ├── stripe.js          # Stripe 集成
│   └── timer.js           # 計時服務
├── middleware/
│   └── auth.js            # 認證中間件
└── package.json
```

### server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// 連接數據庫
mongoose.connect(process.env.MONGODB_URI);

// 路由
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// 健康檢查
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 第三步：支付集成

### Stripe 集成（routes/payment.js）

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// 套餐配置
const PACKAGES = {
  '5h': { name: '5小時套餐', price: 35000, hours: 5 },   // 價格以cents為單位
  '10h': { name: '10小時套餐', price: 65000, hours: 10 },
  '20h': { name: '20小時套餐', price: 120000, hours: 20 },
  '50h': { name: '50小時套餐', price: 275000, hours: 50 }
};

// 創建支付會話
router.post('/create-session', async (req, res) => {
  const { telegram_id, package_id } = req.body;
  
  const pkg = PACKAGES[package_id];
  if (!pkg) return res.status(400).json({ error: 'Invalid package' });
  
  try {
    // 創建 Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'hkd',
          product_data: { name: pkg.name },
          unit_amount: pkg.price
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        telegram_id,
        package_id,
        hours: pkg.hours
      }
    });
    
    // 記錄交易
    await Transaction.create({
      user_id: telegram_id,
      telegram_id,
      package: package_id,
      amount_hkd: pkg.price / 100,
      hours_added: pkg.hours,
      payment_method: 'stripe',
      payment_status: 'pending',
      stripe_session_id: session.id
    });
    
    res.json({ session_url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook（支付成功回調）
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { telegram_id, package_id, hours } = session.metadata;
      
      // 更新交易狀態
      await Transaction.findOneAndUpdate(
        { stripe_session_id: session.id },
        { payment_status: 'completed', completed_at: new Date() }
      );
      
      // 添加餘額到用戶
      await User.findOneAndUpdate(
        { telegram_id },
        { 
          $inc: { 
            balance_hours: parseInt(hours),
            total_purchased: parseInt(hours)
          }
        },
        { upsert: true } // 如果用戶不存在則創建
      );
      
      // 通知 Botpress（可選）
      await notifyBotpress(telegram_id, hours);
    }
    
    res.json({ received: true });
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

module.exports = router;
```

---

## 第四步：用戶餘額 API

### routes/user.js

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 查詢餘額
router.get('/balance/:telegram_id', async (req, res) => {
  const user = await User.findOne({ telegram_id: req.params.telegram_id });
  res.json({ 
    balance_hours: user ? user.balance_hours : 0,
    total_purchased: user ? user.total_purchased : 0
  });
});

// 扣除使用時長（Botpress 調用）
router.post('/deduct', async (req, res) => {
  const { telegram_id, minutes_used } = req.body;
  const hours_used = Math.ceil(minutes_used / 60 * 100) / 100; // 保留2位小數
  
  const user = await User.findOne({ telegram_id });
  
  if (!user || user.balance_hours < hours_used) {
    return res.status(400).json({ 
      error: 'Insufficient balance',
      balance_hours: user ? user.balance_hours : 0
    });
  }
  
  await User.findOneAndUpdate(
    { telegram_id },
    { $inc: { balance_hours: -hours_used } }
  );
  
  res.json({ 
    success: true, 
    deducted: hours_used,
    remaining: user.balance_hours - hours_used
  });
});

module.exports = router;
```

---

## 第五步：管理後台

### routes/admin.js

```javascript
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// 基礎認證（生產環境使用更安全的認證）
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// 查看所有交易
router.get('/transactions', adminAuth, async (req, res) => {
  const transactions = await Transaction.find()
    .sort({ created_at: -1 })
    .limit(100);
  res.json(transactions);
});

// 查看所有用戶餘額
router.get('/users', adminAuth, async (req, res) => {
  const users = await User.find().sort({ created_at: -1 });
  res.json(users);
});

// 手動添加餘額（用於 FPS 付款確認）
router.post('/add-balance', adminAuth, async (req, res) => {
  const { telegram_id, hours, reference } = req.body;
  
  await User.findOneAndUpdate(
    { telegram_id },
    { $inc: { balance_hours: hours, total_purchased: hours } },
    { upsert: true }
  );
  
  await Transaction.create({
    telegram_id,
    package: 'manual',
    amount_hkd: 0,
    hours_added: hours,
    payment_method: 'fps',
    payment_status: 'completed',
    fps_reference: reference,
    completed_at: new Date()
  });
  
  res.json({ success: true });
});

module.exports = router;
```

---

## 第六步：Botpress 集成

### 在 Botpress 中調用 API

```javascript
// 檢查餘額
async function checkBalance(telegram_id) {
  const response = await fetch(
    `https://your-api.com/api/user/balance/${telegram_id}`
  );
  const data = await response.json();
  return data.balance_hours;
}

// 創建支付鏈接
async function createPayment(telegram_id, package_id) {
  const response = await fetch('https://your-api.com/api/payment/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telegram_id, package_id })
  });
  const data = await response.json();
  return data.session_url;
}

// 對話開始時檢查餘額
async function startConversation(telegram_id) {
  const balance = await checkBalance(telegram_id);
  
  if (balance <= 0) {
    return {
      message: "💳 你的餘額已用完，請先充值：\n\n5小時 - HK$350\n10小時 - HK$650 ⭐\n20小時 - HK$1,200",
      actions: [{
        type: 'button',
        label: '立即充值',
        action: 'open_payment'
      }]
    };
  }
  
  // 開始計時...
  return { can_start: true, balance };
}
```

---

## 第七步：部署

### Railway 部署

1. **創建 Railway 項目**
```bash
# 安裝 Railway CLI
npm install -g @railway/cli

# 登錄
railway login

# 初始化項目
cd southwind-api
railway init
```

2. **設置環境變量**
```
MONGODB_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
ADMIN_TOKEN=your_secure_admin_token
FRONTEND_URL=https://southwind-counselling.vercel.app
```

3. **部署**
```bash
railway up
```

---

## 第八步：前端管理界面（可選）

簡單的 React 管理後台：
- 查看充值記錄
- 查看用戶餘額
- 手動確認 FPS 付款
- 統計報表

---

## 📋 實施時間表

| 步驟 | 時間 | 說明 |
|------|------|------|
| 1. 數據庫設置 | 2小時 | MongoDB Atlas 免費版 |
| 2. API 開發 | 1-2天 | 核心支付功能 |
| 3. Stripe 集成 | 4小時 | 測試模式先測試 |
| 4. Botpress 連接 | 4小時 | 調試 API 調用 |
| 5. 管理後台 | 1天 | 簡單版本 |
| 6. 測試部署 | 1天 | 全面測試 |

**總計：4-5天完成**

---

## 💰 成本估算

| 組件 | 費用 |
|------|------|
| MongoDB Atlas | 免費（512MB）|
| Railway 部署 | 免費額度內 |
| Stripe 手續費 | 3.4% + HK$2.35/筆 |
| 總計 | 運營成本幾乎為零！|

---

## 🚀 開始第一步？

**建議先創建：**
1. MongoDB Atlas 賬號
2. Stripe 賬號
3. Railway 項目

要我幫你寫完整的代碼嗎？還是你要自己動手？
