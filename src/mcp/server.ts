import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// import type { PayloadParams } from "../events/consumers/index.js";

// Create server instance
export const eventServer = new McpServer({
  name: "events",
  version: "1.0.0",
});

eventServer.registerTool(
  "invoke_agent",
  {
    title: "invoke_agent",
    description: "Use this function to invoke the different specialized agents",
    inputSchema: z.object({
      context: z.object({
        sessionId: z.string(),
        userId: z.string(),
      }),
      instructions: z.string(),
    }),
  },
  () => {
    return {
      content: [
        {
          type: "text",
          text: "Agent invoked successfully",
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await eventServer.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
})
