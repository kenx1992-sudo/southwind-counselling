# 云端 24/7 Bot 托管方案

## 问题
本地运行 Python 脚本：
- ❌ 电脑关机 = Bot 下线
- ❌ 网络断开 = 消息丢失
- ❌ 不稳定

**需要：云端服务器 24/7 运行**

---

## 推荐方案

### 方案 1: Railway (推荐 ⭐)
**免费额度**: 每月 $5 免费额度
**难度**: ⭐⭐ (中等)
**稳定性**: ⭐⭐⭐⭐⭐

**步骤**:
1. 注册 https://railway.app (用 GitHub 账号)
2. 创建新项目
3. 上传 Python 脚本
4. 自动 24/7 运行

**优点**:
- 免费额度够用
- 自动部署
- 稳定可靠

---

### 方案 2: Render (推荐 ⭐)
**免费**: 完全免费 (有休眠限制)
**难度**: ⭐⭐ (中等)
**稳定性**: ⭐⭐⭐⭐

**步骤**:
1. 注册 https://render.com
2. 创建 Web Service
3. 上传代码
4. 设置环境变量 (BOT_TOKEN)

**限制**:
- 15分钟无访问会休眠
- 唤醒需要 30 秒

---

### 方案 3: Fly.io
**免费**: 每月 $5 免费额度
**难度**: ⭐⭐⭐ (较难)
**稳定性**: ⭐⭐⭐⭐⭐

---

### 方案 4: AWS Lambda (进阶)
**免费**: 每月 100万次请求免费
**难度**: ⭐⭐⭐⭐ (难)
**稳定性**: ⭐⭐⭐⭐⭐

---

### 方案 5: ManyBot (最简单 ⭐⭐⭐)
**免费**: 完全免费
**难度**: ⭐ (简单)
**稳定性**: ⭐⭐⭐⭐

**步骤**:
1. 在 Telegram 找 @ManyBot
2. 发送 `/addbot`
3. 输入 @southwindcounsellingbot 的 Token
4. 设置自动回复规则
5. **完成！云端运行**

**优点**:
- 无需代码
- 完全免费
- 立即上线

**缺点**:
- 功能有限
- 需要手动设置每个回复

---

## 推荐选择

| 需求 | 推荐方案 |
|------|---------|
| **最快上线** | ManyBot (5分钟) |
| **免费+稳定** | Railway |
| **完全免费** | Render |
| **长期运营** | Railway / Fly.io |

---

## 最推荐: Railway 详细步骤

### 1. 准备代码
创建 `bot.py`:
```python
import os
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

BOT_TOKEN = os.getenv("BOT_TOKEN")  # 从环境变量读取

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    await message.answer(
        "🌿 欢迎来到南風AI心理輔導！\\n\\n"
        "点击菜单查看服务，或直接发送消息开始对话 💚"
    )

@dp.message(Command("pricing"))
async def cmd_pricing(message: types.Message):
    await message.answer(
        "📋 价格方案：\\n\\n"
        "🌿 月费：HK$299/月\\n"
        "🏆 年费：HK$2,999/年\\n\\n"
        "输入 /pay 立即付款"
    )

@dp.message()
async def handle_message(message: types.Message):
    # 转发给 Kimi 处理
    await message.answer(
        "收到你的消息！正在处理中... 💚\\n"
        "复杂问题将转交给专业团队。"
    )

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
```

### 2. 创建 requirements.txt
```
aiogram==3.0.0
```

### 3. 部署到 Railway
```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 初始化项目
railway init

# 设置环境变量
railway variables set BOT_TOKEN=8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec

# 部署
railway up
```

### 4. 完成
- Bot 24/7 云端运行
- 自动回复 /start, /pricing
- 其他消息可以转发给你处理

---

## 快速选择

**A. 最快 (5分钟)** → ManyBot
**B. 免费稳定 (30分钟)** → Railway
**C. 完全免费 (30分钟)** → Render

**推荐选 A (ManyBot) 先上线，之后再迁移到 Railway！**
