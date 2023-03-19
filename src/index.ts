import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { mv } from './utils';
import config from './config';

if (config.botToken === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(config.botToken, {
  telegram: {
    apiRoot: config.apiRoot,
  },
});

bot.start((ctx) => ctx.reply('Welcome to the Telegram File Downloader Bot!'));

bot.help((ctx) => ctx.reply("Send or forward any message containing a document and I'll download it to your server"));

bot.on(message('video'), async (ctx) => {
  const { file_id, file_name } = ctx.message.video;

  await ctx.reply(`⏳ Downloading ${file_name}...`);

  try {
    const { file_path } = await ctx.telegram.getFile(file_id);

    if (!file_path) {
      throw new Error('File path not found');
    }

    const destination = mv(file_path, file_name || file_id, config.outputDir);

    await ctx.reply(`✅ File saved to ${destination}`);
  } catch (error) {
    console.error(error);
    await ctx.reply('❌ An error occurred. Unable to download file.');
  }
});

bot.on(message('document'), async (ctx) => {
  const { file_id, file_name } = ctx.message.document;

  await ctx.reply(`⏳ Downloading ${file_name}...`);

  try {
    const { file_path } = await ctx.telegram.getFile(file_id);

    if (!file_path) {
      throw new Error('File path not found');
    }

    const destination = mv(file_path, file_name || file_id, config.outputDir);

    await ctx.reply(`✅ File saved to ${destination}`);
  } catch (error) {
    console.error(error);
    await ctx.reply('❌ An error occurred. Unable to download file.');
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
