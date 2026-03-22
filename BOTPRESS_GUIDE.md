# Botpress 配置指南

## Botpress 是什么

可视化 Bot 构建平台，拖拽式界面，无需写代码。

官网：https://botpress.com

---

## Botpress vs Railway

| 对比 | Botpress | Railway |
|------|----------|---------|
| 难度 | ⭐ 简单 | ⭐⭐⭐ 较难 |
| 界面 | 可视化拖拽 | 代码部署 |
| 免费额度 | 有 | 有 |
| 自定义 | 中等 | 完全自定义 |
| 适合 | 快速上线 | 长期运营 |

---

## 使用 Botpress 步骤

### 步骤 1：注册
1. 访问 https://botpress.com
2. 点击 "Get Started"
3. 用邮箱或 GitHub 注册

### 步骤 2：创建 Bot
1. 点击 "Create Bot"
2. 选择 "From Scratch"
3. 输入名称：Southwind Bot

### 步骤 3：连接 Telegram
1. 在 Botpress 左侧面板点击 "Integrations"
2. 找到 "Telegram" 点击 Install
3. 输入你的 Bot Token：
   ```
   8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
   ```
4. 点击 Save

### 步骤 4：设置欢迎消息
1. 点击 "Main" 进入流程编辑器
2. 拖拽 "Entry" 节点
3. 连接 "Say Something" 节点
4. 输入欢迎消息：
   ```
   🌿 欢迎来到南風AI心理輔導！
   
   我是你的 AI 助手，24/7 在线陪伴你。
   
   💚 我可以帮你：
   • /pricing - 查看价格
   • /help - 使用帮助
   • 直接发送消息开始对话
   ```

### 步骤 5：设置命令回复
为每个命令创建节点：

**Pricing 节点：**
```
Trigger: /pricing
Response: 
📋 价格方案：
🌿 月费：HK$299/月
🏆 年费：HK$2,999/年
```

**Pay 节点：**
```
Trigger: /pay
Response:
💳 付款链接：
月费：https://buy.stripe.com/6oU8wH8iv16q8Ptg9N0x200
年费：https://buy.stripe.com/7sY9ALdCP16q0iXaPt0x201
```

### 步骤 6：部署
1. 点击右上角 "Publish"
2. Bot 立即上线！

---

## 高级功能

### AI 对话
Botpress 内置 AI，可以：
- 理解用户意图
- 自动回复常见问题
- 转接人工

### 数据库
- 保存用户数据
- 追踪对话历史
- 分析统计数据

### Webhook
可以设置 Webhook 转发消息给 Kimi 处理复杂问题。

---

## 建议

**如果 Railway 已经能用** → 继续用 Railway，完全免费且功能全

**如果想要更简单** → 可以迁移到 Botpress，可视化操作更容易

**最佳选择** → 两个都用：
- Railway：运行核心 Bot
- Botpress：管理对话流程（如果需要复杂逻辑）

---

## 现在的情况

你的 Railway Bot **已经运行成功了**！

建议：
1. **先测试 Railway Bot** 是否能正常工作
2. **如果够用，就继续用 Railway**（免费且灵活）
3. **如果觉得复杂，再迁移到 Botpress**

要不要先在 Telegram 测试一下 Railway Bot？
