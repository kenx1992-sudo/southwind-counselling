# Windows 啟用 WSL 完整指南

## 檢查 Windows 版本

打開 PowerShell，執行：
```powershell
winver
```

**要求：** Windows 10 版本 2004 及以上，或 Windows 11

---

## 方案 1：手動啟用 WSL（舊版 Windows）

### Step 1：以管理員身份打開 PowerShell
右鍵點擊「開始」→「Windows PowerShell（管理員）」

### Step 2：啟用 WSL 功能
```powershell
# 啟用 WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# 啟用虛擬機平台（Windows 10 版本 1903+）
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

### Step 3：重啟電腦
```powershell
Restart-Computer
```

### Step 4：設置 WSL 預設版本為 2
重啟後，打開 PowerShell（管理員）：
```powershell
wsl --set-default-version 2
```

### Step 5：安裝 Ubuntu
```powershell
# 自動安裝 Ubuntu
wsl --install -d Ubuntu

# 或從 Microsoft Store 下載 Ubuntu
```

---

## 方案 2：從 Microsoft Store 安裝（最簡單）

1. 打開 **Microsoft Store**
2. 搜索 **"Ubuntu"**
3. 點擊 **「取得」** 或 **「安裝」**
4. 等待下載完成
5. 打開 Ubuntu 應用，設置用戶名和密碼

---

## 方案 3：如果 WSL 真的無法安裝

### 直接使用 Git Bash

1. 下載 Git for Windows：https://git-scm.com/download/win
2. 安裝時選擇 **「Use Git from Git Bash only」**
3. 打開 **Git Bash**
4. 執行你的安裝指令：
```bash
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh ) --bot-token sk-MEK6YW5UYNPFLBOHWWFVHDB2
```

---

## 方案 4：使用 Docker

如果已經安裝 Docker Desktop：

```powershell
# 在 Docker 中運行 OpenClaw
docker run -it --rm \
  -v ${HOME}/.openclaw:/root/.openclaw \
  -e KIMI_TOKEN=sk-MEK6YW5UYNPFLBOHWWFVHDB2 \
  openclaw/openclaw:latest
```

---

## 快速診斷

在 PowerShell 執行以下命令，我幫你判斷最佳方案：

```powershell
# 檢查 Windows 版本
[Environment]::OSVersion.Version

# 檢查是否支持 WSL
Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

# 檢查 Git 是否已安裝
git --version
```

把結果複製給我，我告訴你最適合的方案！

---

## 最簡單的替代方案

如果以上都太複雜，**暫時放棄 Windows 安裝**：

1. 繼續使用網頁版 Kimi（現在我們就在對話）
2. 完成 IG/小紅書開設（更重要）
3. 之後找時間處理 Windows 安裝

**你選哪個？**
