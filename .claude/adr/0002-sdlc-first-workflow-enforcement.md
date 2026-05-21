# Title

SDLC-First Workflow Enforcement

## Status

Accepted

## Context

The repository defines an enterprise-grade AI Engineering OS workflow. A strong gate-based process is required to prevent premature coding and ensure that analysis, architecture, and testing artifacts exist before implementation.

## Decision

We adopt an SDLC-first enforcement model where the following phases are mandatory for enterprise-mode work:

- Discovery
- Business Analysis
- System Analysis
- Architecture
- Planning
- TDD
- Implementation
- Review
- Security
- Release

Lightweight-mode work may skip System Analysis and Architecture, but still requires the other phases and test-first discipline.

## Alternatives Considered

- Allow ad hoc implementation with later review: rejected because it undermines traceability.
- Use only TDD without an SDLC model: rejected because it fails to enforce architecture and boundary definition.
- Implement a purely automated workflow runtime first: rejected because the current repository needs explicit governance documentation before runtime automation.

## Consequences

- Positive: workflow progression is explicit and gated.
- Positive: agents can route tasks to the correct owner and refuse premature work.
- Negative: contributors must produce and validate artifacts before writing code.
- Negative: initial setup is heavier, requiring documentation and gate definitions.

## Related Documents

- `SDLC.md`
- `.claude/rules/sdlc.md`
- `AGENTS.md`
- `.claude/skills/sdlc-workflow.skill.md`
- `.claude/memory/roadmap.md`
