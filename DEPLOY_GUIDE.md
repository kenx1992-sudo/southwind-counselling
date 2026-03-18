# 南風心理輔導室 - 快速部署指南

## GitHub Token 權限問題

你提供的 Token 需要以下權限：
- `repo` (完整倉庫權限) 或
- `public_repo` (公開倉庫權限)

## 解決方案

### 方案 1: 更新 Token 權限（最快）
1. 前往 https://github.com/settings/tokens
2. 編輯你的 Token
3. 勾選 **"repo"** 權限
4. 保存並重新提供

### 方案 2: 手動創建倉庫（現在可用）
我已準備好所有檔案，請：

1. 在 GitHub 創建名為 `southwind-counselling` 的新倉庫
2. 告訴我倉庫網址（如 https://github.com/kenx1992-sudo/southwind-counselling）
3. 我會自動推送所有代碼

### 方案 3: 直接部署到 Vercel（不需要 GitHub）
我可以使用 Vercel CLI 直接部署，不需要 GitHub。

請選擇一個方案：
- 回覆 "方案1" + 更新後的 Token
- 回覆 "方案2" + 倉庫網址
- 回覆 "方案3" 直接 Vercel 部署
