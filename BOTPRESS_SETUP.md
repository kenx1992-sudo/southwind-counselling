# Botpress 快速設置指南

## 立即行動

### 步驟 1：註冊 Botpress
1. 手機/電腦訪問：https://botpress.com
2. 點擊 "Get Started"
3. 用 **GitHub 賬號** 或郵箱註冊

---

### 步驟 2：創建 Bot
1. 點擊 **"Create Bot"**
2. 選擇 **"From Scratch"**
3. 名稱：`Southwind Bot`

---

### 步驟 3：連接 Telegram（關鍵！）

1. 左側面板點擊 **"Integrations"**
2. 找到 **Telegram** 點擊 **Install**
3. 輸入 Token：
   ```
   8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
   ```
4. 點擊 **Save**
5. 點擊 **Enable**

---

### 步驟 4：設置歡迎消息

1. 點擊 **"Main"** 進入編輯器
2. 看到 **"Start"** 節點
3. 點擊 **"+"** 添加節點
4. 選擇 **"Text"**
5. 輸入：
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

---

### 步驟 5：添加命令回覆

#### /pricing 命令
1. 點擊 **"+"** 添加節點
2. 選擇 **"Trigger"**
3. 設置：**Exact Match** `/pricing`
4. 連接到 **Text** 節點
5. 輸入：
   ```
   📋 價格方案：
   
   🌿 月費：HK$299/月
   🏆 年費：HK$2,999/年
   
   輸入 /pay 立即付款
   ```

#### /pay 命令
1. 同上，Trigger 設置 `/pay`
2. Text 輸入：
   ```
   💳 付款連結：
   
   月費：https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200
   年費：https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201
   
   付款後截圖發給我！
   ```

#### /contact 命令
1. Trigger 設置 `/contact`
2. Text 輸入：
   ```
   📞 聯絡我們：
   
   WhatsApp：9194 6650
   Email：southwindcounselling@gmail.com
   網站：https://southwind-counselling.vercel.app
   ```

---

### 步驟 6：發布
1. 右上角點擊 **"Publish"**
2. 等待 1-2 分鐘
3. ✅ Bot 上線！

---

## 測試

1. 打開 Telegram
2. 找 **@southwindcounsellingbot**
3. 發送 `/start`
4. 應該收到歡迎消息

---

## 停止 Railway（避免衝突）

1. 打開 Railway App
2. 找到 southwind-counselling 項目
3. 點擊 **Settings**
4. 選擇 **Remove** 或 **Pause**

---

## 完成！

現在 Botpress 接管你的 Bot：
- ✅ 24/7 在線
- ✅ 自動回覆命令
- ✅ 可視化管理界面
- ✅ 免費使用

有問題隨時問我！
