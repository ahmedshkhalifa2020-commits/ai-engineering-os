# Memory Consistency Checks

## Purpose

Validates that `.claude/memory/` artifacts are consistent with runtime state in `.claude/runtime-state.json`.

## Consistency Rules

### Rule 1: Current Phase Consistency

- **Check**: memory/current-system-state.md current phase matches runtime state currentPhase
- **Failure**: Log stale memory warning
- **Resolution**: Update memory to match runtime state

### Rule 2: Completion Status Consistency

- **Check**: implementation-status.md completed items match phases in runtime history
- **Failure**: Log inconsistency
- **Resolution**: Reconcile with runtime history

### Rule 3: Active Module Consistency

- **Check**: active-modules.md lists match components referenced in runtime state
- **Failure**: Log missing/stale module
- **Resolution**: Update module list

### Rule 4: Known Risks Consistency

- **Check**: known-risks.md risks align with active blockers in runtime state
- **Failure**: Log outdated risk or missing blocker
- **Resolution**: Update risks from blockers

### Rule 5: Pending Decision Consistency

- **Check**: pending-decisions.md items are not already resolved in runtime
- **Failure**: Log stale pending item
- **Resolution**: Remove or mark as resolved

## Consistency Check Invocation

Consistency checks run:

- On phase transition
- On request (manual trigger)
- Periodically (e.g., daily)

## Inconsistency Report

When inconsistencies detected, generate report:

```
Memory Consistency Check: 2026-05-21T14:30:00Z
Runtime State: phase=tdd
Memory State: phase=planning
→ STALE: memory/current-system-state.md needs update

Runtime Blockers: [missing-tdd-artifacts]
Memory Risks: [missing-automation, no-enforcement-engine]
→ STALE: memory/known-risks.md has outdated risks

Status: 1 inconsistency detected. Sync recommended.
```

## Resolution Options

When inconsistency detected:

1. Auto-sync memory to match runtime (preferred)
2. Alert user for manual review
3. Block workflow until resolved (strict mode)
4. Continue with warning (lenient mode)
