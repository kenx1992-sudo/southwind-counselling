# Bot 自動回覆設置指南

## 問題
用戶點擊 "START BOT" 後沒有反應

## 原因
1. Webhook URL 為空，Bot 無法接收消息
2. 沒有設置 /start 命令回應

---

## 快速修復方案

### 步驟 1：設置 Bot 描述（立即生效）

在 @BotFather 中：

```
/setdescription
選擇 @southwindcounsellingbot
```

輸入描述：
```
🌿 南風AI心理輔導 - 24/7智能陪伴

歡迎！我是你的AI輔導助手。

💚 如何使用：
1. 點擊下方「START BOT」按鈕
2. 或直接發送消息開始對話

📋 常用命令：
/pricing - 查看價格方案
/pay - 立即付款
/help - 使用幫助
/contact - 聯絡真人輔導

隨時隨地，我都在這裡陪伴你 💚
```

---

### 步驟 2：設置歡迎消息（About）

```
/setabouttext
選擇 @southwindcounsellingbot
```

輸入：
```
南風AI心理輔導 - 香港專業心理支持平台
24/7 AI陪伴 + 真人諮詢服務
```

---

### 步驟 3：設置命令列表

```
/setcommands
選擇 @southwindcounsellingbot
```

輸入：
```
start - 開始使用
pricing - 查看價格方案
pay - 立即付款
help - 幫助中心
contact - 聯絡真人輔導
```

---

## 進階：自動回覆 /start

如果需要 Bot 自動回覆，有兩種方式：

### 方式 1：使用現成工具（推薦）
使用 **ManyBot** 或 **Telegram Bot API** 托管服務：
1. 找 @ManyBot
2. 按照指引設置自動回覆

### 方式 2：自建 Webhook
需要伺服器，設置較複雜。

---

## 最簡單的解決方案

**現在先做：**
1. 在 @BotFather 設置描述（上面步驟1）
2. 當用戶點擊 START BOT，你手動在 Telegram 回覆他們

**之後再做自動化。**
