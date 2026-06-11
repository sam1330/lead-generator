# AI Lead Generator

A multi-agent AI system that autonomously discovers, qualifies, and drafts outreach for leads. Controlled entirely through a Telegram bot — you describe who you're looking for, and the system handles the rest.

Built as a hands-on project to explore agent orchestration, RAG pipelines, and LLM observability in a real-world workflow.

---

## How It Works

You send a command to the Telegram bot (e.g. _"Find SaaS founders in the fintech space in LATAM"_). The **Orchestrator agent** parses your intent and coordinates a pipeline of specialized agents:

```
You (Telegram)
     │
     ▼
┌─────────────────────┐
│  Orchestrator Agent │  ← Understands intent, routes tasks, returns results
└──────────┬──────────┘
           │
     ┌─────┼─────┐
     ▼     ▼     ▼
┌────────┐ ┌───────────────┐ ┌──────────────┐
│Discover│ │  Qualification│ │   Outreach   │
│ Agent  │ │     Agent     │ │    Agent     │
└────┬───┘ └───────┬───────┘ └──────┬───────┘
     │             │                │
     ▼             ▼                ▼
  Scrapes      Scores &         Drafts first
  web + search  ranks leads     contact message
     │
     ▼
PostgreSQL + pgvector
(leads + embeddings for RAG)
```

### Agents

| Agent | Responsibility |
|---|---|
| **Orchestrator** | Receives Telegram commands, manages the workflow, returns results to operator |
| **Discovery** | Searches Google and scrapes websites via Puppeteer/Playwright MCP to find leads matching the ICP |
| **Qualification** | Scores and ranks leads against criteria using RAG over the leads database |
| **Outreach** | Generates a personalized first-contact message for each qualified lead |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript (Node.js 22) |
| AI SDK | Google Gemini via `@google/genai` |
| Agent framework | Google Gen AI SDK — Harnesses pattern |
| Operator interface | Telegram bot via Telegraf |
| Web server | Express.js |
| Database | PostgreSQL 17 + pgvector |
| ORM | Drizzle ORM |
| RAG | pgvector similarity search |
| MCP tools | Puppeteer/Playwright, Google Search |
| LLM observability | Langfuse + OpenTelemetry |
| Error monitoring | Sentry |
| Frontend | Next.js _(planned)_ |
| Containers | Docker + Docker Compose |
| Package manager | pnpm |

---

## Project Structure

```
lead-generator/
├── src/
│   ├── index.ts          # Express app + Telegram bot entrypoint
│   ├── db/
│   │   ├── index.ts      # Drizzle client
│   │   └── schema.ts     # Database schema
│   └── utils/
│       └── str.ts
├── docker/
│   └── init.sql          # Enables pgvector extension on first boot
├── drizzle.config.ts
├── Dockerfile            # Multi-stage production build
├── docker-compose.yml    # App + PostgreSQL/pgvector
└── .env.example
```

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [pnpm](https://pnpm.io/installation) (for local development)
- A Telegram bot token — create one via [@BotFather](https://t.me/botfather)
- A Google AI API key — get one at [aistudio.google.com](https://aistudio.google.com)

### 1. Clone and configure

```bash
git clone https://github.com/your-username/lead-generator.git
cd lead-generator
cp .env.example .env
```

Fill in the required values in `.env`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
GOOGLE_AI_API_KEY=your_gemini_api_key_here
POSTGRES_PASSWORD=a_strong_password
```

### 2. Run with Docker

```bash
docker compose up --build
```

This starts the app and a PostgreSQL + pgvector instance. The `vector` extension is enabled automatically on first boot.

### 3. Run database migrations

```bash
pnpm db:migrate
```

### 4. Local development (without Docker)

```bash
pnpm install
pnpm dev          # tsx watch — hot reload, no compile step needed
```

Make sure your `.env` has `DATABASE_URL` pointing to a local or remote Postgres instance with pgvector enabled.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run the compiled app |
| `pnpm dev` | Development server with hot reload |
| `pnpm db:generate` | Generate a new migration from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:push` | Push schema directly (no migration file, dev only) |
| `pnpm db:studio` | Open Drizzle Studio to browse the database |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Yes | Bot token from @BotFather |
| `GOOGLE_AI_API_KEY` | Yes | Gemini API key |
| `DATABASE_URL` | Yes (local dev) | Full postgres connection string |
| `POSTGRES_USER` | Docker only | Defaults to `postgres` |
| `POSTGRES_PASSWORD` | Docker only | Postgres password |
| `POSTGRES_DB` | Docker only | Defaults to `lead_generator` |
| `TELEGRAM_WEBHOOK_URL` | No | HTTPS URL for webhook mode; omit to use polling |
| `LANGFUSE_PUBLIC_KEY` | No | Langfuse project public key |
| `LANGFUSE_SECRET_KEY` | No | Langfuse project secret key |
| `LANGFUSE_HOST` | No | Defaults to `https://cloud.langfuse.com` |

---

## Observability

- **Langfuse** — traces every LLM call: prompt, response, token usage, latency. Useful for comparing model versions and debugging agent decisions.
- **Sentry** — captures runtime errors and exceptions across the application.
- Both are wired through **OpenTelemetry** so the instrumentation is provider-agnostic.

---

## Roadmap

- [x] Project scaffolding, database, Telegram bot skeleton
- [x] Docker + pgvector setup
- [ ] Orchestrator agent with Harness pattern
- [ ] Discovery agent (Google Search MCP + Puppeteer/Playwright MCP)
- [ ] Leads schema with vector embeddings
- [ ] RAG pipeline for qualification context
- [ ] Qualification agent with scoring
- [ ] Outreach agent with personalized message generation
- [ ] Langfuse + Sentry integration
- [ ] Next.js dashboard to browse and manage leads

---

## Why I Built This

I wanted to go beyond toy demos and build a system where agents actually have to coordinate, use real tools, and produce useful output. Lead generation is a concrete domain with a clear success metric — lead quality — which makes it a good testbed for evaluating RAG retrieval, agent reasoning, and observability without ambiguity.
