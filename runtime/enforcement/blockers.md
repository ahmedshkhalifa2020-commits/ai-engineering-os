# Blocker Detection and Resolution

## Blocker Types

A blocker is a reason why workflow progression is prevented.

### Missing Artifact Blocker

- **Trigger**: Required artifact is not present
- **Example**: "TDD artifacts missing; cannot enter implementation"
- **Resolution**: Create the required artifact and mark complete

### Missing Approval Blocker

- **Trigger**: Required gatekeeper approval is not granted
- **Example**: "Code review approval required; cannot enter release"
- **Resolution**: Obtain approval from the required gatekeeper

### Invalid Phase Transition Blocker

- **Trigger**: Proposed transition is not valid in phase graph
- **Example**: "Cannot transition planning → implementation; must complete TDD first"
- **Resolution**: Follow the valid phase sequence

### Agent Scope Violation Blocker

- **Trigger**: Requested action is outside agent's scope
- **Example**: "nextjs-implementation cannot approve code review"
- **Resolution**: Route request to the correct agent

### Failed Validation Blocker

- **Trigger**: Validation check failed (e.g., tests do not pass, coverage insufficient)
- **Example**: "Test coverage 65%; required 80%"
- **Resolution**: Address the validation failure and rerun checks

## Blocker State

Blockers are stored in `.claude/runtime-state.json` as a list of blocker objects:

```json
{
  "blockers": [
    {
      "type": "missing_artifact",
      "phase": "tdd",
      "message": "TDD artifacts missing",
      "requiredItem": "failing-tests.md"
    }
  ]
}
```

## Blocker Resolution Flow

1. Workflow is blocked with reason(s)
2. Agent or user reads blocker message
3. Required remediation is performed
4. Blocker is cleared from state
5. Workflow can attempt progression again
