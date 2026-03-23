# Botpress 第三步故障排除

## 問題：卡在「連接 Telegram」

---

## 常見問題及解決

### 問題 1：找不到 Telegram Integration

**症狀**：在 Integrations 頁面找不到 Telegram

**解決**：
1. 確認你在 **Integrations** 頁面（左側 🔌 插頭圖標）
2. 向下滾動尋找，Telegram 通常在 **Messaging** 分類
3. 或者用搜索框輸入 "telegram"

---

### 問題 2：Install 按鈕灰掉/不能點

**症狀**：看到 Telegram 但 Install 按鈕是灰色的

**解決**：
1. 可能是已經安裝了，找 **Configure** 按鈕代替
2. 或者點擊 Telegram 卡片進入詳情頁

---

### 問題 3：輸入 Token 後顯示錯誤

**症狀**：輸入 Token 後顯示紅色錯誤提示

**可能原因**：

#### A. Token 格式錯誤
**正確格式**：
```
8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
```
**檢查**：
- 是否有空格？
- 是否有多餘字符？
- 是否複製完整？

#### B. Token 已被使用
**症狀**：Token already in use
**解決**：
1. 確保 Railway 的 Bot 已停止
2. 或者生成新的 Bot Token（在 @BotFather 用 /revoke 後重新獲取）

#### C. Bot 已被其他平台連接
**解決**：
1. 在 @BotFather 中輸入：
   ```
   /revoke
   ```
2. 選擇 @southwindcounsellingbot
3. 獲取新的 Token
4. 用新 Token 在 Botpress 設置

---

### 問題 4：Save 後顯示 "Failed to save"

**症狀**：點擊 Save 後顯示保存失敗

**解決**：
1. 刷新頁面重試
2. 檢查網絡連接
3. 登出重新登錄

---

### 問題 5：Enable 按鈕沒反應

**症狀**：點擊 Enable 後沒有變綠色

**解決**：
1. 確認已點擊 **Save Configuration**
2. 刷新頁面
3. 重新點擊 Enable

---

## 正確流程檢查

請確認你的操作順序：

```
1. 左側點擊 Integrations (🔌)
   ↓
2. 找到 Telegram (🛩️ 紙飛機圖標)
   ↓
3. 點擊 "Install" 或 "Configure"
   ↓
4. 輸入 Token：8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
   ↓
5. 點擊 "Save Configuration"
   ↓
6. 點擊 "Enable" (變成綠色)
   ↓
7. ✅ 完成
```

---

## 截圖診斷

如果以上都不奏效，請截圖給我看：

1. **Integrations 頁面**（顯示所有 integration 列表）
2. **Telegram 設置頁面**（輸入 Token 的地方）
3. **錯誤提示**（如果有）

---

## 快速測試 Token 是否有效

在瀏覽器打開：
```
https://api.telegram.org/bot8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec/getMe
```

應該返回 Bot 信息。如果顯示錯誤，說明 Token 無效。

---

## 緊急替代方案

如果 Botpress 實在連不上：

**方案 A：使用 ManyBot**
- 在 Telegram 找 @ManyBot
- 更簡單，5分鐘搞定

**方案 B：保留 Railway**
- Railway 已經部署成功了
- 雖然代碼管理，但穩定運行

---

**告訴我你卡在哪個具體環節，我幫你解決！**
