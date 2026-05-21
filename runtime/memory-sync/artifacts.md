# Memory Artifact Ownership

## Purpose

Defines which component owns each memory artifact and how it is maintained.

## Memory Artifact Ownership

| Artifact                 | Owner                  | Updated By             | Update Trigger                        |
| ------------------------ | ---------------------- | ---------------------- | ------------------------------------- |
| current-system-state.md  | Workflow State Manager | Memory Sync Controller | Phase change, blocker event           |
| active-modules.md        | Runtime Manager        | Manual/Sync            | Milestone completion                  |
| roadmap.md               | Planning Agent         | Memory Sync Controller | Phase completion, wave transition     |
| known-risks.md           | Runtime Manager        | Memory Sync Controller | Blocker detection, resolution         |
| pending-decisions.md     | Planning Agent         | Memory Sync Controller | Decision needed, decision made        |
| implementation-status.md | Runtime Manager        | Memory Sync Controller | Artifact completion, phase completion |

## Update Responsibilities

### Workflow State Manager

Owns and updates:

- Current phase and active agent
- Artifact status registry
- Approval flags

Responsible for:

- Reading runtime state
- Writing to memory/current-system-state.md
- Maintaining audit trail

### Memory Sync Controller

Owns and executes:

- Sync operations
- Consistency validation
- Stale state detection

Responsible for:

- Triggering syncs on events
- Validating memory consistency
- Generating inconsistency reports

### Agents

Provide content for:

- Completion status
- Artifact details
- Decision outcomes

Responsible for:

- Completing assigned work
- Requesting approval
- Documenting decisions

## Artifact Lifecycle

1. **Created**: When workflow enters phase
2. **Updated**: When phase progresses or artifact changes
3. **Validated**: At end of phase by enforcement engine
4. **Synced**: To memory on phase completion
5. **Archived**: Historical state preserved in runtime-logs

## Artifact Retention

All memory artifacts are kept as version-controlled files in `.claude/memory/`.
Historical state snapshots are retained in `.claude/runtime-logs/` for audit purposes.
