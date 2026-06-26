import "./instrumentation.js"
import 'dotenv/config';
import "./events/consumers/index.js"; 
import telegramBot from "./telegram/index.js";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";

const sdk = new NodeSDK({
  spanProcessors: [new LangfuseSpanProcessor()],
});

sdk.start();

telegramBot.launch();

console.log("Bot started 🚀");
console.log("To stop the bot, press Ctrl+C");