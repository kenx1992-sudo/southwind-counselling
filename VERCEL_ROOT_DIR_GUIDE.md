# Vercel Root Directory 設置指引

## 找到 Root Directory 設置

### 方法一：已有專案
1. 登入 https://vercel.com/dashboard
2. 點擊 **southwind-counselling** 專案
3. 頂部點 **Settings**（設置）
4. 左側選 **Git**
5. 滾動到 **Root Directory** 欄位
   - 如果看到 "Not set" 或空白，點擊編輯
   - 輸入：`docs`
   - 點 Save

### 方法二：重新 Import（如果找不到）
1. Dashboard 點 **Add New...** → **Project**
2. 選擇 GitHub repo：`southwind-counselling`
3. 在 Configure Project 頁面：
   - **Project Name**: southwind-counselling
   - **Framework Preset**: Other
   - **Root Directory**: 點 **Edit** → 輸入 `docs` → 點 **Continue**
   - Build Command 和 Output Directory 留空
4. 點 **Deploy**

## 如果還是找不到

可能是舊版界面，嘗試直接修改 `vercel.json`：

```bash
# 在本地創建 vercel.json
echo '{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}' > docs/vercel.json
```

然後 push 到 GitHub，Vercel 會自動重新部署。

## 快速驗證

部署完成後訪問：
- https://southwind-counselling.vercel.app/
- https://southwind-counselling.vercel.app/assessments/

如果顯示內容即表示成功。
