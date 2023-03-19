# Telegram Download Bot

Telegram bot to download files from Telegram without size limit. It's based on a self hosted [Telegram Bot API](https://github.com/tdlib/telegram-bot-api) (to ) and a Node app using [Telegraf](https://github.com/telegraf/telegraf/tree/v4)

## Features

- [x] Supported file types: document and video
- [x] Download files without a size limit
- [ ] Add an authentication system to allow only certain users to use the bot
- [ ] Support images, audio and other file types

## Getting Started

### Prerequisites

- You need an `api_id` and `api_hash`: https://core.telegram.org/api/obtaining_api_id
- You need Bot token: can be obtained with [@BotFather](https://t.me/BotFather) or if you need more help, you can read this: https://core.telegram.org/bots#how-do-i-create-a-bot

### Installing

You need to have Docker and Docker Compose installed. If you don't have it, you can follow the instructions here: https://docs.docker.com/engine/install/ and https://docs.docker.com/compose/install/

```bash
git clone https://github.com/marcaureln/tg-dl-bot.git
cd tg-dl-bot
cp .env.example .env
vim .env # Edit .env file and set your api_id, api_hash and bot token
vim docker-compose.yml # Edit docker-compose.yml file, you can replace the content with the docker-compose.prod.yml
docker-compose up -d # Run the bot
```

## Usage

Send or forward the bot (created with [@BotFather](https://t.me/BotFather)) any message containing a supported media type and it will download it on your server. Files are stored by default in the `/telegram/` folder of your Docker container, you can change it in the `.env` file with the `OUTPUT_DIR` variable. Bind the folder to your host machine to access the files from your host. You can also serve the files with a web server like Nginx.

### Contributing

Feel free to open an issue or a pull request.
