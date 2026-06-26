import 'dotenv/config';
import { AgentTool, LlmAgent } from "@google/adk";
import { loadInstructions } from "../../utils/str.js";
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { discoveryAgent } from '../discovery/agent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const rootAgent = new LlmAgent({
    name: "orchestrator",
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    description: "Orchestrate the requests from the user, invoking agents and collecting responses.",
    instruction: loadInstructions(__dirname),
    tools: [new AgentTool({agent: discoveryAgent})]
});
