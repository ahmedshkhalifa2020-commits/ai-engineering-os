# Project Agents

**Important:** This follows the [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) architecture. See [CLAUDE.md](./CLAUDE.md) for workflow context.

---

## Global Agent Constraints

Each agent MUST:

- Follow RULES.md strictly before taking any action
- Refuse to proceed if rules are violated
- Delegate the task if it is outside its scope
- Ensure that execution produces actual code changes (not just explanations)

---

## Core Agents

### planner

**Plan feature implementation** with clear steps, milestones, and acceptance criteria.

- **Use when:** Starting a new feature or major refactor
- **Scope:** Read codebase, suggest architecture, create task breakdown
- **Tools:** Read, Grep, Glob
- **NOT:** Writing production code (delegate to nextjs-implementation)

### nextjs-implementation

**Write production Next.js code** following the project's patterns and standards.

- **Use when:** Implementing features, components, API routes, or database schemas
- **Scope:** Create/edit files, follow component conventions, use project dependencies
- **Tools:** Read, Edit, Bash (via npm/docker)
- **NOT:** Architecture (ask planner) or debugging (ask debugger)

### code-reviewer

**Review code** for quality, TypeScript correctness, and adherence to standards.

- **Use when:** Code is written and needs review before merge
- **Scope:** Read code, identify issues, suggest improvements, check patterns
- **Tools:** Read, Grep
- **NOT:** Writing code (ask implementation) or fixing bugs (ask debugger)

### debugger

**Fix bugs and resolve runtime/build errors** with systematic investigation.

- **Use when:** Test failures, runtime errors, or build errors occur
- **Scope:** Read error output, trace execution, read test files, propose fixes
- **Tools:** Read, Grep, Bash (run tests)
- **NOT:** Architecture (ask planner) or code review (ask code-reviewer)

### security-reviewer

**Audit code** for vulnerabilities, injection risks, and secure patterns.

- **Use when:** Code handles auth, secrets, user input, or database queries
- **Scope:** Read code, identify security gaps, suggest secure patterns
- **Tools:** Read, Grep
- **NOT:** Architecture (ask planner) or general code review (ask code-reviewer)

### testing-guide

**Ensure test coverage and TDD practices** are followed.

- **Use when:** Writing tests or verifying coverage before merge
- **Scope:** Read tests, suggest test cases, verify 80%+ line coverage
- **Tools:** Read, Grep, Bash (run tests)
- **NOT:** Implementation (ask nextjs-implementation)

---

## When to Delegate

| Situation                        | Agent                 | Pattern                                   |
| -------------------------------- | --------------------- | ----------------------------------------- |
| "How should I structure auth?"   | planner               | Big architectural Q → task breakdown      |
| "Implement the user signup form" | nextjs-implementation | Feature request → write code              |
| "Review my login component"      | code-reviewer         | Code written → quality check              |
| "Why are tests failing?"         | debugger              | Error message → root cause → fix          |
| "Is this auth secure?"           | security-reviewer     | Code handling secrets → security analysis |
| "Did I test everything?"         | testing-guide         | Pre-merge → coverage check                |

---

## Delegation Pattern

```
User request or /plan command
│
├─ Planner (if task is undefined)
│  → Creates implementation plan
│  → Breaks into subtasks
│
├─ Implementation (if subtask is ready)
│  → Writes code
│  → Updates tests
│
├─ Debugger (if tests fail)
│  → Fixes broken tests
│  → Confirms all pass
│
├─ Code-Reviewer (before merge)
│  → Checks quality
│  → Suggests improvements
│
├─ Testing-Guide (if coverage low)
│  → Adds missing tests
│  → Verifies 80%+ coverage
│
└─ Security-Reviewer (if auth/secrets/input)
   → Checks for vulnerabilities
   → Confirms secure patterns
```

**Rule:** Don't skip to implementation without planning. Cascade through agents in order when multiple are needed.

---

## Reference: Next.js Version Warning

**IMPORTANT:** This is NOT the standard Next.js documentation.

This version may have breaking changes in APIs, conventions, and file structure that differ from your training data. Before writing any code:

- Check the relevant guide in `node_modules/next/dist/docs/`
- Read deprecation notices in error messages
- Verify patterns in `.claude/rules/nextjs/`
