import 'dotenv/config';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

// Initialize the OpenTelemetry SDK to grab ADK's native hooks
export const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(), // Automatically pulls ENDPOINT and HEADERS from your .env
});

