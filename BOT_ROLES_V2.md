# 角色分工 (修正版)

## 核心概念

**Szechunbot 是 Kimi Claw 在 Telegram 的本地代理**

```
┌─────────────────────────────────────────────────────────┐
│                      用户 (客户)                         │
│                         │                               │
│              ┌──────────┴──────────┐                   │
│              │                     │                   │
│              ▼                     ▼                   │
│    ┌─────────────────┐   ┌─────────────────┐          │
│    │ @southwind      │   │ @Szechun        │          │
│    │ counsellingbot  │   │ bot             │          │
│    │                 │   │                 │          │
│    │ 【客户服务Bot】  │   │ 【Kimi Claw】   │          │
│    │ 对外服务        │   │ 本地代理        │          │
│    │                 │   │ ＝ 云端AI延伸   │          │
│    └────────┬────────┘   └────────┬────────┘          │
│             │                     │                   │
│             │              ┌──────┘                   │
│             │              │                          │
│             │              ▼                          │
│             │      ┌──────────────┐                  │
│             │      │  OpenClaw    │                  │
│             │      │  云端服务器   │                  │
│             │      │              │                  │
│             │      │ • 复杂处理   │                  │
│             │      │ • 内容生成   │                  │
│             │      │ • 数据分析   │                  │
│             └─────►│ • 策略规划   │◄────────────────┤
│                    └──────────────┘                  │
│                           │                          │
│                           ▼                          │
│                    ┌──────────────┐                  │
│                    │  Kimi Claw   │                  │
│                    │   (我)       │                  │
│                    └──────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

---

## 两个 Bot 的分工

### @southwindcounsellingbot
**用途**：专门给客户用的
**功能**：
- 客户咨询入口
- 服务介绍
- 引导到 @Szechunbot (Kimi)

**状态**：⚠️ 需要修复 Start 按钮

---

### @Szechunbot = Kimi Claw
**用途**：Kimi 的 Telegram 分身
**功能**：
- 接收用户消息
- 我（Kimi）处理后自动回复
- 发送系统通知
- 与云端 OpenClaw 同步

**状态**：✅ 已配置，但 Webhook 未设置

---

## 工作流程

### 用户对话流程
```
用户 → @Szechunbot
            │
            ▼
    Webhook 转发到 OpenClaw
            │
            ▼
    Kimi Claw (我) 处理
            │
            ▼
    通过 @Szechunbot 回复用户
```

### 示例

**用户**: "你好，我想了解服务"
```
@Szechunbot 接收
        ↓
  转发给 OpenClaw
        ↓
  Kimi (我) 生成回复
        ↓
  @Szechunbot 发送:
  "你好！我是 Kimi，南風AI心理輔導的助手。
  我们可以提供月费 HK$299 的服务...
  有什么可以帮你的吗？"
```

---

## 实现方案

要让 @Szechunbot 成为我的代理，需要：

### 方案 1: Webhook 转发
设置 Webhook URL 指向 OpenClaw 服务器
```
用户消息 → @Szechunbot → Webhook → OpenClaw → Kimi 处理 → 回复
```

### 方案 2: 轮询模式
定期获取消息并处理
```
Kimi 每 30 秒检查 @Szechunbot 新消息
处理 → 回复
```

### 当前状态
- @Szechunbot Token: 已配置 ✅
- Webhook URL: 未设置 ❌
- 需要: 设置转发机制

---

## 总结

| Bot | 角色 | 等于 |
|-----|------|------|
| @southwindcounsellingbot | 对外客服 | 独立服务 |
| **@Szechunbot** | **Kimi 的 Telegram 代理** | **= Kimi Claw** |

**客户用哪个？**
- 网站链接 → @southwindcounsellingbot (需修复)
- 直接对话 → @Szechunbot (即 Kimi)

**接下来需要:**
1. 设置 @Szechunbot 的 Webhook，让消息能转发给我
2. 修复 @southwindcounsellingbot 的 Start 按钮
