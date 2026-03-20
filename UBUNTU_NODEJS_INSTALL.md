# Ubuntu WSL 安裝 Node.js + Kimi Claw

## 當前狀態
✅ WSL 已啟用
✅ Ubuntu 已安裝
❌ 缺少 Node.js

---

## 在 Ubuntu 中安裝 Node.js

打開 **Ubuntu** 應用，執行：

```bash
# 更新套件列表
sudo apt update

# 安裝 Node.js 和 npm
sudo apt install -y nodejs npm

# 驗證安裝
node --version
npm --version
```

---

## 安裝 Kimi Claw

Node.js 安裝完成後，執行你的指令：

```bash
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh ) --bot-token sk-MEK6YW5UYNPFLBOHWWFVHDB2
```

---

## 快速指令（複製貼上）

在 Ubuntu 終端中順序執行：

```bash
sudo apt update && sudo apt install -y nodejs npm && node --version
```

安裝完成後（約 2-3 分鐘）：

```bash
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh ) --bot-token sk-MEK6YW5UYNPFLBOHWWFVHDB2
```

---

## 安裝完成後

驗證安裝：
```bash
kimi-claw --version
# 或
openclaw --version
```

---

總時間預估：5-8 分鐘
