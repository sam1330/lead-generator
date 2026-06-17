import 'dotenv/config';
import { LangfuseSpanProcessor } from '@langfuse/otel';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

// 1. Initialize Langfuse's dedicated OTel Span Processor
// It automatically reads LANGFUSE_PUBLIC_KEY, LANGFUSE_SECRET_KEY, and LANGFUSE_BASE_URL from your .env
const langfuseProcessor = new LangfuseSpanProcessor();

// 2. Setup the global Node trace provider
const provider = new NodeTracerProvider({
  spanProcessors: [langfuseProcessor],
});

// 3. Register it globally. 
// This hooks into all standard OTel instrumentation libraries automatically, including ADK.
provider.register();

console.log("🛡️ Global Langfuse automatic tracer registered.");