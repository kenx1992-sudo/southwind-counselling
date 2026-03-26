# Kimi API 免費試用設置指南

## 註冊與獲取 API Key

### 步驟 1：註冊 Kimi 開放平台
1. 訪問：https://platform.moonshot.cn
2. 點擊「註冊」
3. 用手機號或郵箱註冊
4. 完成實名認證（需要身份證）

### 步驟 2：創建 API Key
1. 登錄後進入「控制台」
2. 點擊「API Key 管理」
3. 點擊「創建 API Key」
4. 複製並保存 Key（只顯示一次！）

### 步驟 3：查看免費額度
- 新用戶通常有 **¥15-30 免費額度**
- 約可支持 **1,000-2,000 次對話**
- 在「賬戶中心」查看餘額

---

## 修改 Railway Bot 代碼

### 1. 更新 bot.py

在 `railway_bot/bot.py` 中添加 Kimi API 調用：

```python
import os
import asyncio
import logging
import requests
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.enums import ParseMode

# 配置
BOT_TOKEN = os.getenv("BOT_TOKEN")
KIMI_API_KEY = os.getenv("KIMI_API_KEY")
KIMI_API_URL = "https://api.moonshot.cn/v1/chat/completions"

# 初始化
bot = Bot(token=BOT_TOKEN, parse_mode=ParseMode.HTML)
dp = Dispatcher()

# Kimi AI 調用函數
def ask_kimi(user_message, user_id):
    """調用 Kimi API"""
    try:
        headers = {
            "Authorization": f"Bearer {KIMI_API_KEY}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "moonshot-v1-8k",  # 可選：8k/32k/128k
            "messages": [
                {
                    "role": "system",
                    "content": """你是南風心理輔導室的專業AI輔導助手。請以溫暖、專業、同理心的態度回覆用戶。

服務信息：
- 月費計劃：HK$299/月（AI輔導 + 每月1次真人諮詢）
- 年費計劃：HK$2,999/年（AI輔導 + 每月2次真人諮詢）
- 付款：Stripe信用卡或FPS轉數快（ID: 91946650）
- 聯絡：WhatsApp 9194 6650

回覆原則：
1. 先傾聽和同理用戶情緒
2. 提供簡單的心理健康建議
3. 適時引導預約專業服務
4. 使用繁體中文和香港用語"""
                },
                {"role": "user", "content": user_message}
            ],
            "temperature": 0.7,
            "max_tokens": 800
        }
        
        response = requests.post(KIMI_API_URL, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        return result['choices'][0]['message']['content']
        
    except Exception as e:
        logging.error(f"Kimi API 錯誤: {e}")
        return None

# ========== 命令處理 ==========

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    welcome = """
🌿 <b>歡迎來到南風AI心理輔導！</b>

我是你的 AI 輔導助手，由 Kimi AI 驅動，24/7 在線陪伴你。

💚 <b>我可以幫你：</b>
• 情緒傾聽與心理支持
• 壓力管理建議
• 心理健康資訊
• 引導預約真人輔導

📋 <b>常用命令：</b>
/pricing - 查看價格方案
/pay - 立即付款
/contact - 聯絡真人輔導

💬 <b>直接發送消息，我會用 AI 為你提供輔導！</b>
"""
    await message.answer(welcome)

@dp.message(Command("pricing"))
async def cmd_pricing(message: types.Message):
    pricing = """
📋 <b>南風心理輔導 - 訂閱方案</b>

🌿 <b>月費計劃 - HK$299/月</b>
✓ 30天 AI 輔導對話任用
✓ 每月 1 次真人視訊諮詢
✓ 專業心理測評

🏆 <b>年費計劃 - HK$2,999/年</b>
✓ 全年 AI 輔導任用
✓ 每月 2 次真人諮詢
✓ 比月費節省 16%

💳 輸入 /pay 立即付款
"""
    await message.answer(pricing)

@dp.message(Command("pay"))
async def cmd_pay(message: types.Message):
    pay = """
💳 <b>付款方式</b>

<b>Stripe 信用卡：</b>
🌿 月費 HK$299/月
👉 https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200

🏆 年費 HK$2,999/年  
👉 https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201

<b>FPS 轉數快：</b>
📌 FPS ID：91946650
📌 商戶：SOUTHWIND COUNSELLING

付款後截圖發給我，立即開通！✅
"""
    await message.answer(pay)

@dp.message(Command("contact"))
async def cmd_contact(message: types.Message):
    contact = """
📞 <b>聯絡我們</b>

📱 <b>WhatsApp：</b>9194 6650
📧 <b>Email：</b>southwindcounselling@gmail.com
🌐 <b>網站：</b>https://southwind-counselling.vercel.app

⏰ <b>服務時間：</b>
AI 輔導：24/7 全天候
真人輔導：預約制
"""
    await message.answer(contact)

# ========== AI 對話處理 ==========

@dp.message()
async def handle_ai_chat(message: types.Message):
    """所有普通消息都發給 Kimi AI 處理"""
    user_text = message.text
    user_id = message.from_user.id
    
    # 顯示"正在輸入"
    await bot.send_chat_action(message.chat.id, "typing")
    
    # 調用 Kimi AI
    ai_reply = ask_kimi(user_text, user_id)
    
    if ai_reply:
        await message.answer(ai_reply)
    else:
        # AI 失敗時的預設回覆
        await message.answer(
            "💚 收到你的消息！我暫時無法處理，請稍後再試。\n\n"
            "如果是緊急情況，請直接聯絡我們：\n"
            "WhatsApp：9194 6650"
        )

async def main():
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    logger.info("Bot with Kimi AI started!")
    
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
```

### 2. 更新 requirements.txt
```
aiogram==3.2.0
requests==2.31.0
```

---

## 設置 Railway 環境變量

### 添加 KIMI_API_KEY
1. Railway App → 你的項目
2. 點擊 **Variables** 標籤
3. 點擊 **New Variable**
4. 輸入：
   ```
   Key: KIMI_API_KEY
   Value: sk-xxxxxxxxxxxxx（你的 Kimi API Key）
   ```
5. 點擊 **Add**

---

## 部署

1. 推送代碼到 GitHub
```bash
git add -A
git commit -m "添加 Kimi AI 功能"
git push
```

2. Railway 會自動重新部署

3. 等待 2-3 分鐘，看到 🟢 Healthy

---

## 測試

1. Telegram 找 @southwindcounsellingbot
2. 發送 `/start`
3. 發送「我最近好焦慮」
4. 應該收到 AI 生成的輔導回覆

---

## 充值（當免費額度用完）

1. 登錄 https://platform.moonshot.cn
2. 進入「賬戶中心」
3. 點擊「充值」
4. 支持支付寶/微信支付
5. 最低充值 ¥50

---

## 費用參考

| 用量 | 費用 |
|------|------|
| 免費額度 | ¥15-30 |
| 1,000 次對話 | 約 ¥50-80 |
| 5,000 次對話 | 約 ¥250-400 |

**開始設置吧！有任何問題隨時問我！**
