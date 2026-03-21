# Bot 分工配置

## 最終架構

```
┌─────────────────┐     ┌─────────────────┐
│  @southwind     │     │  @Szechun       │
│  counsellingbot │     │  bot            │
│  (用戶使用)      │     │  (本地AI)       │
│                 │     │                 │
│ • 用戶對話       │     │ • 與Kimi同步    │
│ • 服務介紹       │◄───►│ • 內部通知      │
│ • 預約處理       │     │ • 自動回覆      │
│                 │     │                 │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
    一般客戶                   管理/內部
```

---

## Bot 分工

### @southwindcounsellingbot（給用戶）
**用途**：對外服務
**功能**：
- 用戶諮詢
- 服務介紹
- 預約安排
- 付款指引

**狀態**：⚠️ 需要修復 Start 按鈕

---

### @Szechunbot（本地AI）
**用途**：內部同步
**功能**：
- 與 Kimi Claw 同步
- 接收系統通知
- 管理後台提醒
- 自動化任務

**狀態**：✅ 已配置

---

## 同步機制

### 用戶流程
```
用戶 → @southwindcounsellingbot
                │
                ▼
        簡單問題：自動回覆
        複雜問題：標記轉人工
                │
                ▼
        通知 → @Szechunbot
                │
                ▼
        同步給 Kimi Claw
```

### 通知流程
```
Kimi Claw (雲端)
        │
        ▼
@Szechunbot (本地通知)
        │
        ▼
    管理員接收
```

---

## 當前狀態

| Bot | 角色 | 狀態 | 行動 |
|-----|------|------|------|
| @southwindcounsellingbot | 用戶服務 | ⚠️ Start無反應 | 需要設置命令/描述 |
| @Szechunbot | 內部同步 | ✅ 正常 | 繼續作為通知渠道 |

---

## 立即行動

### 1. 修復 @southwindcounsellingbot
在 @BotFather 設置：
```
/setdescription
歡迎來到南風AI心理輔導！
點擊 START BOT 開始對話 💚

/setcommands
start - 開始使用
pricing - 查看價格
help - 幫助中心
```

### 2. 保持 @Szechunbot 作為通知渠道
- 我繼續通過它發送系統通知
- 作為雲端與本地同步的橋樑

---

## 總結

- **用戶** → 使用 @southwindcounsellingbot
- **Kimi** → 通過 @Szechunbot 與你同步
- **兩個 Bot 各自獨立運作**

這樣配置可以嗎？
