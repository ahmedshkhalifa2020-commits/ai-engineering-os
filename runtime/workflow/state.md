# Workflow State Model

## Purpose

Defines the structure and properties of workflow state tracked during SDLC execution.

## State Structure

The canonical workflow state is stored in `.claude/runtime-state.json`.

### Core Properties

- **currentPhase**: Current SDLC phase (discovery, business-analysis, system-analysis, architecture, planning, tdd, implementation, review, security, release)
- **mode**: Execution mode (lightweight, enterprise)
- **artifacts**: Status of required artifacts for each phase
- **approvals**: Gate approvals (discovery, business-analysis, architecture, planning, tdd, implementation, review, security)
- **activeAgent**: Which agent should execute next
- **blockers**: List of reasons why progression is blocked
- **wave**: Logical grouping (MVP, phase-1, etc.)
- **history**: Audit trail of state transitions

## State Transitions

State changes occur when:

- A phase is marked complete
- An artifact is validated
- An approval is granted
- A blocker is resolved
- An agent completes a handoff

All transitions must be validated against enforcement rules before being applied.

## State Persistence

See `state-persistence/state-store.md` for storage and retrieval mechanisms.
