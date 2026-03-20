# OpenClaw Windows 安裝指南

## 系統要求

- Windows 10/11 (64-bit)
- Node.js 18+ 
- Git

---

## 安裝步驟

### Step 1: 安裝必要軟件

#### 1.1 安裝 Node.js
1. 訪問 https://nodejs.org/
2. 下載 LTS 版本 (推薦 20.x)
3. 安裝時勾選 "Add to PATH"

#### 1.2 安裝 Git
1. 訪問 https://git-scm.com/download/win
2. 下載並安裝
3. 安裝時選擇 "Use Git from the Windows Command Prompt"

#### 1.3 驗證安裝
打開 PowerShell，執行：
```powershell
node --version
npm --version
git --version
```

---

### Step 2: 安裝 OpenClaw

打開 PowerShell (管理員)，執行：

```powershell
npm install -g openclaw
```

驗證安裝：
```powershell
openclaw --version
```

---

### Step 3: 初始設置

執行引導設置：
```powershell
openclaw onboard
```

這會引導你完成：
1. 創建工作目錄
2. 設置預設模型
3. 配置通道（選擇要連接的平台）

---

### Step 4: 連接到 KimiClaw

#### 方法 A: 使用現有會話（推薦）

如果你已有 KimiClaw 會話，使用相同的 `sessionKey`：

```powershell
# 查看當前會話
openclaw sessions list

# 發送消息到特定會話
openclaw agent --session-key "kimi-claw:main" "你的消息"
```

#### 方法 B: 配置 Kimi 通道

1. 編輯配置文件：
```powershell
openclaw config edit
```

2. 添加 Kimi 通道配置（參考下方）

---

## Kimi 通道配置

在你的 OpenClaw 配置文件 (`~/.openclaw/config.json`) 中添加：

```json
{
  "channels": {
    "kimi-claw": {
      "type": "kimi-claw",
      "enabled": true,
      "config": {
        "apiKey": "你的_Kimi_API_Key",
        "model": "kimi-coding/k2p5"
      }
    }
  }
}
```

---

## 啟動 Gateway 服務

```powershell
# 啟動服務
openclaw gateway start

# 檢查狀態
openclaw gateway status

# 查看日誌
openclaw logs
```

---

## 驗證連接

測試與 KimiClaw 的連接：

```powershell
# 發送測試消息
openclaw message send --channel kimi-claw --target "main" --message "Hello from Windows!"
```

---

## 常見問題

### Q: PowerShell 執行策略限制
如果看到 "無法載入腳本" 錯誤：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Q: 找不到 openclaw 命令
確保 npm 全局安裝路徑在 PATH 中：
```powershell
npm config get prefix
# 將該路徑添加到系統環境變量 PATH
```

### Q: 需要代理
如果在中國大陸：
```powershell
npm config set registry https://registry.npmmirror.com
npm config set proxy http://your-proxy:port
```

---

## 下一步

設置完成後，你可以：
1. 創建工作目錄：`openclaw workspace create`
2. 配置更多通道（Telegram、Discord 等）
3. 使用 KimiClaw 進行開發工作

---

## 連接現有 KimiClaw 會話

如果你想連接到目前的 KimiClaw 會話（kimi-claw:main）：

需要從現有會話獲取 `sessionKey`，然後在 Windows 上：

```powershell
openclaw sessions send --session-key "kimi-claw:main" --message "測試連接"
```

**注意：** 你需要相同的 Gateway Token 才能連接到同一個會話。

---

需要我幫你生成特定的配置文件嗎？
