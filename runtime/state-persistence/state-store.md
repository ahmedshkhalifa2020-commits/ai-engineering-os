# State Store

## Purpose

Defines where and how runtime state is persisted and retrieved.

## Storage Location

Canonical runtime state is stored in: `.claude/runtime-state.json`

This file is:

- Version-controlled in Git
- Human-readable JSON
- Updated on state changes
- Treated as operational record

## State File Format

```json
{
  "workflow": {
    "currentPhase": "discovery",
    "mode": "lightweight",
    "artifacts": {},
    "approvals": {},
    "activeAgent": null,
    "blockers": [],
    "wave": null,
    "history": []
  },
  "metadata": {
    "createdAt": "2026-05-21T00:00:00Z",
    "lastUpdatedAt": "2026-05-21T00:00:00Z",
    "lastUpdatedBy": "bootstrap",
    "version": "1.0"
  }
}
```

## State Persistence Operations

### Read State

- **Operation**: Load runtime state from `.claude/runtime-state.json`
- **Frequency**: On each workflow decision
- **Error handling**: If file not found, initialize with defaults

### Write State

- **Operation**: Update `.claude/runtime-state.json` with new state
- **Frequency**: After validation, on state change
- **Error handling**: Log error, retry, alert if persistent

### Archive State

- **Operation**: Copy state snapshot to `.claude/runtime-logs/`
- **Frequency**: On phase completion, release, blocker resolution
- **Format**: `state-{phase}-{timestamp}.json`

## State Initialization

New projects initialize with:

```json
{
  "workflow": {
    "currentPhase": "discovery",
    "mode": "lightweight",
    "artifacts": {
      "discovery": { "status": "pending" },
      "business-analysis": { "status": "pending" },
      "planning": { "status": "pending" },
      "tdd": { "status": "pending" },
      "implementation": { "status": "pending" },
      "review": { "status": "pending" },
      "release": { "status": "pending" }
    },
    "approvals": {
      "discovery": false,
      "business-analysis": false,
      "planning": false,
      "tdd": false,
      "implementation": false,
      "review": false,
      "release": false
    },
    "activeAgent": "planner",
    "blockers": [],
    "wave": "MVP",
    "history": []
  },
  "metadata": {
    "createdAt": "2026-05-21T00:00:00Z",
    "lastUpdatedAt": "2026-05-21T00:00:00Z",
    "lastUpdatedBy": "bootstrap",
    "version": "1.0"
  }
}
```

## State Backup and Recovery

- State is version-controlled; recovery via Git history
- Snapshots are kept in `.claude/runtime-logs/` for audit
- No live backups (rely on VCS for recovery)
