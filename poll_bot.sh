#!/bin/bash
# Szechunbot 轮询脚本
# 每 30 秒检查一次新消息

BOT_TOKEN="8639991395:AAG8Pr5TsW7L-Gx8u0slbbqM7kaXutkCQ1o"
LAST_UPDATE_ID=0

while true; do
    # 获取新消息
    RESPONSE=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${LAST_UPDATE_ID}&limit=10")
    
    # 解析消息
    echo "$RESPONSE" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for update in data.get('result', []):
    update_id = update.get('update_id')
    message = update.get('message', {})
    text = message.get('text', '')
    chat_id = message.get('chat', {}).get('id')
    
    if text and chat_id:
        print(f'{update_id}|{chat_id}|{text}')
" | while IFS='|' read -r UPDATE_ID CHAT_ID TEXT; do
        if [ -n "$UPDATE_ID" ]; then
            echo "收到: $TEXT from $CHAT_ID"
            
            # 更新 last_update_id
            LAST_UPDATE_ID=$((UPDATE_ID + 1))
            
            # 这里需要调用 Kimi API 处理消息
            # 暂时先记录到文件
            echo "$(date): [$CHAT_ID] $TEXT" >> /tmp/szechunbot_messages.log
        fi
    done
    
    # 等待 30 秒
    sleep 30
done
