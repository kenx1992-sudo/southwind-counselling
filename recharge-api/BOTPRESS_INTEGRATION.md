# Botpress 集成指南

## 1. 在 Botpress 中調用充值 API

### 創建「檢查餘額」Action
```javascript
// 在 Botpress Studio 中創建 Action
async function checkBalance() {
  const telegramId = event.user.id;
  
  try {
    const response = await fetch(
      `https://your-api-url.com/api/user/balance/${telegramId}`
    );
    const data = await response.json();
    
    // 保存到會話變量
    session.balance_hours = data.balance_hours;
    session.total_purchased = data.total_purchased;
    
    if (data.balance_hours <= 0) {
      return {
        hasBalance: false,
        message: `💳 你的餘額已用完\n\n請先充值再開始輔導：\n\n5小時 - HK$350\n10小時 - HK$650 ⭐\n20小時 - HK$1,200`
      };
    }
    
    return {
      hasBalance: true,
      balance: data.balance_hours,
      message: `💚 你的餘額還有 ${data.balance_hours} 小時\n可以開始輔導了！`
    };
    
  } catch (error) {
    return {
      hasBalance: false,
      message: '❌ 檢查餘額失敗，請稍後再試'
    };
  }
}
```

### 創建「創建支付鏈接」Action
```javascript
async function createPaymentLink() {
  const telegramId = event.user.id;
  const username = event.user.username;
  const firstName = event.user.first_name;
  
  // 從用戶選擇獲取套餐
  const packageId = session.selected_package; // '5h', '10h', '20h', '50h'
  
  try {
    const response = await fetch('https://your-api-url.com/api/payment/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: telegramId,
        package_id: packageId,
        username: username,
        first_name: firstName
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        paymentUrl: data.session_url,
        message: `💳 請點擊以下鏈接完成付款：\n${data.session_url}\n\n付款成功後餘額會自動到賬！`
      };
    } else {
      return {
        success: false,
        message: '❌ 創建支付失敗，請稍後再試'
      };
    }
    
  } catch (error) {
    return {
      success: false,
      message: '❌ 系統錯誤，請稍後再試'
    };
  }
}
```

### 創建「開始計時」Action
```javascript
async function startSession() {
  const telegramId = event.user.id;
  const conversationId = event.conversation.id;
  
  try {
    const response = await fetch('https://your-api-url.com/api/user/session/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: telegramId,
        conversation_id: conversationId
      })
    });
    
    const data = await response.json();
    
    if (data.can_start) {
      session.session_id = data.session_id;
      session.session_start_time = new Date().toISOString();
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.message };
    }
    
  } catch (error) {
    return { success: false, message: '開始會話失敗' };
  }
}
```

### 創建「結束計時」Action
```javascript
async function endSession() {
  const telegramId = event.user.id;
  const sessionId = session.session_id;
  
  try {
    const response = await fetch('https://your-api-url.com/api/user/session/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: telegramId,
        session_id: sessionId
      })
    });
    
    const data = await response.json();
    return { success: true, message: data.message };
    
  } catch (error) {
    return { success: false, message: '結束會話失敗' };
  }
}
```

---

## 2. 對話流程設計

### Flow 1: 用戶發送消息時
```
用戶發送消息
    ↓
檢查餘額（checkBalance）
    ↓
有餘額？
    ↓ 是
啟動AI輔導（繼續正常對話）
    ↓ 否
顯示充值選項 → 創建支付鏈接
```

### Flow 2: 用戶點擊「充值」
```
用戶點擊充值按鈕
    ↓
顯示套餐選項（5h/10h/20h/50h）
    ↓
用戶選擇套餐 → 保存到 session.selected_package
    ↓
創建支付鏈接（createPaymentLink）
    ↓
顯示 Stripe 支付鏈接
    ↓
用戶完成支付 → Stripe Webhook 自動加餘額
```

### Flow 3: 開始/結束輔導
```
用戶說「開始輔導」或發送第一條消息
    ↓
開始計時（startSession）
    ↓
AI 進行輔導對話...
    ↓
用戶說「再見」或 10分鐘無消息
    ↓
結束計時（endSession）
    ↓
顯示本次使用時長和剩餘餘額
```

---

## 3. Botpress 快捷按鈕設置

### 主菜單按鈕
```
💬 開始輔導
💳 充值
📊 查詢餘額
❓ 幫助
```

### 充值頁面按鈕
```
5小時 - HK$350
10小時 - HK$650 ⭐推薦
20小時 - HK$1,200
50小時 - HK$2,750
📱 FPS轉數快（人工）
```

---

## 4. 自動回覆內容

### 餘額不足時
```
💳 你的餘額已用完（剩餘 0 小時）

請先充值再繼續使用AI輔導：

🎁 優惠套餐：
• 5小時 - HK$350
• 10小時 - HK$650 ⭐推薦
• 20小時 - HK$1,200

💡 小提示：每月使用超過4小時，
月費計劃（HK$299任用）更划算！

[立即充值] [查看月費計劃]
```

### 充值成功後（用戶查詢時顯示）
```
✅ 充值成功！

已為你添加 {hours} 小時
目前餘額：{balance} 小時

💚 現在可以開始輔導了！
```

### 輔導結束後
```
💚 本次輔導結束

⏱️ 使用時長：{duration} 分鐘
💰 扣除：{hours_used} 小時
📊 剩餘餘額：{remaining} 小時

感謝使用南風AI輔導！
有任何問題隨時回來 💚
```

---

## 5. 環境變量

在 Botpress 設置環境變量：
```
RECHARGE_API_URL=https://your-api-url.com
```

---

## 6. 測試清單

- [ ] 新用戶首次使用 → 顯示餘額為0 → 引導充值
- [ ] 充值流程 → Stripe支付 → 自動加餘額
- [ ] 開始輔導 → 正常對話
- [ ] 結束輔導 → 正確扣時長
- [ ] 餘額用完 → 再次引導充值
- [ ] 查詢餘額 → 顯示正確數字
