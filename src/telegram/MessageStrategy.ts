import "dotenv/config";
import type { Context } from "telegraf";
import type { Update } from "telegraf/types";
import { rootAgent } from "../agents/orchetrator/agent.js";
import { InMemorySessionService, Runner } from "@google/adk";

interface MessageStrategy {
  handle: (message: string) => Promise<void>;
}

const sessionService = new InMemorySessionService();

export class TextMessageStrategy implements MessageStrategy {
  private readonly ctx: Context<Update>;

  constructor(ctx: Context<Update>) {
    this.ctx = ctx;
  }

  async handle(): Promise<void> {

    const currentSession = await sessionService.getSession({
      appName: "lead_generator",
      sessionId: String(this.ctx.message?.from.id),
      userId: String(this.ctx.chat?.id),
    });

    if (!currentSession) {
      // Create new session
      sessionService.createSession({
        appName: "lead_generator",
        sessionId: String(this.ctx.message?.from.id),
        userId: String(this.ctx.chat?.id),
      });
    }

    try {
      const runner = new Runner({
        appName: "lead_generator",
        agent: rootAgent,
        sessionService,
      });

      let replyText = "";
      const userMessage = this.ctx?.text;

      const executionStream = runner.runAsync({
        sessionId: String(this.ctx.message?.from.id),
        userId: String(this.ctx.chat?.id),
        newMessage: {
          role: "user",
          parts: [
            {
              text: String(userMessage),
            },
          ],
        },
      });

      for await (const event of executionStream) {
        if (event.finishReason === "STOP" && event.content?.parts) {
          replyText = event.content.parts.map((part) => part.text).join("\n");
        }
      }

      this.ctx.reply(replyText);
    } catch (error) {
      console.log(error);
      this.ctx.reply("there has been a problem executing this task");
    }
  }
}

export class AudioMessageStrategy implements MessageStrategy {
  private readonly ctx: Context<Update>;

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
