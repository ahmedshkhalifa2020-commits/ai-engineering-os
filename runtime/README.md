# Runtime Coordination Layer

## Purpose

This folder contains the execution foundation for the AI Engineering OS. It operationalizes the governance rules defined in `AGENTS.md`, `RULES.md`, and `SDLC.md` by providing:

- workflow state tracking
- phase transition validation
- agent coordination and dispatch
- artifact and approval gating
- memory synchronization
- CI/CD checkpoint integration

## Status

**MVP Scaffolding** — Initial structure only. Enforcement logic will be added in subsequent phases.

This is a template layer intended to be cloned and customized for future AI-assisted projects.

## Structure

- `workflow/` — Phase definitions and state model
- `enforcement/` — Gate and validation rules
- `agent-coordination/` — Agent dispatch and handoff logic
- `memory-sync/` — Memory artifact synchronization rules
- `ci-integration/` — CI checkpoint and merge gate definitions
- `state-persistence/` — State storage and tracking mechanisms

## Quick Start

1. Read `workflow/phases.md` to understand the phase model
2. Review `enforcement/gates.md` for validation rules
3. Check `agent-coordination/dispatcher.md` for agent assignment logic
4. See `.claude/runtime-state.json` for current workflow state

## Not Included Yet

- Autonomous agent execution
- Live state synchronization
- Event streaming
- Real-time monitoring
- Workflow visualization

These will be added in future phases as the runtime matures.
