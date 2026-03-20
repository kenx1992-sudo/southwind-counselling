# Kimi Claw Windows 安裝問題解決

## ❌ 錯誤分析

你遇到的錯誤：
```
npm error path ...\node_modules\node-pty
npm error Error: spawn EINVAL
```

**原因：**
- `node-pty` 是原生 Node.js 模塊，需要編譯
- Windows 缺少編譯工具（Python、Visual Studio Build Tools）
- 或者文件被占用（EBUSY）

---

## ✅ 解決方案

### 方案 1：安裝 Windows 編譯工具（推薦）

以管理員身份打開 PowerShell，執行：

```powershell
# 安裝 windows-build-tools
npm install --global windows-build-tools

# 或者只安裝必要的 Visual Studio Build Tools
npm config set msvs_version 2022
npm config set python python3.11
```

然後重新執行安裝指令。

---

### 方案 2：使用 WSL（最穩定）

```powershell
# 安裝 WSL（如果還沒有）
wsl --install -d Ubuntu

# 重啟電腦
# 打開 Ubuntu 終端

# 在 WSL 中執行
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh ) --bot-token sk-MEK6YW5UYNPFLBOHWWFVHDB2
```

**WSL 會避免所有 Windows 原生編譯問題。**

---

### 方案 3：清理後重試

關閉所有終端，然後：

```powershell
# 清理 npm 緩存
npm cache clean --force

# 刪除臨時文件
Remove-Item -Path "$env:TEMP\tmp.*" -Recurse -Force -ErrorAction SilentlyContinue

# 以管理員身份重新打開 PowerShell
# 重新執行安裝
```

---

### 方案 4：手動安裝 OpenClaw（備選）

如果 Kimi Claw 安裝腳本有問題，可以直接安裝 OpenClaw：

```powershell
# 安裝 OpenClaw
npm install -g openclaw

# 配置 Kimi 通道
openclaw config set channels.kimi-claw.type=kimi-claw
openclaw config set channels.kimi-claw.enabled=true
openclaw config set channels.kimi-claw.config.apiKey="sk-MEK6YW5UYNPFLBOHWWFVHDB2"
```

---

## 🚀 推薦步驟

### 最快解決：使用 WSL

1. **打開 PowerShell（管理員）**
```powershell
wsl --install
```

2. **重啟電腦**

3. **打開 Ubuntu 應用**

4. **在 Ubuntu 中執行**
```bash
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh ) --bot-token sk-MEK6YW5UYNPFLBOHWWFVHDB2
```

---

## 📝 如果不想用 WSL

先安裝編譯工具：

```powershell
# 以管理員身份執行
npm install --global --production windows-build-tools

# 或手動下載 Visual Studio Build Tools
# https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

然後重新安裝。

---

## ❓ 你需要我

- **A.** 提供詳細 WSL 安裝步驟？
- **B.** 幫你聯絡 Kimi 官方支持？
- **C.** 暫時放棄 Windows 安裝，繼續我們的工作？

**建議：選 C**，Windows 安裝可以稍後處理，現在先完成 IG/小紅書開設更重要！
