# AI Engineering OS Foundation

A reusable Next.js template with embedded AI-assisted engineering workflows.

This is **not a product application** — it is a foundation for building AI-assisted projects. It contains:

- Multi-agent workflow system
- Documentation-driven governance
- Rule-based quality gates
- TDD-first development philosophy
- Security and code review workflows

## What Is This?

This repository is a **base template** for projects using AI-assisted development. It includes:

- `AGENTS.md` — Agent delegation and role definitions
- `RULES.md` — Engineering standards and enforcement rules
- `CLAUDE.md` — Project workflow and conventions
- `.claude/` — AI operational configuration
- `.claude/adr/` — Architecture decision records and design rationale
- `.claude/memory/` — Memory and workspace knowledge conventions
- `.claude/rules/` — Governance rules by domain
- `.claude/agents/` — Agent capability specifications
- `.claude/skills/` — Reusable workflow skills

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run quality checks:

```bash
npm run lint      # Run linter
npm run format    # Auto-format code
npm run test      # Run tests
npm run build     # Production build
```

## Project Structure

```
src/app/              # Next.js app directory
.claude/              # AI workflow configuration
├── adr/              # Architecture decision records
├── agents/           # Agent role specifications
├── memory/           # Workspace memory conventions
├── rules/            # Governance and standards
└── skills/           # Reusable workflow docs
AGENTS.md             # Agent delegation guide
RULES.md              # Project rules
CLAUDE.md             # Workflow and conventions
```

## Intended Workflow

This repository implements a rule-driven, multi-agent workflow:

1. `/plan` — Planner designs architecture
2. `/tdd` — Testing guide enforces test-first
3. Implementation — Write code
4. `/code-review` — Code reviewer checks quality
5. `/test-coverage` — Verify coverage threshold
6. `/security-scan` — Security reviewer audits
7. Merge when all checks pass

See `CLAUDE.md` for detailed workflow conventions.

## Core Principles

- **Rule-first**: Agents read and obey rules before acting
- **Specialized roles**: Each agent has a bounded scope
- **Stage gating**: Planning → Testing → Implementation → Review → Merge
- **TDD native**: Tests come first
- **Documentation-as-contract**: Workflows are defined in docs

## Learn More

- Read `AGENTS.md` for agent roles and delegation
- Read `RULES.md` for project standards
- Read `CLAUDE.md` for workflow specifics
- Browse `.claude/rules/` for domain-specific guidance

## This Is a Template

Clone this repository to start new AI-assisted projects. Customize:

- `.claude/agents/` to define your team's specialist roles
- `.claude/rules/` to add domain-specific guidance
- `CLAUDE.md` to document your project's conventions
