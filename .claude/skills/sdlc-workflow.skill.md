# SDLC Workflow Skill

## Purpose

This skill defines how the framework evaluates workflow state, identifies phase gates, and prevents premature handoffs.

## Workflow

1. Accept a task request.
2. Determine workflow mode (lightweight or enterprise).
3. Verify required documents for the current phase.
4. Route the task to the owning agent.
5. Block progression if required artifacts are missing.

## Gate Validation

The workflow must confirm:

- Discovery exists before Business Analysis begins
- Business rules and actors exist before System Analysis begins
- Architecture exists before Implementation begins
- TDD artifacts exist before coding begins
- Review and Security signoffs exist before Release

## Missing Analysis Detection

The skill recognizes these missing items as blockers:

- Missing discovery brief or problem statement
- Missing business rules or actor definitions
- Missing use cases with normal, alternative, and failure paths
- Missing system boundaries or data ownership
- Missing architecture diagram
- Missing test cases or failing-first TDD artifacts

## Premature Coding Prevention

The framework should require one of the following before implementation can start:

- Approved architecture
- Test-first artifacts
- A planning checklist with dependencies and checkpoints

If any of those are absent, the task is routed back to the appropriate analysis or architecture phase.

## Handoff Conditions

Each phase must export:

- Inputs consumed by the next phase
- Outputs produced by the current phase
- Blockers that must be resolved
- Validation conditions satisfied

## Validation Rules

- Do not proceed without explicit gate artifacts.
- Do not accept implementation tasks if architecture or TDD is absent.
- Do not release without review and security signoff.
- Document the phase mode and gate decisions.

## References

- `SDLC.md`
- `.claude/rules/sdlc.md`
- `.claude/agents/*.agent.md`
