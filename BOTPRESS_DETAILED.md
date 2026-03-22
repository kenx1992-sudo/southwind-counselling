# Botpress 完整圖文設置指南

## 步驟 1：註冊 Botpress

### 1.1 打開網站
```
https://botpress.com
```

### 1.2 點擊 "Get Started"
位置：右上角紫色按鈕

### 1.3 選擇登錄方式
建議：點擊 **Continue with GitHub**
（或用郵箱註冊）

### 1.4 授權
點擊 **Authorize Botpress** 授權

---

## 步驟 2：創建 Bot

### 2.1 進入 Dashboard
註冊後會自動進入

### 2.2 點擊 "Create Bot"
位置：中央大按鈕，或右上角 **+** 號

### 2.3 選擇 "From Scratch"
位置：第一個選項

### 2.4 填寫名稱
```
Bot Name: Southwind Bot
```

### 2.5 點擊 "Create"
等待創建完成...

---

## 步驟 3：連接 Telegram（關鍵）

### 3.1 打開 Integrations
位置：左側面板，圖標看起來像 **插頭** 🔌

### 3.2 找到 Telegram
向下滾動找到 **Telegram**（綠色紙飛機圖標）

### 3.3 點擊 "Install"
位置：Telegram 卡片右下角

### 3.4 輸入 Bot Token
會看到輸入框，輸入：
```
8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
```

### 3.5 保存設置
點擊 **Save Configuration**

### 3.6 啟用 Integration
點擊 **Enable**（從灰色變綠色）

✅ Telegram 連接成功！

---

## 步驟 4：設置歡迎消息

### 4.1 進入 Main 流程
位置：左側面板點擊 **Main**

### 4.2 看到 Start 節點
中央會看到 **Start** 節點（藍色圓圈）

### 4.3 添加 Text 節點
1. 點擊 **Start** 節點右側的 **+** 號
2. 選擇 **Standard Node** → **Text**

### 4.4 輸入歡迎消息
點擊 Text 節點，輸入：
```
🌿 歡迎來到南風AI心理輔導！

我是你的 AI 助手，24/7 在線陪伴你。

💚 常用命令：
/pricing - 查看價格
/pay - 立即付款  
/contact - 聯絡我們
/help - 幫助中心

直接發送消息開始對話！
```

### 4.5 連接節點
從 **Start** 拖線到 **Text** 節點
（點擊 Start 右側圓點，拖到 Text 左側）

---

## 步驟 5：添加 /pricing 命令

### 5.1 添加 Trigger 節點
1. 點擊任意空白處的 **+**
2. 選擇 **Trigger**

### 5.2 設置觸發條件
點擊 Trigger 節點：
- **Condition**: Exact Match
- **Text**: `/pricing`

### 5.3 添加回覆 Text 節點
1. 從 Trigger 節點拖出連線
2. 選擇 **Text**
3. 輸入：
```
📋 價格方案：

🌿 月費計劃 - HK$299/月
✓ 30天 AI 輔導任用
✓ 每月 1 次真人諮詢

🏆 年費計劃 - HK$2,999/年
✓ 全年 AI 輔導任用
✓ 每月 2 次真人諮詢
✓ 比月費節省 16%

輸入 /pay 立即付款 💳
```

---

## 步驟 6：添加 /pay 命令

### 6.1 添加 Trigger 節點
- **Condition**: Exact Match
- **Text**: `/pay`

### 6.2 添加 Text 回覆
```
💳 付款連結：

🌿 月費 HK$299/月
👉 https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200

🏆 年費 HK$2,999/年
👉 https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201

🇭🇰 香港用戶也可用 FPS 轉數快
輸入 /fps 獲取付款資訊

付款後截圖發給我，立即開通！✅
```

---

## 步驟 7：添加 /fps 命令

### 7.1 Trigger 設置
- **Condition**: Exact Match
- **Text**: `/fps`

### 7.2 Text 回覆
```
📱 FPS 轉數快付款

📌 FPS ID：91946650
📌 商戶名稱：SOUTHWIND COUNSELLING

📋 付款步驟：
1. 打開銀行 App
2. 選擇「轉數快 FPS」
3. 輸入 FPS ID：91946650
4. 確認金額並付款
5. 截圖付款記錄發給我

⚡ 確認後立即開通服務！
```

---

## 步驟 8：添加 /contact 命令

### 8.1 Trigger 設置
- **Condition**: Exact Match
- **Text**: `/contact`

### 8.2 Text 回覆
```
📞 聯絡南風心理輔導

📱 WhatsApp：9194 6650
📧 Email：southwindcounselling@gmail.com
🌐 網站：https://southwind-counselling.vercel.app

⏰ 服務時間：
AI 輔導：24/7 全天候
真人輔導：預約制

💬 隨時聯絡我們！
```

---

## 步驟 9：發布 Bot

### 9.1 點擊 Publish
位置：右上角 **紫色按鈕**

### 9.2 等待部署
顯示 "Publishing..." 等待 1-2 分鐘

### 9.3 發布成功
看到 **"Your bot is live!"** = ✅ 成功！

---

## 步驟 10：測試

### 10.1 打開 Telegram
手機或電腦打開 Telegram App

### 10.2 搜索 Bot
搜索：`@southwindcounsellingbot`

### 10.3 點擊 START BOT
點擊底部 **START BOT** 按鈕

### 10.4 測試命令
發送：
- `/start` → 應該看到歡迎消息
- `/pricing` → 應該看到價格
- `/pay` → 應該看到付款連結

---

## 步驟 11：停止 Railway（重要！）

### 11.1 打開 Railway App/網站

### 11.2 找到 southwind-counselling 項目

### 11.3 點擊 Settings（齒輪圖標）

### 11.4 選擇 Delete 或 Pause
避免兩個 Bot 同時運行造成衝突

---

## ✅ 完成！

現在：
- ✅ Botpress 接管 Bot
- ✅ 24/7 在線運行
- ✅ 自動回覆命令
- ✅ 可視化管理界面

---

## 常見問題

### Q: 點擊 Publish 後顯示錯誤？
A: 檢查 Telegram Token 是否正確

### Q: Bot 不回覆消息？
A: 確認 Telegram Integration 已 Enable（綠色）

### Q: 如何修改消息？
A: 直接點擊節點編輯，然後重新 Publish

---

**有問題隨時截圖給我！**
