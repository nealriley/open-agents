# Deep Agent - AI SDK Coding Agent

## Commands
- `bun run dev` - Run CLI agent
- `bun run typecheck` - Type check
- `bun test` - Run all tests
- `bun test path/to/file.test.ts` - Run single test

## Architecture
- `src/agent/` - Core agent logic with ToolLoopAgent from AI SDK
- `src/agent/tools/` - Agent tools (context, memory, planning, subagent)
- `src/cli/` - CLI entry point
- `src/tui/` - Terminal UI with Ink/React

## Code Style
- Use Bun exclusively (not Node, npm, pnpm, vite)
- Use `bun:test` for testing with `import { test, expect } from "bun:test"`
- Prefer Bun APIs: `Bun.file`, `Bun.serve`, `bun:sqlite`
- Bun auto-loads .env - no dotenv needed
- Use AI SDK patterns: `ToolLoopAgent`, `gateway()`, tool definitions with Zod schemas
- TypeScript with strict types, use Zod for runtime validation
