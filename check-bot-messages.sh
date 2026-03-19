#!/bin/bash
TOKEN="8639991395:AAG8Pr5TsW7L-Gx8u0slbbqM7kaXutkCQ1o"
LAST_ID_FILE="/tmp/last_update_id"

# 讀取最後處理的 ID
if [ -f "$LAST_ID_ID_FILE" ]; then
    LAST_ID=$(cat "$LAST_ID_FILE")
else
    LAST_ID=0
fi

# 獲取新消息
curl -s "https://api.telegram.org/bot$TOKEN/getUpdates?offset=$((LAST_ID + 1))&limit=10" | python3 -c "
import json,sys,os
data=json.load(sys.stdin)
last_id=0
for u in data.get('result',[]):
    last_id=u.get('update_id',0)
    m=u.get('message',{})
    if m and m.get('text'):
        chat=m.get('chat',{})
        user=m.get('from',{})
        if user.get('is_bot'): continue
        print(f\"[TG:{user.get('first_name')}] {m.get('text')}\")
        # 標記為新消息
        print('NEW_MESSAGE')

if last_id>0:
    with open('/tmp/last_update_id','w') as f:
        f.write(str(last_id))
"
