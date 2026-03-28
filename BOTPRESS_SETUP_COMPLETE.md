# Botpress 完整設置指南

## 選擇方案：Botpress（簡單無代碼）

---

## 步驟 1：註冊 Botpress

### 1.1 訪問官網
```
https://botpress.com
```

### 1.2 點擊 "Get Started"
- 右上角紫色按鈕

### 1.3 註冊方式
**推薦**：Continue with GitHub（用你現有的 GitHub 賬號）

---

## 步驟 2：創建 Bot

### 2.1 進入 Dashboard
註冊後自動進入主控台

### 2.2 點擊 "Create Bot"
- 中央大按鈕，或右上角 **+** 號

### 2.3 選擇模板
選擇 **"From Scratch"**（從空白開始）

### 2.4 填寫信息
```
Bot Name: Southwind AI Counselling
Description: 南風心理輔導室 - AI心理輔導助手
```

### 2.5 點擊 "Create Bot"
等待創建完成...

---

## 步驟 3：連接 Telegram

### 3.1 進入 Integrations
左側面板點擊 **Integrations**（🔌 插頭圖標）

### 3.2 找到 Telegram
向下滾動，找到 **Telegram**（綠色紙飛機圖標）

### 3.3 點擊 "Install"
進入 Telegram 配置頁面

### 3.4 輸入 Bot Token
輸入你的 Token：
```
8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
```

### 3.5 保存並啟用
- 點擊 **Save Configuration**
- 點擊 **Enable**（變成綠色 ✅）

---

## 步驟 4：設置 AI 功能

### 4.1 啟用 AI
1. 左側點擊 **"AI"** 或 **"Studio"**
2. 找到 **"AI Tasks"** 或 **"Generate Content"**
3. 確保 AI 已啟用

### 4.2 設置 AI 人設
在 **Personality** 或 **Instructions** 中輸入：

```
你是南風心理輔導室的專業AI輔導助手。

服務信息：
- 月費計劃：HK$299/月（AI輔導 + 每月1次真人諮詢）
- 年費計劃：HK$2,999/年（AI輔導 + 每月2次真人諮詢）
- 付款：Stripe信用卡或FPS轉數快（ID: 91946650）
- 聯絡：WhatsApp 9194 6650

回覆原則：
1. 先傾聽和同理用戶情緒
2. 提供簡單的心理健康建議
3. 適時引導預約專業服務
4. 使用繁體中文和香港用語
5. 語氣溫暖、專業、有同理心
```

---

## 步驟 5：設置歡迎消息

### 5.1 進入 Main 流程
左側點擊 **"Main"** 或 **"Flow"**

### 5.2 找到 Start 節點
看到藍色的 **Start** 節點

### 5.3 添加 Text 節點
1. 從 Start 拖線出來
2. 選擇 **Text** 節點
3. 輸入歡迎消息：

```
🌿 歡迎來到南風AI心理輔導！

我是你的 AI 輔導助手，24/7 在線陪伴你。

💚 我可以幫你：
• 情緒傾聽與心理支持
• 壓力管理建議
• 心理健康資訊
• 引導預約真人輔導

📋 常用命令：
/pricing - 查看價格方案
/pay - 立即付款
/contact - 聯絡真人輔導

💬 直接發送消息，我會用 AI 為你提供輔導！
```

---

## 步驟 6：添加命令回覆

### 6.1 添加 /pricing 命令
1. 點擊空白處的 **+**
2. 選擇 **Trigger**
3. 設置：
   - Condition: **Exact Match**
   - Text: `/pricing`
4. 連接到 **Text** 節點：

```
📋 價格方案：

🌿 月費：HK$299/月
🏆 年費：HK$2,999/年（省16%）

輸入 /pay 立即付款 💳
```

### 6.2 添加 /pay 命令
Trigger: `/pay`

Text:
```
💳 付款連結：

月費：https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200
年費：https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201

FPS轉數快：91946650
```

### 6.3 添加 /contact 命令
Trigger: `/contact`

Text:
```
📞 聯絡我們：

📱 WhatsApp：9194 6650
📧 Email：southwindcounselling@gmail.com
🌐 網站：https://southwind-counselling.vercel.app
```

---

## 步驟 7：設置 AI 自動回覆

### 7.1 添加 AI 節點
1. 在 Main 流程中添加 **AI Task** 或 **Generate Text** 節點
2. 設置輸入：用戶的消息
3. 設置輸出：AI 生成的回覆

### 7.2 配置 AI 參數
```
Model: GPT-4 (或 GPT-3.5-turbo 省費用)
Temperature: 0.7
Max Tokens: 800
```

### 7.3 連接流程
```
用戶消息 → AI 節點 → 生成回覆 → 發送給用戶
```

---

## 步驟 8：發布 Bot

### 8.1 點擊 Publish
右上角 **紫色 "Publish" 按鈕**

### 8.2 等待部署
顯示 "Publishing..." 等待 1-2 分鐘

### 8.3 發布成功
看到 "Your bot is live!" = ✅ 成功！

---

## 步驟 9：測試

### 9.1 打開 Telegram
搜索：`@southwindcounsellingbot`

### 9.2 點擊 START
發送 `/start`

### 9.3 測試功能
- `/pricing` - 查看價格
- `/pay` - 付款連結
- `我最近好焦慮` - 測試 AI 回覆

---

## 步驟 10：停止 Railway（重要！）

Botpress 和 Railway 會衝突，必須停止一個：

1. Railway App → southwind-counselling 項目
2. Settings → Delete 或 Pause

---

## 💰 費用確認

| 階段 | 方案 | 費用 |
|------|------|------|
| 測試期 | 免費版 | $0/月（500對話）|
| 正式運營 | 入門版 | $10/月（2,000對話）|

---

## 🎉 完成！

現在你有：
- ✅ 24/7 運行的 AI 輔導 Bot
- ✅ 完全雲端，無需電腦開機
- ✅ 內建 GPT-4 AI
- ✅ 無需編程，拖拽管理

**開始設置吧！有問題隨時截圖給我！**
