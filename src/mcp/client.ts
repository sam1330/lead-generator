import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { Tool } from "@modelcontextprotocol/sdk/types";
import { fileURLToPath } from 'url';
import path from 'path';

export class MCPClient {
  private mcp: Client;
  private transport: StdioClientTransport | null = null;
  private tools: Tool[] = [];

  constructor() {
    this.mcp = new Client({
      name: "mcp-client-cli",
      version: "1.0.0",
    });
  }

  async connectToServer() {
    try {
      const command = process.execPath;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const serverPath = path.join(__dirname, 'server.js');
      console.error(__dirname, "Path");

      this.transport = new StdioClientTransport({
        command,
        args: [serverPath || ""],
      });

      await this.mcp.connect(this.transport);

      const toolsResult = await this.mcp.listTools();

      this.tools = toolsResult.tools.map((tool) => {
        return {
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        };
      });
      console.log(
        "Connected to server with tools:",
        this.tools.map(({ name }) => name),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async cleanup() {
    this.mcp.close();
  }
}

const main = async () => {
  const client = new MCPClient();

  try {
    await client.connectToServer();
  } catch (error) {
    console.error(error);
    await client.cleanup();
    process.exit(1);
  } finally {
    await client.cleanup();
    process.exit(0);
  }
};

main();
