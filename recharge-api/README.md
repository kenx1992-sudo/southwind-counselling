# 南風心理輔導室 - 充值系統

完整的按小時收費充值系統，支持 Stripe 自動支付和人工 FPS 確認。

## 📁 文件結構

```
recharge-api/
├── package.json              # 項目依賴
├── server.js                 # 主服務器入口
├── .env.example              # 環境變量示例
├── BOTPRESS_INTEGRATION.md   # Botpress 集成指南
├── DEPLOYMENT_GUIDE.md       # 部署指南
├── models/                   # 數據庫模型
│   ├── User.js              # 用戶模型（餘額）
│   ├── Transaction.js       # 交易記錄模型
│   ├── UsageLog.js          # 使用記錄模型
│   └── index.js             # 模型導出
└── routes/                   # API 路由
    ├── payment.js           # 支付相關 API
    ├── user.js              # 用戶餘額 API
    └── admin.js             # 管理後台 API
```

## 🚀 快速開始

### 1. 安裝依賴
```bash
cd recharge-api
npm install
```

### 2. 配置環境變量
```bash
cp .env.example .env
# 編輯 .env 文件，填入實際值
```

### 3. 本地運行
```bash
npm run dev
```

### 4. 部署到 Railway
詳見 `DEPLOYMENT_GUIDE.md`

## 📋 API 端點

### 支付相關
| 端點 | 方法 | 說明 |
|------|------|------|
| `/api/payment/packages` | GET | 獲取套餐列表 |
| `/api/payment/create-session` | POST | 創建 Stripe 支付會話 |
| `/api/payment/webhook` | POST | Stripe Webhook 回調 |

### 用戶相關
| 端點 | 方法 | 說明 |
|------|------|------|
| `/api/user/balance/:telegram_id` | GET | 查詢餘額 |
| `/api/user/session/start` | POST | 開始計時 |
| `/api/user/session/end` | POST | 結束計時並扣款 |

### 管理後台
| 端點 | 方法 | 說明 |
|------|------|------|
| `/api/admin/dashboard` | GET | 儀表板數據 |
| `/api/admin/users` | GET | 所有用戶列表 |
| `/api/admin/transactions` | GET | 所有交易記錄 |
| `/api/admin/add-balance` | POST | 手動添加餘額（FPS）|

## 💰 套餐配置

| 套餐 | 價格 | 時長 | 平均/小時 |
|------|------|------|-----------|
| 5小時 | HK$350 | 5小時 | HK$70 |
| 10小時 | HK$650 | 10小時 | HK$65 |
| 20小時 | HK$1,200 | 20小時 | HK$60 |
| 50小時 | HK$2,750 | 50小時 | HK$55 |

## 🔗 Botpress 集成

詳見 `BOTPRESS_INTEGRATION.md`

## 📚 文檔

- `DEPLOYMENT_GUIDE.md` - 完整部署指南
- `BOTPRESS_INTEGRATION.md` - Botpress 集成指南

## ⚠️ 注意事項

1. **安全**：生產環境請使用更強的認證機制
2. **備份**：定期備份 MongoDB 數據
3. **監控**：使用 Railway 監控服務狀態
4. **測試**：先用 Stripe Test Mode 測試

## 📞 支持

有問題請檢查：
1. Railway Logs
2. MongoDB Atlas 監控
3. Stripe Dashboard 事件

---

由 Kimi Claw 為南風心理輔導室開發
