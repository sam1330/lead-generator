import { FunctionTool } from "@google/adk";
import { OrchestratorAgentEvent } from "../events/producers/index.js";
import z from "zod";

export const invokeDiscoveryAgent = new FunctionTool({
  name: "invokeDiscoveryAgent",
  description: "Invoke the discovery agent to execute specialized tasks",
  parameters: z.object({
    instructions: z
      .string()
      .describe(
        "The instructions given to the discovery agent to execute the task",
      ),
  }),
  execute: (data) => {
    try {
      const orchestratorBus = new OrchestratorAgentEvent();

      orchestratorBus.emitInvokeDiscoveryAgent(data);

      return {
        status: "success",
        report:
          "Discovery agent invoked successfully, you will get notified when the agent stops processing.",
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
