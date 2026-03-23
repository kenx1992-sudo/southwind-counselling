# Railway 构建修复

## 错误
```
Error creating build plan with Railpack
```

## 原因
缺少构建配置文件或配置不正确

---

## 修复步骤

### 方法 1：添加 nixpacks.toml（推荐）

在 railway_bot 文件夹创建 `nixpacks.toml`：

```toml
[phases.build]
cmds = ["pip install -r requirements.txt"]

[phases.setup]
nixPkgs = ["python311"]

[start]
cmd = "python bot.py"
```

### 方法 2：添加 Procfile

在 railway_bot 文件夹创建 `Procfile`（注意大写 P，无后缀）：

```
worker: python bot.py
```

### 方法 3：修改 railway.json

确保 railway_bot/railway.json 内容：

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "nixpacksPlan": {
      "phases": {
        "setup": {
          "nixPkgs": ["python311"]
        },
        "build": {
          "cmds": ["pip install -r requirements.txt"]
        }
      }
    }
  },
  "deploy": {
    "startCommand": "python bot.py",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 最简单解决方案

### 步骤 1：在 GitHub 添加文件

1. 访问 https://github.com/kenx1992-sudo/southwind-counselling
2. 进入 railway_bot 文件夹
3. 点击 "Add file" → "Create new file"
4. 文件名：`nixpacks.toml`
5. 内容：
```toml
[phases.setup]
nixPkgs = ["python311", "gcc"]

[phases.build]
cmds = ["pip install -r requirements.txt"]

[start]
cmd = "python bot.py"
```
6. 点击 "Commit changes"

### 步骤 2：在 Railway 重新部署

1. 回到 Railway
2. 等待自动部署（GitHub 更新后会自动触发）
3. 或点击 "Redeploy"

---

## 备选方案：使用 Dockerfile

如果以上都不行，创建 `railway_bot/Dockerfile`：

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY bot.py .

CMD ["python", "bot.py"]
```

---

## 验证修复

修复后应该看到：
- ✅ Initialization
- ✅ Build
- ✅ Deploy
- 🟢 Healthy

---

推荐使用方法 1（nixpacks.toml），最简单！
