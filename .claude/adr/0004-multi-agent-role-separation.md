# Title

Multi-Agent Role Separation

## Status

Accepted

## Context

The repository defines multiple specialist agents for governance, planning, testing, implementation, review, and security. A clear separation of roles is needed to prevent overlap, confusion, and agent drift.

## Decision

We formalize the following agent role boundaries:

- `planner`: discovery and planning
- `business-analyst`: business analysis
- `architect`: system analysis and architecture
- `testing-guide`: TDD and test strategy
- `nextjs-implementation`: code implementation
- `code-reviewer`: review and quality validation
- `security-reviewer`: security validation

Each role must refuse work outside its scope and defer to the appropriate agent when a task belongs to another phase.

## Alternatives Considered

- Use a single generalist agent: rejected because it reduces accountability and weakens phase gate enforcement.
- Allow overlapping responsibilities: rejected because it increases risk of work being done without proper handoff.
- Define fewer roles: rejected because the current workflow benefits from specialized phase ownership.

## Consequences

- Positive: accountability and handoffs are explicit.
- Positive: each phase can be audited separately.
- Negative: small repositories may feel overhead from many roles.
- Negative: coordination is required to keep handoff rules consistent.

## Related Documents

- `AGENTS.md`
- `.claude/rules/sdlc.md`
- `.claude/agents/planner.agent.md`
- `.claude/agents/nextjs-implementation.agent.md`
- `.claude/memory/implementation-status.md`
