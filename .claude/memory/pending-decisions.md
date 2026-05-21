# Pending Decisions

## Orchestration Engine Design

- Need to decide whether to build a repository-native workflow runtime or adopt an existing orchestration engine.
- This decision will affect CI, automation hooks, and agent execution semantics.

## Memory Synchronization Strategy

- Need to decide how `.claude/memory/` state is updated and kept in sync with agent actions.
- Determine whether to use file-based state only or layered in-memory/session state.

## CI Enforcement

- Need to decide how to codify SDLC gate rules into CI checks.
- Determine whether CI should validate docs, agent scope, or both.

## Workflow Runtime Architecture

- Need to decide the architecture for executing workflows and handoffs.
- Options include rule-based task routing, event-driven state machines, or agent orchestration layers.

## Related Documents

- `.claude/memory/roadmap.md`
- `.claude/memory/known-risks.md`
- `.claude/adr/0002-sdlc-first-workflow-enforcement.md`
