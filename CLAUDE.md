# Project Context & Workflow

This document provides project-specific guidance that augments the agent definitions in [AGENTS.md](./AGENTS.md).

## Current Status

This repository is an **AI Engineering OS foundation** under development.

- ✅ Implemented: build, lint, format scripts
- ✅ Implemented: TypeScript strict mode, Tailwind CSS setup
- ✅ Implemented: Governance rules documentation
- ✅ Implemented: enterprise SDLC workflow and governance artifacts
- 🔄 In Progress: Agent capability specifications
- 🔄 In Progress: Workflow automation and CI/CD
- 📋 Planned: Command orchestration (`/plan`, `/tdd`, etc.)

## Quick Workflow Summary

The intended workflow is now governed by the enterprise SDLC model in `SDLC.md`.

### Start a new feature

```
/plan "Add user authentication"     → Planner creates discovery and implementation plan
/tdd                                  → Testing-guide defines failing tests first
[nextjs-implementation]               → Write code only after architecture and TDD approvals
/code-review                          → Code-reviewer validates quality
/security-review                       → Security-reviewer validates security for enterprise mode
/release                               → Deploy after all gates pass
```

### Current workflow

For now, follow this manual process:

1. Read `SDLC.md` and `.claude/rules/sdlc.md`
2. Confirm whether the task is `lightweight` or `enterprise`
3. Complete Discovery and Business Analysis before System Analysis or Architecture
4. Write tests first under the TDD skill
5. Write code only after architecture and TDD artifacts are approved
6. Run `npm run lint` and `npm test`
7. Review and security signoff before release

---

## Project Structure

```
app-template/
├── .claude/                        # Claude Code configuration
│   ├── agents/                     # Agent role specifications (in progress)
│   ├── adr/                        # Architecture decision records
│   ├── memory/                     # Workspace memory conventions
│   ├── skills/                     # Skill workflows (in progress)
│   ├── rules/
│   │   ├── common/                 # Universal principles
│   │   └── nextjs/                 # Next.js-specific rules
│   └── hooks/                      # Automation hooks (future)
│
├── src/
│   ├── app/                        # Next.js 15+ app directory
│   │   ├── page.tsx                # Root page
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Global styles
│   └── __tests__/                  # Test files
│
├── AGENTS.md                       # Agent definitions & delegation guide
├── CLAUDE.md                       # This file - project workflow
├── RULES.md                        # High-level guidelines
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

---

## Key Conventions

### Component Structure

All React components follow this pattern:

```tsx
// src/components/ComponentName.tsx
"use client"; // if interactive

import React from "react";

interface ComponentProps {
  // Props here
}

export const ComponentName: React.FC<ComponentProps> = (props) => {
  return <div>{/* Implementation */}</div>;
};
```

### TypeScript Strictness

- `strict: true` in tsconfig.json
- No `any` types without explicit `// @ts-ignore` comment
- All public APIs must be typed
- Use discriminated unions for complex types

### Testing

- Test framework: Vitest (or Jest)
- Coverage requirement: **80% line coverage minimum**
- Approach: **TDD (write test first)**
- Naming: `*.test.ts` files colocated with source

### Database (if applicable)

- Migrations: Prisma or Drizzle ORM
- Schema changes: Create migration first, run in dev
- Connection: Environment variables only, never hardcoded

### Git Workflow

- Feature branches: `feat/description`
- Bug fixes: `fix/description`
- Commits: Conventional commits format
- PRs: Require 1 approval + all checks passing

---

## When to Delegate to Agents

| Task                        | Agent                 | Command                   |
| --------------------------- | --------------------- | ------------------------- |
| Design feature architecture | planner               | `/plan "description"`     |
| Implement feature code      | nextjs-implementation | Create files, then review |
| Review code before merge    | code-reviewer         | `/code-review`            |
| Fix failing tests/builds    | debugger              | Provide error message     |
| Test coverage verification  | testing-guide         | `/test-coverage`          |
| Security audit (auth/data)  | security-reviewer     | Manual delegation         |

---

## Performance & Context Management

### Recommended Settings

If using Claude Code directly, add to `~/.claude/settings.json`:

```json
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50"
  }
}
```

### When to Compact

- After research is complete (before implementation)
- After a major feature is done (before starting next)
- After a debugging session resolves the issue

---

## Documentation References

- **Next.js Docs:** Check `node_modules/next/dist/docs/` for version-specific guide
- **TypeScript:** [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Testing:** Vitest docs + Examples in `.claude/skills/tdd-workflow/`
- **Architecture:** See RULES.md and `.claude/adr/` for decision documentation
- **Memory:** Refer to `.claude/memory/` for workspace memory conventions

---

## Questions About This Setup?

This project follows [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) patterns, simplified for a Next.js application. Key files:

- `AGENTS.md` — Who to delegate to and when
- `RULES.md` — Always-follow guidelines
- `.claude/rules/` — Rule details by domain
- This file — Workflow and conventions

@AGENTS.md
