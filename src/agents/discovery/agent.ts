import 'dotenv/config';
import { LlmAgent, MCPToolset } from "@google/adk";
import { loadInstructions } from "../../utils/str.js";
import { fileURLToPath } from 'url';
import path from 'path';

const playwrightTools = new MCPToolset({
    type: 'StdioConnectionParams',
    serverParams: {
        command: "npx",
        args: ["-y", "@modelcontextprotocol/server-playwright"]
    }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const discoveryAgent = new LlmAgent({
    name: "discovery",
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    description: "Search for potential leads, scrape websites to get information about potential leads",
    instruction: loadInstructions(__dirname),
    tools: [playwrightTools]
});
