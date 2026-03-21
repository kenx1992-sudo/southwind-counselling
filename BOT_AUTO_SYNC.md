# 自动同步配置指南

## 目标
让 @Szechunbot 自动处理消息，复杂问题转发给 Kimi

---

## 方案选择

### 方案 1: ManyBot (推荐，免费，5分钟设置)
使用现成的 Bot 管理平台

### 方案 2: Webhook.site + 转发 (测试用)
临时测试 Webhook 接收

### 方案 3: 自建服务器 (长期方案)
需要 VPS 或 Cloudflare Workers

---

## 方案 1: ManyBot (推荐)

### 步骤

1. **在 Telegram 搜索 @ManyBot**

2. **添加你的 Bot**
   ```
   发送: /addbot
   然后输入: 8639991395:AAG8Pr5TsW7L-Gx8u0slbbqM7kaXutkCQ1o
   ```

3. **设置自动回复规则**
   ```
   /commands - 查看命令
   /autoreply - 设置自动回复
   ```

4. **设置转发规则**
   当用户发送特定关键词时，转发给指定管理员

---

## 方案 2: Webhook 测试 (现在可以试)

### 步骤 1: 获取临时 Webhook URL
1. 打开 https://webhook.site
2. 复制你的唯一 URL (如: https://webhook.site/12345678-abcd-efgh-xxxx)

### 步骤 2: 设置 Webhook
```bash
curl -X POST "https://api.telegram.org/bot8639991395:AAG8Pr5TsW7L-Gx8u0slbbqM7kaXutkCQ1o/setWebhook?url=https://webhook.site/YOUR_UNIQUE_URL"
```

### 步骤 3: 测试
1. 给用户发送测试消息
2. 在 webhook.site 查看接收到的消息
3. 确认消息格式

---

## 方案 3: 自建 Node.js 服务器

### 代码模板

```javascript
// bot-server.js
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const BOT_TOKEN = '8639991395:AAG8Pr5TsW7L-Gx8u0slbbqM7kaXutkCQ1o';
const KIMI_WEBHOOK = 'https://your-kimi-endpoint.com/webhook'; // Kimi 接收端点
const ADMIN_CHAT_ID = '5029196275';

// 接收 Telegram 消息
app.post('/webhook', async (req, res) => {
    const { message } = req.body;
    
    if (!message || !message.text) {
        return res.sendStatus(200);
    }
    
    const userId = message.from.id;
    const text = message.text;
    const chatId = message.chat.id;
    
    console.log(`收到消息: ${text} from ${userId}`);
    
    // 简单问题：自动回复
    if (text === '/start') {
        await sendMessage(chatId, 
            '🌿 歡迎來到南風AI心理輔導！\n\n' +
            '💚 我可以幫你：\n' +
            '• /pricing - 查看價格\n' +
            '• /help - 使用幫助\n' +
            '• 直接發消息開始對話'
        );
    }
    else if (text === '/pricing') {
        await sendMessage(chatId,
            '📋 價格方案：\n\n' +
            '🌿 月費：HK$299/月\n' +
            '🏆 年費：HK$2,999/年\n\n' +
            '輸入 /pay 立即付款'
        );
    }
    // 复杂问题：转发给 Kimi
    else if (text.includes('建議') || text.includes('諮詢') || text.length > 50) {
        // 转发给 Kimi
        await forwardToKimi({
            userId,
            text,
            chatId
        });
        
        await sendMessage(chatId, 
            '已收到你的消息，正在轉交給專業團隊處理，請稍候... 💚'
        );
    }
    // 其他：简单回复
    else {
        await sendMessage(chatId,
            '收到！請問你想了解什麼服務呢？\n\n' +
            '輸入 /pricing 查看價格\n' +
            '或詳細描述你的需求 💬'
        );
    }
    
    res.sendStatus(200);
});

// 发送消息
async function sendMessage(chatId, text) {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: text
    });
}

// 转发给 Kimi
async function forwardToKimi(data) {
    // 发送到你的 Kimi 接收端点
    await axios.post(KIMI_WEBHOOK, data);
    
    // 同时通知管理员
    await sendMessage(ADMIN_CHAT_ID, 
        `📩 新消息需要处理\n\n` +
        `用户: ${data.userId}\n` +
        `内容: ${data.text.substring(0, 100)}...\n\n` +
        `请回复处理意见`
    );
}

// Kimi 回复接口
app.post('/kimi-reply', async (req, res) => {
    const { userId, reply } = req.body;
    
    await sendMessage(userId, reply);
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Bot server running on port 3000');
});
```

### 部署
```bash
# 使用 Railway 或 Render (免费)
# 或使用你自己的服务器
```

---

## 快速启动建议

### 第一步: 使用 ManyBot (今天完成)
1. 找 @ManyBot
2. 添加 @Szechunbot
3. 设置基本自动回复

### 第二步: 手动转发 (过渡)
在自动同步完全配置好之前，你先手动转发复杂问题给我

### 第三步: 完整自动化
部署自己的服务器或使用云服务

---

## 你现在的选择

**A. 立即使用 ManyBot**
- 优点：5分钟设置好
- 缺点：功能有限

**B. 先用 Webhook.site 测试**
- 优点：可以看到消息格式
- 缺点：临时方案

**C. 部署代码**
- 优点：完全自定义
- 缺点：需要服务器

**推荐：先 A 后 C**
