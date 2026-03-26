FROM python:3.11-slim

WORKDIR /app

COPY railway_bot/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY railway_bot/bot.py ./

CMD ["python", "bot.py"]
