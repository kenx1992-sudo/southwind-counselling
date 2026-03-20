# Ubuntu 升級 Node.js 到 v22

## 問題
- 當前 Node.js: v18.19.1
- 需要: v22.12+

---

## 解決方案：安裝 nvm 並升級

### Step 1: 安裝 nvm (Node Version Manager)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### Step 2: 重新加載配置
```bash
source ~/.bashrc
```

### Step 3: 安裝 Node.js 22
```bash
nvm install 22
```

### Step 4: 設置為默認版本
```bash
nvm use 22
nvm alias default 22
```

### Step 5: 驗證
```bash
node --version
# 應顯示 v22.x.x
```

---

## 快速指令（複製貼上）

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && source ~/.bashrc && nvm install 22 && nvm use 22 && nvm alias default 22 && node --version
```

---

## 然後重新安裝 Kimi Claw

```bash
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh ) --bot-token sk-MEK6YW5UYNPFLBOHWWFVHDB2
```

---

總時間：3-5 分鐘
