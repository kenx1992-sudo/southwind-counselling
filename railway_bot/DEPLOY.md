# Railway 部署指南

## 准备工作

### 1. 下载代码
```bash
# 从 GitHub 下载 railway_bot 文件夹
# 或手动创建以下文件结构
```

### 2. 文件结构
```
railway_bot/
├── bot.py           # 主程序
├── requirements.txt # 依赖
└── railway.json     # Railway 配置
```

---

## 部署步骤

### 步骤 1：注册 Railway
1. 打开 https://railway.app
2. 点击 "Start for Free"
3. 用 GitHub 账号登录

### 步骤 2：创建项目
1. 点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 授权 Railway 访问你的 GitHub
4. 选择 southwind-counselling 仓库
5. 选择 railway_bot 文件夹

### 步骤 3：设置环境变量
1. 在项目页面点击 "Variables"
2. 点击 "New Variable"
3. 添加：
   ```
   Key: BOT_TOKEN
   Value: 8686528702:AAHMsgw0_-wOev2qjq4H13T-MBVYaQOWdec
   ```

### 步骤 4：部署
1. 点击 "Deploy"
2. 等待部署完成（约 2-3 分钟）
3. 看到 "🟢 Healthy" 表示成功

### 步骤 5：测试
1. 打开 Telegram
2. 找 @southwindcounsellingbot
3. 发送 /start
4. 应该收到欢迎消息

---

## 管理

### 查看日志
1. 在 Railway 项目页面
2. 点击 "Deployments"
3. 点击最新的部署
4. 查看 "Logs"

### 重启 Bot
1. 点击 "Restart"
2. 或推送新代码自动重启

### 停止 Bot
1. 点击 "Settings"
2. 选择 "Remove"

---

## 费用

- **免费额度**：每月 $5
- **本 Bot**：约 $1-2/月
- **足够运行**：是的 ✅

---

## 常见问题

### Q: 部署失败怎么办？
A: 检查日志，通常是环境变量没设置

### Q: Bot 不回复？
A: 检查 Logs 是否有错误，或 Token 是否正确

### Q: 如何更新代码？
A: 修改代码后 push 到 GitHub，Railway 自动重新部署

---

## 快速检查清单

- [ ] Railway 账号注册
- [ ] GitHub 仓库已推送
- [ ] 环境变量 BOT_TOKEN 设置
- [ ] 部署成功 (Healthy)
- [ ] Telegram 测试通过
