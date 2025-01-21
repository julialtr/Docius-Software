FROM python:3.13.1-slim

RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    xvfb \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONUNBUFFERED=1 \
DISPLAY=:99.0

WORKDIR /src
COPY ./src /src 

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["sh", "-c", "Xvfb :99 -screen 0 1024x768x16 & python main.py"]
