# Railway 修復步驟（圖文版）

## 問題回顧
- 項目: southwind-counselling
- 錯誤: Deployment failed（0 Variables）
- 原因: 未設置 BOT_TOKEN 環境變量

---

## 修復步驟

### 步驟 1: 打開 Railway
1. 打開 Railway App 或瀏覽器訪問 https://railway.app
2. 登錄你的賬號
3. 找到 **southwind-counselling** 項目

---

### 步驟 2: 進入 Variables 頁面

**方法 A: 底部導航欄**
1. 看底部有四個圖標
2. 點擊第四個圖標（像 **列表/三條線** 📋）
3. 標題應該顯示 "Variables"

**方法 B: 頂部標籤**
1. 看頂部有幾個標籤: Overview, Deployments, Variables
2. 點擊 **Variables**

---

### 步驟 3: 添加環境變量

1. 點擊 **"New Variable"** 或 **"+"** 按鈕
2. 輸入:
   ```
   Key: BOT_TOKEN
   Value: 8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
   ```
3. 點擊 **"Add"** 或 **"Save"**

---

### 步驟 4: 重新部署

1. 點擊頂部 **"Deployments"** 標籤
2. 找到最新的部署（顯示 Failed 的紅色條）
3. 點擊 **"Redeploy"** 按鈕
   - 或點擊右上角 **"Deploy"** 按鈕

---

### 步驟 5: 等待部署完成

1. 等待 2-3 分鐘
2. 看到 **🟢 Healthy** = 成功！
3. 看到 🔴 Failed = 有問題，截圖給我

---

## 驗證是否成功

### 測試 Bot
1. 打開 Telegram
2. 搜索 **@southwindcounsellingbot**
3. 發送 `/start`
4. 應該收到歡迎消息

### 查看日誌（如有問題）
1. 在 Railway 點擊部署
2. 點擊 **"Logs"** 標籤
3. 查看錯誤信息

---

## 常見問題

### Q: 找不到 Variables 按鈕？
A: 嘗試左右滾動底部導航欄，或點擊頂部 "Variables" 文字標籤

### Q: Redeploy 後還是 Failed？
A: 截圖日誌（Logs）給我看

### Q: Bot 不回覆消息？
A: 可能是 Token 錯誤，檢查是否有多餘空格

---

## 下一步

1. 先添加 BOT_TOKEN 變量
2. 點擊 Redeploy
3. 截圖結果給我（成功或失敗）

**開始吧！有問題隨時截圖～**
