# Railway 使用指南（替代 Botpress）

## 狀態確認

### 你的 Railway 項目
- **項目名稱**: southwind-counselling
- **狀態**: 之前部署失敗（0 Variables）
- **當前**: 需要重新部署或修復

---

## 兩個選擇

### 選項 A: 修復現有 Railway 項目（推薦）

#### 步驟 1: 打開 Railway App
1. 打開 Railway App 或訪問 https://railway.app
2. 找到 **southwind-counselling** 項目

#### 步驟 2: 設置環境變量
1. 點擊底部 **Variables** 圖標（第四個，像列表）
2. 點擊 **New Variable**
3. 輸入:
   ```
   Key: BOT_TOKEN
   Value: 8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
   ```
4. 點擊 **Add**

#### 步驟 3: 重新部署
1. 點擊頂部 **Deploy** 標籤
2. 點擊 **Redeploy** 或 **Deploy Now**
3. 等待 2-3 分鐘
4. 看到 **🟢 Healthy** = 成功！

---

### 選項 B: 使用現成的自動化方案

如果你不想自己管理 Railway，可以用 **ManyBot**（完全免費，無需代碼）:

1. 在 Telegram 找 **@ManyBot**
2. 發送 `/addbot`
3. 輸入 Token: `8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec`
4. 設置自動回覆（拖拽界面）

---

## 驗證 Railway 是否運行

部署成功後，測試 Bot:

1. 打開 Telegram
2. 搜索 **@southwindcounsellingbot**
3. 發送 `/start`
4. 應該收到回覆

---

## Railway 費用

- **免費額度**: 每月 $5
- **本 Bot 預估**: $1-2/月
- **是否夠用**: ✅ 足夠

---

## 現在該怎麼做？

**推薦**: 選項 A - 修復 Railway

因為你已經部署過了，只需要:
1. 添加環境變量 BOT_TOKEN
2. 點擊 Redeploy
3. 完成！

**需要我提供更詳細的截圖步驟嗎？**
