import os
import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.enums import ParseMode

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 从环境变量获取 Token
BOT_TOKEN = os.getenv("BOT_TOKEN")
if not BOT_TOKEN:
    raise ValueError("BOT_TOKEN environment variable is not set!")

# 初始化 Bot 和 Dispatcher
bot = Bot(token=BOT_TOKEN, parse_mode=ParseMode.HTML)
dp = Dispatcher()

# ========== 命令处理 ==========

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    """处理 /start 命令"""
    welcome_text = """
🌿 <b>欢迎来到南風AI心理輔導！</b>

我是你的 AI 輔導助手，24/7 在線陪伴你。

💚 <b>我可以幫你：</b>
• 情緒傾聽與支持
• 壓力管理建議  
• 心理健康資訊
• 預約真人輔導

📋 <b>常用命令：</b>
/pricing - 查看價格方案
/pay - 立即付款
/help - 使用幫助
/contact - 聯絡真人輔導

💬 <b>直接發送消息開始對話！</b>
"""
    await message.answer(welcome_text)

@dp.message(Command("pricing"))
async def cmd_pricing(message: types.Message):
    """处理 /pricing 命令"""
    pricing_text = """
📋 <b>南風心理輔導 - 訂閱方案</b>

🌿 <b>月費計劃 - HK$299/月</b>
✓ 30天 AI 輔導對話任用
✓ 每月 1 次真人視訊諮詢
✓ 專業心理測評
✓ 心理健康資源庫

🏆 <b>年費計劃 - HK$2,999/年</b>
✓ 全年 AI 輔導對話任用
✓ 每月 2 次真人視訊諮詢
✓ 優先預約權
✓ 專屬輔導員配對
✓ 年度心理健康報告
💰 <b>比月費節省 16%！</b>

💳 <b>付款方式：</b>
🇭🇰 香港用戶：FPS 轉數快
🌍 國際用戶：Stripe 信用卡

輸入 /pay 立即付款
"""
    await message.answer(pricing_text)

@dp.message(Command("pay"))
async def cmd_pay(message: types.Message):
    """处理 /pay 命令"""
    pay_text = """
💳 <b>選擇付款方式</b>

📋 <b>Stripe 信用卡支付</b>（國際用戶）

🌿 <b>月費計劃 - HK$299/月</b>
👉 https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200

🏆 <b>年費計劃 - HK$2,999/年</b>
👉 https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201

💰 比月費節省 16%！

🇭🇰 <b>香港用戶 - FPS 轉數快</b>
請發送 /fps 獲取付款二維碼

付款完成後請截圖發送給我，
我會立即為你開通服務 ✅
"""
    await message.answer(pay_text)

@dp.message(Command("fps"))
async def cmd_fps(message: types.Message):
    """处理 /fps 命令"""
    fps_text = """
📱 <b>FPS 轉數快付款</b>

📌 <b>FPS ID：</b>91946650
📌 <b>商戶名稱：</b>SOUTHWIND COUNSELLING

📋 <b>付款步驟：</b>
1. 打開銀行 App
2. 選擇「轉數快 FPS」
3. 輸入 FPS ID：91946650
4. 確認金額並付款
5. <b>截圖付款記錄</b>發給我

💚 <b>確認後立即開通服務！</b>
"""
    await message.answer(fps_text)

@dp.message(Command("help"))
async def cmd_help(message: types.Message):
    """处理 /help 命令"""
    help_text = """
❓ <b>使用幫助</b>

📋 <b>常用命令：</b>
/start - 開始對話
/pricing - 查看價格方案
/pay - 立即付款
/fps - FPS 付款指引
/contact - 聯絡真人輔導

💬 <b>如何開始：</b>
1. 輸入 /pricing 了解服務
2. 輸入 /pay 選擇付款方式
3. 或直接發送消息與我對話

🌿 <b>隨時隨地，我都在這裡陪伴你。</b>
"""
    await message.answer(help_text)

@dp.message(Command("contact"))
async def cmd_contact(message: types.Message):
    """处理 /contact 命令"""
    contact_text = """
📞 <b>聯絡我們</b>

💚 <b>南風心理輔導室</b>

📱 <b>WhatsApp：</b>9194 6650
📧 <b>Email：</b>southwindcounselling@gmail.com
🌐 <b>網站：</b>https://southwind-counselling.vercel.app

⏰ <b>服務時間：</b>
AI 輔導：24/7 全天候
真人輔導：預約制

💬 有任何問題歡迎隨時聯絡！
"""
    await message.answer(contact_text)

# ========== 消息处理 ==========

@dp.message()
async def handle_message(message: types.Message):
    """处理普通消息"""
    user_text = message.text.lower()
    
    # 关键词自动回复
    if any(word in user_text for word in ["價格", "多少錢", "費用", "收費"]):
        await message.answer(
            "💰 我們的價格方案：\n\n"
            "🌿 月費：HK$299/月\n"
            "🏆 年費：HK$2,999/年\n\n"
            "輸入 /pay 查看詳情或立即付款 💳"
        )
    
    elif any(word in user_text for word in ["預約", "預定", "booking"]):
        await message.answer(
            "📅 預約真人輔導：\n\n"
            "1. 輸入 /contact 查看聯絡方式\n"
            "2. 或發送你的需求給我\n\n"
            "我們會盡快為你安排合適的輔導員 💚"
        )
    
    elif any(word in user_text for word in ["焦慮", "壓力", "不開心", "情緒"]):
        await message.answer(
            "🌿 聽到你這樣說，我想讓你知道：\n\n"
            "<b>你並不孤單。</b>\n\n"
            "無論是焦慮、壓力還是情緒困擾，"
            "我都在這裡陪伴你。\n\n"
            "💬 想多說一點嗎？或者輸入 /contact 預約真人諮詢。"
        )
    
    else:
        # 默认回复
        await message.answer(
            "💚 收到你的消息！\n\n"
            "我可以幫你：\n"
            "• 輸入 /pricing 查看價格\n"
            "• 輸入 /contact 聯絡真人輔導\n"
            "• 直接告訴我你的需求\n\n"
            "我會盡快回覆你 😊"
        )

# ========== 主程序 ==========

async def main():
    """主程序"""
    logger.info("Bot started!")
    
    # 删除 webhook（确保使用 polling）
    await bot.delete_webhook(drop_pending_updates=True)
    
    # 开始 polling
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
