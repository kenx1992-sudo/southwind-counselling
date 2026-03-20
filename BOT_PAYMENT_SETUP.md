# Telegram Bot 支付系統配置指南

## Bot 命令設置

在 @BotFather 中執行：

```
/setcommands

start - 開始使用南風AI輔導
pricing - 查看價格方案  
pay - 立即付款
subscribe - 訂閱服務
status - 查看訂閱狀態
help - 幫助中心
contact - 聯絡真人輔導
```

---

## 支付方案配置

### 方案一：FPS 轉數快（推薦香港用戶）

**優點：**
- 零手續費
- 即時到賬
- 香港最普及

**設置步驟：**
1. 開通 FPS 商業收款（銀行或支付平台）
2. 獲取 FPS 二維碼或識別碼
3. Bot 發送 FPS 付款指引

**Bot 回覆模板：**
```
💚 選擇你的方案：

1️⃣ 基礎版 - HK$168/月
   • AI 無限對話
   • 基礎心理測評
   
2️⃣ 進階版 - HK$388/月  
   • AI 無限對話
   • 專業測評分析
   • 每月 1 次真人諮詢
   
3️⃣ 專業版 - HK$788/月
   • 全部功能
   • 每月 4 次真人諮詢
   • 優先預約權

請回覆數字 1/2/3 選擇方案，
我會發送 FPS 付款二維碼給你。

⚡ 首月半價優惠進行中！
```

---

### 方案二：Stripe 信用卡支付

**優點：**
- 國際通用
- 自動化處理
- 支持訂閱扣款

**設置步驟：**
1. 註冊 Stripe 賬號：https://stripe.com
2. 創建產品和價格方案
3. 獲取 API Key
4. 配置 Stripe Payment Link 或 Checkout

**Bot 回覆模板：**
```
💳 安全支付

我們使用 Stripe 加密支付，支持：
• Visa / Mastercard
• Apple Pay / Google Pay

請選擇方案：
[基礎版 HK$168] [進階版 HK$388] [專業版 HK$788]

點擊上方按鈕進入安全支付頁面。
```

---

## Bot 回覆流程腳本

### /start 命令
```
🌿 歡迎來到南風AI心理輔導

我是你的 AI 輔導助手，24/7 在線陪伴你。

💬 我可以幫你：
• 情緒傾聽與支持
• 壓力管理建議
• 心理健康資訊
• 預約真人輔導

💚 開始體驗：
/pricing - 查看價格方案
/help - 了解如何使用

或有任何想說的，直接告訴我 😊
```

### /pricing 命令
```
📋 南風心理輔導價格方案

🌱 基礎版 - HK$168/月
   AI 輔導 + 基礎測評
   
🌿 進階版 - HK$388/月  
   AI 輔導 + 專業測評 + 1次真人諮詢
   
🌳 專業版 - HK$788/月
   全部功能 + 4次真人諮詢 + 優先預約

🎁 首月半價優惠！
基礎版只需 HK$84

輸入 /pay 開始付款
或輸入 /contact 聯絡我們了解更多
```

### /pay 命令
```
💳 選擇支付方式：

🇭🇰 香港用戶：
[FPS 轉數快] - 免手續費，即時到賬

🌍 國際用戶：
[Stripe 信用卡] - 安全加密支付

請選擇你的支付方式 👆
```

---

## 自動化流程

### 付款確認後
```
✅ 付款確認成功！

感謝你訂閱南風心理輔導 💚

🎉 你的權益：
• AI 輔導：立即啟用
• 真人諮詢：請輸入 /booking 預約
• 心理測評：請輸入 /assessment

📱 保存此 Bot，隨時隨地開始對話！

有任何問題，輸入 /help 查看幫助。
```

### 續費提醒（到期前3天）
```
⏰ 訂閱續費提醒

你的方案將於 3 天後到期。

當前方案：[進階版]
續費金額：HK$388/月

輸入 /renew 立即續費
或輸入 /upgrade 升級方案
```

---

## 技術實現

### Webhook 設置
Bot 需要 Webhook 接收更新：
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-server.com/webhook
```

### 數據庫設計
```sql
users:
- user_id (Telegram ID)
- username
- subscription_plan (basic/premium/pro)
- subscription_start
- subscription_end
- payment_status
- fps_code (for verification)
```

### 支付確認流程
1. 用戶發送付款截圖
2. Bot 識別 FPS 交易編號
3. 人工/自動確認到賬
4. 更新用戶訂閱狀態
5. 發送確認消息

---

## 立即行動

### 你需要準備：

1. **開通 FPS 商業收款**
   - 聯絡你的銀行（HSBC/渣打/中銀等）
   - 或使用第三方支付平台（如 PayDollar）

2. **註冊 Stripe（可選）**
   - https://stripe.com
   - 適合海外用戶

3. **設置 Bot Webhook**
   - 需要伺服器或 serverless 函數

4. **手動驗證流程（MVP）**
   - 用戶發送付款截圖
   - 你手動確認後回覆 Bot
   - Bot 開通服務

---

## MVP 快速方案（今天可用）

**不寫代碼，純手動流程：**

1. Bot 發送 FPS 二維碼
2. 用戶付款後截圖發給 Bot
3. 你收到通知後手動確認
4. 回覆 Bot `/activate <user_id>`
5. Bot 開通用戶權益

這是最快上線的方式，之後再自動化！
