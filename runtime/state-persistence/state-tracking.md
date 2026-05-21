# State Tracking

## Purpose

Records all state transitions and provides audit trail for workflow execution.

## State Change Events

Every state change is tracked as an event:

```json
{
  "event": {
    "id": "event-20260521-001",
    "timestamp": "2026-05-21T10:00:00Z",
    "type": "phase_transition",
    "fromPhase": "discovery",
    "toPhase": "business-analysis",
    "actor": "planner",
    "reason": "discovery artifacts complete and approved",
    "state_snapshot": {}
  }
}
```

## Event Types

### phase_transition

- **Trigger**: Phase changed
- **Data**: fromPhase, toPhase, actor, reason
- **Logged**: In `.claude/runtime-logs/`

### artifact_completed

- **Trigger**: Artifact marked complete
- **Data**: phase, artifact_name, file_path, actor
- **Logged**: In `.claude/runtime-logs/`

### approval_granted

- **Trigger**: Approval flag set to true
- **Data**: gate_name, approver, timestamp
- **Logged**: In `.claude/runtime-logs/`

### blocker_created

- **Trigger**: Blocker added
- **Data**: blocker_type, message, phase, required_action
- **Logged**: In `.claude/runtime-logs/`

### blocker_resolved

- **Trigger**: Blocker removed
- **Data**: blocker_id, resolution, resolver
- **Logged**: In `.claude/runtime-logs/`

### ci_checkpoint_result

- **Trigger**: CI checkpoint completed
- **Data**: checkpoint_name, pass/fail, details
- **Logged**: In `.claude/runtime-logs/`

## History Tracking

Workflow state includes a `history` array containing a summary of key events:

```json
{
  "history": [
    {
      "timestamp": "2026-05-21T10:00:00Z",
      "type": "phase_completed",
      "phase": "discovery",
      "actor": "user"
    },
    {
      "timestamp": "2026-05-21T10:15:00Z",
      "type": "phase_transition",
      "fromPhase": "discovery",
      "toPhase": "business-analysis",
      "actor": "planner"
    }
  ]
}
```

## Audit Trail

Full audit trail is maintained in `.claude/runtime-logs/`:

```
.claude/runtime-logs/
├── 2026-05-21/
│   ├── events-2026-05-21-10-00-00.json
│   ├── events-2026-05-21-11-00-00.json
│   └── state-discovery-2026-05-21-10-00-00.json
```

## Query Operations

### Get Phase History

- **Query**: All events for specific phase
- **Returns**: List of events in chronological order

### Get Actor Activity

- **Query**: All events by specific actor
- **Returns**: List of actions and changes

### Get State at Timestamp

- **Query**: State snapshot at specific time
- **Returns**: Complete state as it existed

### Get Blockers History

- **Query**: All blocker events
- **Returns**: Timeline of blockers created and resolved

## State Tracking Benefits

- **Auditability**: Full history of changes
- **Debugging**: Trace back to when/why state changed
- **Learning**: Understand workflow patterns
- **Compliance**: Document decision trail
