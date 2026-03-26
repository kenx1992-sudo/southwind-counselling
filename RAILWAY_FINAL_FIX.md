# Railway 最終排查方案

## 當前狀態
- 錯誤：`Error creating build plan with Railpack`
- 已嘗試：nixpacks.toml ❌

---

## 方案 1: 使用 Dockerfile（最可能成功）

### 步驟

#### 1.1 創建 Dockerfile
在 `railway_bot/` 文件夾創建 `Dockerfile`（注意大寫 D，無後綴）：

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY bot.py .

CMD ["python", "bot.py"]
```

#### 1.2 創建 .dockerignore（可選）
```
__pycache__
*.pyc
*.pyo
*.pyd
.Python
.git
```

#### 1.3 修改 railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE"
  },
  "deploy": {
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 1.4 推送並部署
```bash
git add -A
git commit -m "改用 Dockerfile 構建"
git push
```

---

## 方案 2: 檢查項目根目錄結構

### 問題：Railway 可能找錯了根目錄

#### 檢查 GitHub 倉庫結構
確保是這樣：
```
southwind-counselling/
├── railway_bot/
│   ├── bot.py
│   ├── requirements.txt
│   ├── nixpacks.toml (或 Dockerfile)
│   └── railway.json
├── docs/
├── website/
└── ...
```

### 解決：在 Railway 設置根目錄

1. 打開 Railway App
2. 點擊項目名稱 `southwind-counselling`
3. 點擊 **Settings**（齒輪圖標）
4. 找到 **Root Directory**
5. 輸入：`railway_bot`
6. 保存並重新部署

---

## 方案 3: 刪除舊項目，重新創建

### 步驟

#### 3.1 刪除舊項目
1. Railway App → southwind-counselling
2. Settings → Danger → Delete Project

#### 3.2 重新創建
1. Railway 儀表板 → New Project
2. Deploy from GitHub repo
3. 選擇 `kenx1992-sudo/southwind-counselling`
4. **重要**：在設置中指定 Root Directory 為 `railway_bot`
5. 添加環境變量 BOT_TOKEN
6. 部署

---

## 方案 4: 簡化 nixpacks.toml

如果還想用 Nixpacks，嘗試最簡化版本：

```toml
[phases.build]
cmds = ["pip install -r requirements.txt"]

[start]
cmd = "python bot.py"
```

---

## 方案 5: 檢查 Variables

確保 Variables 已正確設置：

1. 點擊 Variables 標籤
2. 確認看到：
   ```
   BOT_TOKEN = 8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
   ```
3. 如果沒有，重新添加

---

## 推薦嘗試順序

1. **首先嘗試方案 2**（設置 Root Directory）- 最可能解決
2. 如果不行，**嘗試方案 1**（Dockerfile）
3. 如果還不行，**嘗試方案 3**（刪除重建）

---

## 立即行動

### 現在就做：

1. 打開 Railway App
2. 點擊 **Settings**（齒輪圖標）
3. 找到 **Root Directory** 設置
4. 輸入：`railway_bot`
5. 保存
6. 點擊 **Redeploy**

**這個設置告訴 Railway 在哪個文件夾找代碼！**

---

試試看，然後告訴我結果！
