# 部署指南

## 第一步：準備環境

### 1.1 註冊必要服務

| 服務 | 用途 | 鏈接 |
|------|------|------|
| **MongoDB Atlas** | 數據庫 | https://www.mongodb.com/atlas |
| **Stripe** | 支付處理 | https://dashboard.stripe.com |
| **Railway** | 部署API | https://railway.app |

---

## 第二步：設置 MongoDB

### 2.1 創建集群
1. 註冊 MongoDB Atlas（免費）
2. 創建新集群（選擇 AWS / Singapore 延遲較低）
3. 創建數據庫用戶（記住用戶名和密碼）
4. 在 Network Access 添加 `0.0.0.0/0`（允許所有IP）
5. 複製連接字符串：
   ```
   mongodb+srv://username:password@cluster.mongodb.net/southwind?retryWrites=true&w=majority
   ```

---

## 第三步：設置 Stripe

### 3.1 獲取 API 密鑰
1. 註冊 Stripe 賬號
2. 進入 Developers → API keys
3. 複製 **Secret key**（以 `sk_test_` 或 `sk_live_` 開頭）

### 3.2 設置 Webhook（支付成功通知）
1. 進入 Developers → Webhooks
2. 點擊 "Add endpoint"
3. Endpoint URL: `https://your-railway-url.com/api/payment/webhook`
4. 選擇事件：`checkout.session.completed`
5. 複製 Webhook 密鑰（以 `whsec_` 開頭）

---

## 第四步：部署到 Railway

### 4.1 準備代碼
```bash
# 在本地創建項目文件夾
mkdir southwind-recharge-api
cd southwind-recharge-api

# 創建所有文件（按之前提供的代碼）
# package.json
# server.js
# models/...
# routes/...

# 初始化 Git
git init
git add .
git commit -m "Initial commit"
```

### 4.2 上傳到 GitHub
```bash
# 在 GitHub 創建新倉庫
# 然後：
git remote add origin https://github.com/你的用戶名/southwind-recharge-api.git
git push -u origin main
```

### 4.3 Railway 部署
1. 登錄 Railway：https://railway.app
2. 點擊 "New Project"
3. 選擇 "Deploy from GitHub repo"
4. 選擇你的倉庫
5. 點擊 "Add Variables"，添加以下環境變量：

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/southwind?retryWrites=true&w=majority
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_TOKEN=隨機生成的安全字符串（至少20位）
FRONTEND_URL=https://southwind-counselling.vercel.app
```

6. Railway 會自動部署
7. 記住你的域名：`https://your-project.railway.app`

---

## 第五步：測試 API

### 5.1 健康檢查
```bash
curl https://your-project.railway.app/health
```

應該返回：
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "service": "Southwind Recharge API"
}
```

### 5.2 獲取套餐列表
```bash
curl https://your-project.railway.app/api/payment/packages
```

### 5.3 查詢餘額
```bash
curl https://your-project.railway.app/api/user/balance/你的TelegramID
```

---

## 第六步：更新 Stripe Webhook

部署後，更新 Stripe Webhook URL 為實際的 Railway 域名：
```
https://your-project.railway.app/api/payment/webhook
```

---

## 第七步：設置 Botpress

1. 在 Botpress 中設置環境變量：
   ```
   RECHARGE_API_URL=https://your-project.railway.app
   ```

2. 按照 `BOTPRESS_INTEGRATION.md` 創建 Actions 和 Flows

3. 測試整個流程

---

## 🎉 完成！

現在系統應該正常運行：
- ✅ 用戶可以充值
- ✅ 自動加餘額
- ✅ 自動扣時長
- ✅ 管理後台可查詢

---

## 🔧 故障排除

### 問題：MongoDB 連接失敗
**解決**：檢查 IP 白名單，確保 `0.0.0.0/0` 已添加

### 問題：Stripe Webhook 失敗
**解決**：檢查 Webhook URL 是否正確，檢查 Webhook Secret 是否正確

### 問題：API 返回 500
**解決**：查看 Railway Logs（Dashboard → Deployments → Logs）

### 問題：餘額不更新
**解決**：檢查 Stripe Webhook 是否正確設置，檢查 Webhook Secret

---

## 📞 支持

有任何問題，檢查：
1. Railway Logs
2. MongoDB Atlas 監控
3. Stripe Dashboard 事件記錄
