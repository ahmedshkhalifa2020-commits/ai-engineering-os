# Project Agents

**Important:** This follows the [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) architecture. See `SDLC.md` and `CLAUDE.md` for workflow context.

**STATUS:** Agent roles are defined here and detailed agent specifications now exist in `.claude/agents/`.

These agent definitions are the operational contract for SDLC ownership, handoffs, and enforcement.

---

## Global Agent Constraints

Each agent MUST:

- Follow `RULES.md` and `.claude/rules/sdlc.md` before taking any action
- Refuse to proceed if required SDLC artifacts are missing
- Delegate the task if it is outside its scope
- Ensure that execution produces actual code changes only when the phase is correct
- Prevent premature implementation by validating gate conditions

---

## Core Agents

### planner

**Plan feature execution** and enforce phase ordering.

- **Use when:** Starting a new feature, managing SDLC mode, or validating phase progression
- **Scope:** Discovery and Planning
- **Tools:** Read, Grep, Glob
- **NOT:** Writing production code or bypassing analysis phases

### business-analyst

**Capture business requirements and domain rules.**

- **Use when:** Business analysis is required or when the task is under-specified
- **Scope:** Business Analysis
- **Tools:** Read, Research, Document
- **NOT:** Designing low-level architecture or writing code

### architect

**Design the system architecture and boundaries.**

- **Use when:** System Analysis or Architecture is needed
- **Scope:** System Analysis and Architecture
- **Tools:** Read, Modeling, Document
- **NOT:** Writing production code or skipping architecture approval

### nextjs-implementation

**Write production code under approved architecture.**

- **Use when:** Implementation is ready and gates are satisfied
- **Scope:** Implementation
- **Tools:** Read, Edit, Bash
- **NOT:** Starting without architecture, TDD artifacts, or plan approval

### testing-guide

**Drive test-first delivery and coverage.**

- **Use when:** Creating tests or validating coverage
- **Scope:** TDD and test quality
- **Tools:** Read, Grep, Bash
- **NOT:** Implementing business logic or overriding review gates

### code-reviewer

**Validate implementation quality and compliance.**

- **Use when:** Code is ready for review
- **Scope:** Review
- **Tools:** Read, Grep
- **NOT:** Writing new feature code or approving insecure changes

### security-reviewer

**Audit security and release controls.**

- **Use when:** Security validation is required
- **Scope:** Security Review
- **Tools:** Read, Grep
- **NOT:** Skipping security review for enterprise mode releases

---

## When to Delegate

| Situation                         | Agent                 | Pattern                                     |
| --------------------------------- | --------------------- | ------------------------------------------- |
| "How should I structure auth?"    | planner               | Discovery/architecture planning             |
| "I need business requirements"    | business-analyst      | Define actors, rules, and use cases         |
| "How should the system be built?" | architect             | System analysis and architecture design     |
| "Implement the user signup form"  | nextjs-implementation | Feature request → write code after approval |
| "Are tests sufficient?"           | testing-guide         | TDD and coverage validation                 |
| "Review my login component"       | code-reviewer         | Code written → quality check                |
| "Is this auth secure?"            | security-reviewer     | Security validation before release          |

---

## SDLC Handoff Pattern

```
User request or /plan command
│
├─ planner
│  → Establishes mode, discovery, and plan
│
├─ business-analyst
│  → Produces business goals, actors, rules, and edge cases
│
├─ architect
│  → Designs system boundaries and architecture
│
├─ testing-guide
│  → Creates failing tests and validates coverage
│
├─ nextjs-implementation
│  → Writes code after architecture and TDD approval
│
├─ code-reviewer
│  → Reviews quality and compliance
│
└─ security-reviewer
   → Validates security and enables release
```

**Rule:** Do not skip to implementation without completing prior SDLC phases. If architecture or required tests are absent, route back to the owning agent.

---

## References

- `SDLC.md`
- `.claude/rules/sdlc.md`
- `.claude/agents/*.agent.md`
- `.claude/skills/*.skill.md`

---

## Reference: Next.js Version Warning

**IMPORTANT:** This is NOT the standard Next.js documentation.

This version may have breaking changes in APIs, conventions, and file structure that differ from your training data. Before writing any code:

- Check the relevant guide in `node_modules/next/dist/docs/`
- Read deprecation notices in error messages
- Verify patterns in `.claude/rules/nextjs/`
