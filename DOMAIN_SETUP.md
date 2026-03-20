# 南風心理輔導 - 域名註冊指南

## 推薦域名

**首選：** `southwind.hk` ✅
- 香港本地認同感強
- 簡潔易記
- 與品牌名一致

**備選：**
- `southwindcounselling.hk`
- `southwind.com.hk` (需要香港商業登記)
- `southwind.hk/counselling` (子目錄)

---

## 註冊商推薦

### 1. HKDNR (香港域名註冊有限公司) ⭐ 推薦
**網址：** https://www.hkdnr.hk
- 香港官方認可註冊商
- .hk 域名權威
- 中文介面
- 價格透明

**價格：**
- .hk 域名：約 HK$200-300/年
- .com.hk：需要商業登記證

**步驟：**
1. 訪問 https://www.hkdnr.hk
2. 搜索 "southwind.hk"
3. 檢查是否可註冊
4. 創建賬號並付款
5. 設置 DNS 指向 Vercel

---

### 2. GoDaddy
**網址：** https://www.godaddy.com
- 國際知名
- 中文支持
- 經常有優惠

**價格：**
- .hk 域名：約 US$20-30/年

---

### 3. Namecheap
**網址：** https://www.namecheap.com
- 性價比高
- 免費 WHOIS 隱私保護
- 用戶界面友好

**價格：**
- .hk 域名：約 US$15-25/年

---

## 註冊後設置（重要！）

### Step 1: 購買域名後
登入你的域名管理後台，找到 **DNS 管理** 或 **Nameservers**

### Step 2: 添加 DNS 記錄

**方法一：A 記錄指向 Vercel**
```
類型：A
主機：@
指向：76.76.21.21
TTL：3600
```

**方法二：CNAME 記錄（推薦）**
```
類型：CNAME
主機：www
指向：cname.vercel-dns.com
TTL：3600
```

### Step 3: Vercel 添加域名
1. 登入 https://vercel.com/dashboard
2. 選擇 southwind-counselling 項目
3. 點擊 "Settings" → "Domains"
4. 輸入 `southwind.hk`
5. 點擊 "Add"
6. 按提示完成驗證

### Step 4: 等待生效
- DNS 傳播通常需要 1-48 小時
- 可以用 https://dnschecker.org 檢查

---

## 郵箱設置（專業形象）

註冊域名後，可以設置專業郵箱：

### 推薦：Google Workspace
- 價格：US$6/月/用戶
- 包含：hello@southwind.hk
- 功能：Gmail、Google Calendar、Drive

### 替代：Zoho Mail（免費）
- 最多 5 個郵箱免費
- 功能：郵件、日曆、任務
- 設置：在域名 DNS 添加 MX 記錄

---

## 檢查清單

- [ ] 檢查 southwind.hk 是否可用
- [ ] 選擇註冊商並購買
- [ ] 設置 DNS 指向 Vercel
- [ ] 在 Vercel 添加自定義域名
- [ ] 測試訪問 https://southwind.hk
- [ ] 設置專業郵箱 hello@southwind.hk
- [ ] 更新網站上的所有鏈接

---

## 下一步

域名設置完成後，我們將：
1. 更新網站所有鏈接為新域名
2. 設置郵件系統
3. 開設 IG/FB 賬號（使用新域名郵箱）

**準備好了嗎？** 先去檢查 southwind.hk 是否可註冊！
