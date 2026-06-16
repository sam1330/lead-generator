import { Context, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import type { Update } from "telegraf/types";
import { AudioMessageStrategy, DocumentMessageStrategy, ImageMessageStrategy, TextMessageStrategy } from "./MessageStrategy.js";
import 'dotenv/config';

const telegramBot: Telegraf<Context<Update>> = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

telegramBot.start((ctx) => ctx.reply("Hello! welcome to your AI Lead Generator"));

telegramBot.on(message("text"), async (ctx) => await new TextMessageStrategy(ctx).handle());

telegramBot.on(message("voice"), async (ctx) => await new AudioMessageStrategy(ctx).handle());

telegramBot.on(message("photo"), async (ctx) => await new ImageMessageStrategy(ctx).handle());

telegramBot.on(message("document"), async (ctx) => await new DocumentMessageStrategy(ctx).handle());

export default telegramBot;