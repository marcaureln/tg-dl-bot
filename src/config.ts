import 'dotenv/config';

export default {
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  apiRoot: process.env.TELEGRAM_API_ROOT || 'https://api.telegram.org',
  outputDir: process.env.OUTPUT_DIR || '/telegram/',
};
