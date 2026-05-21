# Claude Code Configuration

This folder contains the complete configuration system for Claude Code AI agent workflows. It follows the [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) architecture, simplified for this Next.js project.

## Directory Structure

```
.claude/
├── agents/                   # Agent definitions (delegation targets)
│   └── [agent-name].md       # Individual agent specs
│
├── adr/                      # Architecture decision records
│   └── README.md             # ADR guidance and templates
│
├── memory/                   # Workspace memory conventions
│   └── README.md             # Memory usage guidance and templates
│
├── skills/                   # Workflow skills and domain knowledge
│   └── [skill-name]/
│       └── SKILL.md          # Skill definition
│
├── rules/                    # Always-follow guidelines
│   ├── common/               # Universal principles
│   │   ├── coding-style.md
│   │   ├── testing.md
│   │   └── security.md
│   └── nextjs/               # Next.js specific patterns
│       └── nextjs-conventions.md
│
└── hooks/                    # Automation triggers (PreToolUse, PostToolUse, etc.)
    └── [hook-definition].json
```

## Root-Level Configuration

| File                | Purpose                                   | Audience                   |
| ------------------- | ----------------------------------------- | -------------------------- | --- | ---------------- | ------------------------------------- | --------------------- |
| **AGENTS.md**       | Agent delegation index + when to use each | Everyone (foundation)      |
| **CLAUDE.md**       | Project workflow + conventions            | Developers & AI agents     |
| **RULES.md**        | Top-level checklist of all rules          | Everyone (quick reference) |     | **.claude/adr/** | Architecture decision record guidance | Architects & planners |
| **.claude/memory/** | Workspace memory conventions              | Agents & session workflows |

---

## How Claude Code Uses This

### 1. **Agent Delegation**

When you ask Claude Code to plan a feature:

```
You: /plan "Add authentication"
↓
Claude reads AGENTS.md → Activates planner agent
↓
Planner agent reads project context (CLAUDE.md) + rules
↓
Returns structured task breakdown
```

### 2. **Code Review**

When you ask for code review:

```
You: /code-review
↓
Claude reads AGENTS.md → Activates code-reviewer agent
↓
Reviewer reads rules (coding-style.md, testing.md, nextjs-conventions.md)
↓
Checks your code against these rules
↓
Returns violations + improvements
```

### 3. **TDD Workflow**

When you ask for tests:

```
You: /tdd
↓
Claude reads rules/common/testing.md
↓
Enforces Red → Green → Refactor cycle
↓
Verifies 80%+ line coverage
```

### 4. **Security Audit**

When you ask for security check:

```
You: /security-scan
↓
Claude reads rules/common/security.md + rules/nextjs/
↓
Checks for: hardcoded secrets, input validation, auth, CORS, etc.
↓
Reports vulnerabilities + fixes
```

---

## Key Principles

### 1. **Rules Are Non-Negotiable**

These rules apply to ALL code in this project:

- Type safety (no `any` without justification)
- 80%+ test coverage
- No hardcoded secrets
- Server components by default
- Error handling on every async call

### 2. **Agents Are Delegation Helpers**

Agents have limited scope and tools:

- **Planner** = Architecture only (no code)
- **Implementation** = Write code following rules
- **Reviewer** = Check quality vs rules
- **Debugger** = Fix failing tests
- **Security-Reviewer** = Check security rules
- **Testing-Guide** = Verify coverage + TDD

### 3. **Workflow is Red → Green → Refactor**

```
/tdd                    Write failing test first
[Implement]             Write code to pass test
[Refactor]              Improve without changing behavior
/code-review            Check quality
/test-coverage          Verify 80%+ coverage
MERGE                   Only when all checks pass
```

---

## Usage Examples

### Starting a New Feature

```
1. /plan "Add user dashboard"
   → Get task breakdown from planner

2. Read the relevant rule:
   → rules/nextjs/nextjs-conventions.md (server vs client)

3. /tdd
   → Write test first

4. Implement code following RULES.md

5. /code-review
   → Check quality

6. /test-coverage
   → Verify 80%+ coverage
```

### Finding When to Use an Agent

```
Question: "Should this be a server or client component?"
Answer: Look in AGENTS.md
        → Ask planner (architecture) OR read rules/nextjs/
```

### Checking a Rule

```
Question: "Is this TypeScript usage correct?"
Answer: Read rules/common/coding-style.md
        OR rules/nextjs/nextjs-conventions.md
```

---

## Future Expansion

This structure is designed to grow:

- **Add agents:** Create `agents/new-agent.md` when you need a new delegation target
- **Add skills:** Create `skills/skill-name/SKILL.md` for workflow knowledge
- **Add rules:** Create `rules/common/rule-name.md` for new universal principles
- **Add hooks:** Create hooks for automation (compaction, formatting, etc.)

---

## How to Keep This Updated

### When Adding a Rule

1. Add file to `rules/common/` or `rules/nextjs/`
2. Reference it in top-level `RULES.md`
3. Agents will automatically use it

### When Defining a New Agent

1. Create `agents/agent-name.md`
2. Add to `AGENTS.md` delegation section
3. Document scope + tools

### When Adding a Skill

1. Create `skills/skill-name/SKILL.md`
2. Document workflow + best practices
3. Cross-reference from relevant rules

---

## References

- **Quick Start:** Read [AGENTS.md](../AGENTS.md) — learn when to delegate
- **Project Context:** Read [CLAUDE.md](../CLAUDE.md) — understand workflow
- **Rule Checklist:** Read [RULES.md](../RULES.md) — verify code before merge
- **Detailed Rules:** Browse `rules/common/` and `rules/nextjs/` — learn specifics
- **Source:** [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) — inspiration

---

## Notes for Future Sessions

**This configuration is persistent:**

- Claude Code will load AGENTS.md, CLAUDE.md, RULES.md automatically
- Agents will read rules before reviewing your code
- Your /tdd, /plan, /code-review commands will respect these settings
- New sessions inherit the same configuration

**To modify:**

1. Edit the relevant file (AGENTS.md, rules/\*.md, etc.)
2. Save and reload Claude Code
3. Changes apply immediately to next session
