import 'dotenv/config';
import { GOOGLE_SEARCH, LlmAgent } from "@google/adk";
import { loadInstructions } from "../../utils/str.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// const playwrightTools = new MCPToolset({
//     type: 'StdioConnectionParams',
//     serverParams: {
//         command: "npx",
//         args: ["-y", "@playwright/mcp"]
//     }
// });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const discoveryAgent = new LlmAgent({
    name: "discovery",
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    description: "Search for potential leads, scrape websites to get information about potential leads",
    instruction: loadInstructions(__dirname),
    tools: [GOOGLE_SEARCH]
});
