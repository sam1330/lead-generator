import 'dotenv/config';
import { LlmAgent } from "@google/adk";
import { loadInstructions } from "../../utils/str.js";

export const rootAgent = new LlmAgent({
    name: "orchestrator",
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    description: "Orchestrate the requests from the user, triggering events and collecting responses.",
    instruction: await loadInstructions(import.meta.dirname),
});
