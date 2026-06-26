import { FunctionTool } from "@google/adk";
import { DiscoveryAgentEvent } from "../events/producers/index.js";
import z from "zod";

export const invokeOrchestratorAgent = new FunctionTool({
  name: "invokeOrchestratorAgent",
  description: "Invoke the orchestrator agent with the result of the search",
  parameters: z.object({
    instructions: z
      .string()
      .describe(
        "This field should have all the details of the leads researched",
      ),
  }),
  execute: (data) => {
    try {
      const discoveryBus = new DiscoveryAgentEvent();

      discoveryBus.emitSearchCompleted(data);

      return {
        status: "success",
        report:
          "Orchestrator agent invoked successfully, you can finish your work",
      };
    } catch (error) {
      console.log(error);
      return {
        status: "error",
        error_message: `There was an error invoking the discovery agent - ${error}`,
      };
    }
  },
});
