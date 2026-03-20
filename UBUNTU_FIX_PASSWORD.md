# Ubuntu WSL 密碼問題解決

## 錯誤原因
`Authentication token manipulation error` 通常是 WSL 文件權限問題。

---

## 解決方案：直接重新安裝（最快）

### Step 1：註銷現有 Ubuntu
在 PowerShell（管理員）執行：
```powershell
wsl --unregister Ubuntu
```

### Step 2：重新安裝
```powershell
wsl --install -d Ubuntu
```

### Step 3：設置新用戶
安裝過程中會提示：
```
Enter new UNIX username: 
```
輸入：`szechunxd`

然後設置新密碼（記住這個密碼）。

---

## 替代方案：使用預設用戶

如果不想重新安裝，直接使用 root：

```powershell
wsl -u root
```

然後在 root 下安裝 Node.js：
```bash
apt update && apt install -y nodejs npm
```

之後再創建普通用戶：
```bash
adduser szechunxd
```

---

## 推薦：直接重新安裝

總時間約 3-5 分鐘，比折騰密碼重置更快。

---

執行：
```powershell
wsl --unregister Ubuntu
wsl --install -d Ubuntu
```

然後設置新用戶名和密碼，繼續安裝 Node.js！
