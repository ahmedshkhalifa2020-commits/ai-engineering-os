# Title

Authoritative Repository Governance Model

## Status

Accepted

## Context

The repository serves as the foundation for an AI-assisted engineering operating system. It needs a clear, authoritative governance model so that agents, contributors, and tooling all share a single source of truth for workflow expectations.

## Decision

We establish the repository itself as the authoritative governance source. All AI agents and workflow tooling will defer to the repository-level documents first, especially:

- `AGENTS.md` for agent delegation and role contracts
- `RULES.md` for top-level always-follow guidelines
- `CLAUDE.md` for project workflow and conventions
- `.claude/rules/sdlc.md` for lifecycle enforcement

This decision makes the repository documents the default governance layer rather than external or ad hoc directives.

## Alternatives Considered

- Distribute governance across only agent files and skills: rejected because it fragments contract ownership.
- Use external documentation or wiki pages: rejected because it breaks the repository-first operational model.
- Hardcode workflow rules into agent behavior without docs: rejected because it undermines transparency and auditability.

## Consequences

- Positive: agents and contributors can rely on a single, explicit source of truth.
- Positive: governance changes are tracked in the repository and versioned with code.
- Negative: repository authors must keep documentation in sync with actual workflow behavior.
- Negative: early setup requires disciplined cross-linking and review of governance documents.

## Related Documents

- `AGENTS.md`
- `RULES.md`
- `CLAUDE.md`
- `.claude/rules/sdlc.md`
- `.claude/adr/README.md`
- `.claude/memory/current-system-state.md`
