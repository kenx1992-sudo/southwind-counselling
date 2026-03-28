# Botpress 充值流程 - 直接複製使用

## 流程 1：主菜單（開始時顯示）

### Trigger: `start` 或 `/start`

### 消息內容：
```
🌿 歡迎來到南風AI心理輔導！

我是你的 AI 輔導助手，24/7 在線陪伴你。

💚 我可以幫你：
• 情緒傾聽與心理支持
• 壓力管理建議
• 心理健康資訊
• 引導預約真人輔導

💳 目前餘額：{{state.user_balance || "0"}} 小時

請選擇：
```

### 按鈕（Choices）：
- 💬 開始輔導
- 💳 充值
- 📊 查詢餘額
- ❓ 幫助

---

## 流程 2：充值選項

### Trigger: 用戶點擊 "💳 充值"

### 消息內容：
```
💳 充值小時套餐

🎁 優惠套餐：
• 5小時 - HK$350（平均HK$70/小時）
• 10小時 - HK$650 ⭐推薦（平均HK$65/小時）
• 20小時 - HK$1,200（平均HK$60/小時）

💡 小提示：
每月使用超過4小時，
月費計劃（HK$299任用）更划算！

📱 付款方式：
FPS 轉數快：91946650

請選擇套餐或查看月費計劃：
```

### 按鈕：
- 5小時 - HK$350
- 10小時 - HK$650 ⭐
- 20小時 - HK$1,200
- 🌿 查看月費計劃
- 🔙 返回主菜單

---

## 流程 3：選擇套餐後

### Trigger: 用戶選擇任意套餐

### 保存變量：
```javascript
// 在 Botpress 中設置變量
state.selected_package = event.payload.button // "5h", "10h", 或 "20h"
state.selected_price = event.payload.button === "5h" ? 350 : 
                       event.payload.button === "10h" ? 650 : 1200
state.selected_hours = event.payload.button === "5h" ? 5 : 
                       event.payload.button === "10h" ? 10 : 20
```

### 消息內容：
```
💳 你選擇了：{{state.selected_hours}}小時套餐

💰 金額：HK${{state.selected_price}}

📱 請使用 FPS 轉數快付款：
━━━━━━━━━━━━━━━━━━
📌 FPS ID：91946650
📌 商戶名稱：SOUTHWIND COUNSELLING
📌 金額：HK${{state.selected_price}}
━━━━━━━━━━━━━━━━━━

📋 付款步驟：
1. 打開銀行 App
2. 選擇「轉數快 FPS」
3. 輸入 FPS ID：91946650
4. 輸入金額：HK${{state.selected_price}}
5. 確認付款

✅ 付款後請直接發送截圖給我！
```

---

## 流程 4：等待付款截圖

### Trigger: 用戶發送圖片

### 條件檢查：
```javascript
// 檢查是否正在等待付款
if (state.waiting_for_payment === true) {
  // 繼續處理
} else {
  // 轉到普通對話
}
```

### 保存變量：
```javascript
state.payment_screenshot_received = true
state.payment_timestamp = new Date().toISOString()
```

### 消息內容：
```
✅ 收到你的付款截圖！

💳 訂單詳情：
• 套餐：{{state.selected_hours}}小時
• 金額：HK${{state.selected_price}}
• 時間：{{state.payment_timestamp}}

⏱️ 我會盡快確認付款並為你添加餘額。
確認完成後會立即通知你！

感謝你的支持 💚
```

### 發送通知給你（管理員）：
```
📢 新充值訂單！

用戶：@{{event.user.username}} (ID: {{event.user.id}})
套餐：{{state.selected_hours}}小時
金額：HK${{state.selected_price}}
時間：{{state.payment_timestamp}}

請確認後手動添加餘額。
```

---

## 流程 5：查詢餘額

### Trigger: 用戶點擊 "📊 查詢餘額"

### 消息內容：
```
📊 你的帳戶概覽

💚 南風AI心理輔導

━━━━━━━━━━━━━━━━━━
📌 目前餘額：{{state.user_balance || "0"}} 小時
📌 總共充值：{{state.total_purchased || "0"}} 小時
📌 已使用：{{state.total_used || "0"}} 小時
━━━━━━━━━━━━━━━━━━

{{state.user_balance > 0 ? "💚 餘額充足，可以開始輔導了！" : "⚠️ 餘額不足，請先充值。"}}

需要充值嗎？
```

### 按鈕：
- 💳 立即充值
- 💬 開始輔導
- 🔙 返回主菜單

---

## 流程 6：開始輔導（檢查餘額）

### Trigger: 用戶點擊 "💬 開始輔導" 或發送消息

### 執行代碼（Execute Code）：
```javascript
// 檢查餘額
const balance = state.user_balance || 0

if (balance <= 0) {
  // 沒有餘額，引導充值
  state.can_start = false
} else {
  // 有餘額，開始計時
  state.can_start = true
  state.session_start = new Date().toISOString()
  state.session_start_time = Date.now()
}
```

### 判斷分支：

**分支 A：沒有餘額**
```
💳 你的餘額已用完（剩餘 0 小時）

請先充值再繼續使用AI輔導：

🎁 優惠套餐：
• 5小時 - HK$350
• 10小時 - HK$650 ⭐推薦
• 20小時 - HK$1,200

💡 小提示：
每月使用超過4小時，
月費計劃（HK$299任用）更划算！
```

**分支 B：有餘額**
```
💚 開始AI心理輔導

📊 目前餘額：{{state.user_balance}} 小時
⏱️ 開始時間：{{state.session_start}}

請告訴我：
• 你現在的心情如何？
• 有什麼想傾訴或探討的嗎？

我會全程陪伴你 💚
```

---

## 流程 7：結束輔導（計算時長）

### Trigger: 用戶說「再見」、「結束」、「bye」等

### 執行代碼：
```javascript
// 計算使用時長
if (state.session_start_time) {
  const endTime = Date.now()
  const durationMs = endTime - state.session_start_time
  const durationMinutes = Math.ceil(durationMs / 60000)
  
  // 最少5分鐘
  const actualMinutes = Math.max(durationMinutes, 5)
  
  // 轉換為小時（保留2位小數）
  const hoursUsed = Math.ceil(actualMinutes / 60 * 100) / 100
  
  // 更新變量
  state.session_duration_minutes = actualMinutes
  state.session_hours_used = hoursUsed
  state.session_end = new Date().toISOString()
  
  // 扣除餘額（這裡只是計算，實際扣除需要你手動更新或用自動化）
  const currentBalance = state.user_balance || 0
  const newBalance = Math.max(0, currentBalance - hoursUsed)
  state.user_balance = newBalance
  state.total_used = (state.total_used || 0) + hoursUsed
}
```

### 消息內容：
```
💚 本次輔導結束

━━━━━━━━━━━━━━━━━━
⏱️ 使用時長：{{state.session_duration_minutes}} 分鐘
💰 扣除：{{state.session_hours_used}} 小時
📊 剩餘餘額：{{state.user_balance}} 小時
━━━━━━━━━━━━━━━━━━

感謝使用南風AI輔導！
希望這次對話對你有幫助 💚

{{state.user_balance < 2 ? "⚠️ 餘額不足，建議及時充值。" : ""}}

隨時歡迎回來傾訴 💬
```

---

## 流程 8：月費計劃說明

### Trigger: 用戶點擊 "🌿 查看月費計劃"

### 消息內容：
```
🌿 月費訂閱計劃

如果你每月使用超過4小時，
月費計劃更划算！

📋 方案對比：

🌿 月費計劃 - HK$299/月
✓ AI輔導任用（無限時數）
✓ 每月1次真人視訊諮詢
✓ 專業心理測評

🏆 年費計劃 - HK$2,999/年
✓ AI輔導任用（無限時數）
✓ 每月2次真人視訊諮詢
✓ 比月費節省16%！

💳 有興趣？請 WhatsApp 聯絡我們：
📱 5682 8499
```

---

## 流程 9：幫助中心

### Trigger: 用戶點擊 "❓ 幫助"

### 消息內容：
```
❓ 幫助中心

📋 常見問題：

Q: 如何充值？
A: 點擊「💳 充值」→ 選擇套餐 → FPS付款 → 發送截圖

Q: 如何開始輔導？
A: 點擊「💬 開始輔導」→ 確保有餘額 → 直接發送消息

Q: 餘額怎麼查詢？
A: 點擊「📊 查詢餘額」隨時查看

Q: 可以退款嗎？
A: 充值後7天內未使用可申請退款

Q: 如何聯絡真人輔導？
A: WhatsApp 5682 8499

還有其他問題？直接發送消息給我 💬
```

---

## 🔧 技術說明

### 變量名稱對照表：

| 變量名 | 用途 | 類型 |
|--------|------|------|
| `user_balance` | 目前餘額（小時）| number |
| `total_purchased` | 總共充值（小時）| number |
| `total_used` | 已使用（小時）| number |
| `selected_package` | 選擇的套餐 | string |
| `selected_price` | 套餐價格 | number |
| `selected_hours` | 套餐時數 | number |
| `session_start` | 會話開始時間 | string |
| `session_start_time` | 會話開始時間戳 | number |
| `session_end` | 會話結束時間 | string |
| `session_duration_minutes` | 使用分鐘數 | number |
| `session_hours_used` | 使用小時數 | number |

### 如何在 Botpress 中創建這些流程：

1. **點擊左側「Flows」**
2. **點擊「+」創建新 Flow 或編輯 Main**
3. **拖入節點**：
   - **Trigger**：設置觸發條件
   - **Send Message**：發送消息
   - **Choice**：按鈕選項
   - **Execute Code**：執行代碼
   - **Condition**：條件判斷

4. **連接節點**：拖動連線

---

## 💡 提示

- 所有 `{{變量}}` 語法在 Botpress 中會自動替換
- 代碼塊需要在「Execute Code」節點中執行
- 記得在開始時初始化變量：`state.user_balance = state.user_balance || 0`

---

**需要我解釋某個部分怎麼在 Botpress 中設置嗎？**
