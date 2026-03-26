# 🌿 南風心理輔導室 - 完整商業計劃

## 📋 目錄
1. [商業定位](#商業定位)
2. [產品與定價](#產品與定價)
3. [Bot 預設消息](#bot-預設消息)
4. [運營架構](#運營架構)
5. [重要網址](#重要網址)

---

## 商業定位

### 品牌名稱
**南風心理輔導室** (Southwind Counselling)

### 定位
- **AI + 真人** 混合心理輔導平台
- 香港本地服務（廣東話為主）
- 目標：2026年達成 75,000 用戶（1% 市場滲透）

### 品牌色
- 主色：森林綠 #2D5A4A（溫暖、信任）
- 輔色：AI 藍/紫色

---

## 產品與定價

| 方案 | 價格 | 內容 |
|------|------|------|
| 🌿 月費計劃 | **HK$299/月** | • 30天 AI 輔導任用<br>• 每月 1 次真人視訊諮詢<br>• 專業心理測評 |
| 🏆 年費計劃 | **HK$2,999/年** | • 全年 AI 輔導任用<br>• 每月 2 次真人諮詢<br>• 專屬輔導員配對<br>• 比月費省 16% |

### 付款方式
- **Stripe 信用卡**（國際用戶）
- **FPS 轉數快**（香港用戶）
  - FPS ID: 91946650
  - 商戶名稱: SOUTHWIND COUNSELLING

---

## Bot 預設消息

### /start - 歡迎消息
```
🌿 歡迎來到南風AI心理輔導！

我是你的 AI 輔導助手，24/7 在線陪伴你。

💚 我可以幫你：
• 情緒傾聽與支持
• 壓力管理建議  
• 心理健康資訊
• 預約真人輔導

📋 常用命令：
/pricing - 查看價格方案
/pay - 立即付款
/help - 使用幫助
/contact - 聯絡真人輔導

💬 直接發送消息開始對話！
```

### /pricing - 價格方案
```
📋 南風心理輔導 - 訂閱方案

🌿 月費計劃 - HK$299/月
✓ 30天 AI 輔導對話任用
✓ 每月 1 次真人視訊諮詢
✓ 專業心理測評
✓ 心理健康資源庫

🏆 年費計劃 - HK$2,999/年
✓ 全年 AI 輔導對話任用
✓ 每月 2 次真人視訊諮詢
✓ 優先預約權
✓ 專屬輔導員配對
✓ 年度心理健康報告
💰 比月費節省 16%！

💳 付款方式：
🇭🇰 香港用戶：FPS 轉數快
🌍 國際用戶：Stripe 信用卡

輸入 /pay 立即付款
```

### /pay - 付款方式
```
💳 選擇付款方式

📋 Stripe 信用卡支付（國際用戶）

🌿 月費計劃 - HK$299/月
👉 https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200

🏆 年費計劃 - HK$2,999/年
👉 https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201

💰 比月費節省 16%！

🇭🇰 香港用戶 - FPS 轉數快
請發送 /fps 獲取付款二維碼

付款完成後請截圖發送給我，
我會立即為你開通服務 ✅
```

### /fps - FPS 付款指引
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

💚 確認後立即開通服務！
```

### /contact - 聯絡我們
```
📞 聯絡我們

💚 南風心理輔導室

📱 WhatsApp：9194 6650
📧 Email：southwindcounselling@gmail.com
🌐 網站：https://southwind-counselling.vercel.app

⏰ 服務時間：
AI 輔導：24/7 全天候
真人輔導：預約制

💬 有任何問題歡迎隨時聯絡！
```

### /help - 幫助中心
```
❓ 使用幫助

📋 常用命令：
/start - 開始對話
/pricing - 查看價格方案
/pay - 立即付款
/fps - FPS 付款指引
/contact - 聯絡真人輔導

💬 如何開始：
1. 輸入 /pricing 了解服務
2. 輸入 /pay 選擇付款方式
3. 或直接發送消息與我對話

🌿 隨時隨地，我都在這裡陪伴你。
```

---

## 運營架構

### 雲端-本地 AI 同步

```
用戶 → @southwindcounsellingbot (Railway 雲端)
      ↓
    簡單問題：自動回覆
    複雜問題：轉發給 Kimi 處理
      ↓
用戶 ← 回覆
```

### Bot 架構
- **@southwindcounsellingbot** - 客戶-facing Bot（Railway 24/7 運行）
- **@Szechunbot** - 本地通知 Bot

---

## 重要網址

| 類型 | 網址 |
|------|------|
| **主網站** | https://southwind-counselling.vercel.app/ |
| **GitHub** | https://github.com/kenx1992-sudo/southwind-counselling |
| **月費付款** | https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200 |
| **年費付款** | https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201 |

---

## 下一步行動

1. ✅ Bot 已 24/7 運行
2. ⬜ 測試所有命令是否正常
3. ⬜ 設置自動內容生成（社交媒體）
4. ⬜ 註冊域名 southwind.hk
5. ⬜ 申請 Google Business

**有什麼需要調整或補充的嗎？**
