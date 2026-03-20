# Windows 11 (Build 26200) WSL 快速啟用

## 你的系統信息
- Windows 11 24H2
- Build 26200
- ✅ 完全支持 WSL

---

## 快速啟用（30秒）

以**管理員身份**打開 PowerShell，執行：

```powershell
# 一鍵啟用並安裝 WSL + Ubuntu
wsl --install
```

如果顯示「無法辨識」，先執行：

```powershell
# 啟用 WSL 功能
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux -NoRestart

# 啟用虛擬機平台
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -NoRestart
```

然後**重啟電腦**。

重啟後再打開 PowerShell：
```powershell
wsl --install -d Ubuntu
```

---

## 如果還是不行

你的 Windows 版本很新，可能 WSL 組件未完全安裝。

### 替代方案：使用 Windows Terminal + PowerShell 7

1. 從 Microsoft Store 安裝 **Windows Terminal**
2. 從 Microsoft Store 安裝 **Ubuntu**
3. 打開 Ubuntu，設置用戶名密碼
4. 在 Ubuntu 中執行安裝指令

---

## 最快解決：直接從 Store 安裝

1. 打開 **Microsoft Store**（微軟商店）
2. 搜索 **"Ubuntu"**
3. 點擊 **安裝**
4. 打開 Ubuntu 應用
5. 設置用戶名和密碼
6. 在 Ubuntu 視窗中貼上你的安裝指令：

```bash
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh ) --bot-token sk-MEK6YW5UYNPFLBOHWWFVHDB2
```

---

## ⏰ 時間建議

**這個安裝過程約需 10-15 分鐘（下載 + 設置）。**

**建議：**
- 現在開始安裝
- 安裝過程中，我們繼續處理 IG/小紅書
- 完成後你就可以在 Windows 本地使用 Kimi Claw

**還是你要先完成 IG/小紅書，之後再處理這個？**
