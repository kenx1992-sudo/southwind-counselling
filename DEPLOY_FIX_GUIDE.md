# 南風網站部署修復指南

## 🔧 問題摘要

- **Vercel**: 404 錯誤，需要重新連結倉庫
- **GitHub Pages**: 子頁面 404，需要更改部署文件夾為 `/website`

---

## 方案 A：修復 GitHub Pages

### 步驟 1：進入 GitHub 設置
1. 打開 https://github.com/kenx1992-sudo/southwind-counselling
2. 點擊頂部 **Settings** 標籤
3. 左側選單找到 **Pages**（在 Code and automation 下方）

### 步驟 2：更改部署來源
| 設置項 | 原設定 | 新設定 |
|--------|--------|--------|
| Source | Deploy from a branch | Deploy from a branch |
| Branch | main | main |
| Folder | / (root) | **/docs** |

### 步驟 3：保存並等待
- 點擊 **Save**
- 等待 1-2 分鐘
- 新網址會變為：`https://kenx1992-sudo.github.io/southwind-counselling/`

---

## 方案 B：重新連結 Vercel

### 步驟 1：登入 Vercel
1. 打開 https://vercel.com/dashboard
2. 用 GitHub 帳號登入

### 步驟 2：刪除或更新專案
**選項 1 - 刪除舊專案後重建：**
1. 找到 `southwind-counselling` 專案
2. 點進入 → Settings → General → Delete Project
3. 返回 Dashboard 點 **Add New...** → Project
4. 選擇 GitHub Repo `southwind-counselling`

**選項 2 - 直接更新設定：**
1. 進入專案 → Settings → Git
2. 檢查 Root Directory 是否為 `website`
3. 如果不是，修改後點 Save

### 步驟 3：設置根目錄（關鍵步驟）
在 Import 或設定頁面：
- **Framework Preset**: Other
- **Root Directory**: 輸入 `docs` 並點擊右側箭頭確認
- **Build Command**: 留空
- **Output Directory**: 留空

### 步驟 4：部署
- 點擊 **Deploy**
- 等待 1-2 分鐘
- 新網址：`https://southwind-counselling.vercel.app/`

---

## ✅ 修復後驗證清單

修復完成後，請檢查以下連結是否可用：

- [ ] https://southwind-counselling.vercel.app/ (首頁)
- [ ] https://southwind-counselling.vercel.app/assessments/ (測評)
- [ ] https://southwind-counselling.vercel.app/community/ (社區)
- [ ] https://southwind-counselling.vercel.app/content/ (資源)
- [ ] https://southwind-counselling.vercel.app/counselor-join/ (入駐)

GitHub Pages 版本：
- [ ] https://kenx1992-sudo.github.io/southwind-counselling/ (首頁)
- [ ] https://kenx1992-sudo.github.io/southwind-counselling/assessments/ (測評)

---

## 🆘 常見問題

**Q: 更改後仍然 404？**
A: 清除瀏覽器緩存 (Ctrl+F5)，或等待 5 分鐘後重試

**Q: Vercel 顯示 Build Error？**
A: 確保 Root Directory 設為 `website` 而非 `website/`

**Q: 自訂域名？**
A: 修復完成後，在 Vercel Settings → Domains 添加

---

修復完成後告訴我，我會再檢查驗證！
