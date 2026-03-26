# 本地運行 southwindcounsellingbot 方案

## 你的需求
- ✅ @southwindcounsellingbot 同時是客服 + AI 輔導
- ✅ 不牽涉 @Szechunbot（私人用途）
- ✅ 連接本地 OpenClaw AI Counsellor

## 解決方案：本地運行 Bot

由於 Railway（雲端）無法連接你的本地 OpenClaw，必須把 Bot 搬到你的電腦運行。

---

## 方案：在 Windows 本地運行 Bot

### 步驟 1：安裝 Python
1. 下載 Python 3.11：https://www.python.org/downloads/
2. 安裝時勾選 "Add Python to PATH"

### 步驟 2：創建本地 Bot 文件夾
```
C:\southwind_bot\
├── bot.py
├── requirements.txt
└── config.json
```

### 步驟 3：創建 bot.py（連接本地 OpenClaw）

```python
import asyncio
import json
import requests
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

# 讀取配置
with open('config.json', 'r') as f:
    config = json.load(f)

BOT_TOKEN = config['bot_token']
OPENCLAW_URL = config['openclaw_url']  # 本地 OpenClaw API 地址

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

# 調用本地 OpenClaw AI
def ask_local_ai(user_message, user_id):
    """發送消息給本地 OpenClaw AI"""
    try:
        response = requests.post(
            f"{OPENCLAW_URL}/api/chat",
            json={
                "message": user_message,
                "user_id": user_id,
                "context": "southwind_counselling"
            },
            timeout=30
        )
        return response.json().get('reply', '抱歉，我暫時無法回答，請稍後再試。')
    except Exception as e:
        print(f"AI 調用錯誤: {e}")
        return None

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    welcome = """
🌿 歡迎來到南風AI心理輔導！

我是你的 AI 輔導助手，24/7 在線陪伴你。

📋 常用命令：
/pricing - 查看價格
/pay - 立即付款
/contact - 聯絡我們
/help - 幫助中心

💬 直接發送消息，我會用 AI 為你提供輔導建議！
"""
    await message.answer(welcome)

@dp.message(Command("pricing"))
async def cmd_pricing(message: types.Message):
    pricing = """
📋 價格方案：

🌿 月費：HK$299/月
🏆 年費：HK$2,999/年

輸入 /pay 立即付款 💳
"""
    await message.answer(pricing)

@dp.message(Command("pay"))
async def cmd_pay(message: types.Message):
    pay = """
💳 付款連結：

月費：https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200
年費：https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201

FPS ID：91946650
"""
    await message.answer(pay)

@dp.message(Command("contact"))
async def cmd_contact(message: types.Message):
    contact = """
📞 聯絡我們：
WhatsApp：9194 6650
Email：southwindcounselling@gmail.com
"""
    await message.answer(contact)

@dp.message()
async def handle_ai_chat(message: types.Message):
    """所有普通消息都發給 AI 處理"""
    user_text = message.text
    user_id = message.from_user.id
    
    # 顯示"正在輸入"
    await bot.send_chat_action(message.chat.id, "typing")
    
    # 調用本地 AI
    ai_reply = ask_local_ai(user_text, user_id)
    
    if ai_reply:
        await message.answer(ai_reply)
    else:
        # AI 失敗時的預設回覆
        await message.answer(
            "💚 收到你的消息！我會盡快回覆你。\n\n"
            "如果是緊急情況，請直接聯絡我們：\n"
            "WhatsApp：9194 6650"
        )

async def main():
    print("Bot 啟動中...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
```

### 步驟 4：創建配置文件

`config.json`：
```json
{
  "bot_token": "8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec",
  "openclaw_url": "http://localhost:8000"
}
```

### 步驟 5：安裝依賴
```bash
pip install aiogram requests
```

### 步驟 6：運行 Bot
```bash
python bot.py
```

---

## 重要：停止 Railway 上的 Bot

在本地運行前，必須停止 Railway，否則會衝突：

1. 打開 Railway App
2. 找到 southwind-counselling 項目
3. Settings → Pause 或 Delete

---

## 替代方案：創建新 Bot

如果不想動現有的 @southwindcounsellingbot：

1. 在 @BotFather 創建新 Bot（例如 @southwind_ai_bot）
2. 用上面的腳本本地運行
3. 給客戶這個新 Bot 的鏈接

---

## 你選哪個？

**A. 本地運行現有 @southwindcounsellingbot**（需要停止 Railway）
**B. 創建新 Bot 專門用於 AI 輔導**（保留現有 Bot 做客服）

**推薦選 B**，這樣你有兩個 Bot：
- @southwindcounsellingbot：Railway 客服（簡單查詢）
- @southwind_ai_bot：本地 AI 輔導（深度對話）
