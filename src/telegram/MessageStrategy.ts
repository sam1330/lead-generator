import "dotenv/config";
import type { Context } from "telegraf";
import type { Update } from "telegraf/types";
import { rootAgent } from "../agents/orchetrator/agent.js";
import { InMemorySessionService, Runner } from "@google/adk";
import { startActiveObservation, startObservation } from "@langfuse/tracing";

interface MessageStrategy {
  handle: (message: string) => Promise<void>;
}

const sessionService = new InMemorySessionService();

export class TextMessageStrategy implements MessageStrategy {
  private ctx: Context<Update>;

  constructor(ctx: Context<Update>) {
    this.ctx = ctx;
  }

  async handle(): Promise<void> {
    // Handle text message
    sessionService.createSession({
      appName: "lead_generator",
      sessionId: String(this.ctx.message?.from.id),
      userId: String(this.ctx.chat?.id),
    });

    try {
      const runner = new Runner({
        appName: "lead_generator",
        agent: rootAgent,
        sessionService,
      });

      let replyText = "";
      const userMessage = this.ctx?.text;

      await startActiveObservation("user-request", async (span) => {
        span.update({
          input: { query: userMessage },
        });

        const generation = startObservation(
          "llm-call",
          {
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            input: [
              {
                role: "user",
                parts: [
                  {
                    text: String(userMessage),
                  },
                ],
              },
            ],
          },
          { asType: "generation" },
        );

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

        generation
          .update({
            output: { content: replyText },
          })
          .end();

        span.update({ output: "Successfully answered" });
      });

      this.ctx.reply(replyText);
    } catch (error) {
      console.log(error);
      this.ctx.reply("there has been a problem executing this task");
    }
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
