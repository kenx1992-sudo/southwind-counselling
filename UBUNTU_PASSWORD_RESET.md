# Ubuntu WSL 密碼重置指南

## 方法 1：使用 Windows 命令重置（推薦）

### Step 1：關閉 WSL
打開 PowerShell（管理員）：
```powershell
wsl --shutdown
```

### Step 2：以 root 用戶啟動 Ubuntu
```powershell
wsl -u root
```

### Step 3：重置密碼
在 Ubuntu 中執行：
```bash
# 將 your-username 替換為你的用戶名（szechunxd）
passwd szechunxd
```

然後輸入新密碼兩次。

### Step 4：退出並重啟
```bash
exit
```

回到 PowerShell：
```powershell
wsl --shutdown
wsl
```

---

## 方法 2：如果方法 1 不行

### Step 1：導出 WSL 數據（備份）
```powershell
wsl --export Ubuntu C:\ubuntu-backup.tar
```

### Step 2：註銷並重新安裝 Ubuntu
```powershell
wsl --unregister Ubuntu
wsl --install -d Ubuntu
```

### Step 3：設置新用戶
安裝過程中會提示創建新用戶和密碼。

---

## 快速指令（PowerShell 管理員）

複製貼上：
```powershell
wsl --shutdown
wsl -u root
```

然後在 Ubuntu 中：
```bash
passwd szechunxd
```

設置新密碼後：
```bash
exit
```

---

重置完成後，繼續安裝 Node.js：
```bash
sudo apt update && sudo apt install -y nodejs npm
```
