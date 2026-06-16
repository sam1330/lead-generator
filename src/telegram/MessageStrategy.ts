import type { Context } from "telegraf";
import type { Update } from "telegraf/types";

interface MessageStrategy {
    handle: (message: string) => Promise<void>;
}

export class TextMessageStrategy implements MessageStrategy {
    private ctx: Context<Update>;

    constructor(ctx: Context<Update>) {
        this.ctx = ctx;
    }

    async handle(): Promise<void> {
        // Handle text message
        this.ctx.reply("Hello! welcome to your AI Lead Generator - Text");
    }
}

export class AudioMessageStrategy implements MessageStrategy {
    private ctx: Context<Update>;

    constructor(ctx: Context<Update>) {
        this.ctx = ctx;
    }

    async handle(): Promise<void> {
        // Handle voice message
        this.ctx.reply("Hello! welcome to your AI Lead Generator - Audio");
    }
}

export class ImageMessageStrategy implements MessageStrategy {
    private ctx: Context<Update>;

    constructor(ctx: Context<Update>) {
        this.ctx = ctx;
    }

    async handle(): Promise<void> {
        // Handle voice message
        this.ctx.reply("Hello! welcome to your AI Lead Generator - Image");
    }
}

export class DocumentMessageStrategy implements MessageStrategy {
    private ctx: Context<Update>;

    constructor(ctx: Context<Update>) {
        this.ctx = ctx;
    }

    async handle(): Promise<void> {
        // Handle voice message
        this.ctx.reply("Hello! welcome to your AI Lead Generator - Document");
    }
}