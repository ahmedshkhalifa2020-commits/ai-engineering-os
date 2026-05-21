# Handoff Records

## Purpose

Documents what is handed off from one phase/agent to the next, including required inputs, expected outputs, and blockers.

## Handoff Record Structure

```json
{
  "handoff": {
    "id": "handoff-20260521-001",
    "fromPhase": "planning",
    "toPhase": "tdd",
    "assignedAgent": "testing-guide",
    "createdAt": "2026-05-21T14:00:00Z",
    "requiredInputs": [
      {
        "artifact": "implementation-plan.md",
        "status": "complete",
        "location": "docs/implementation-plan.md"
      },
      {
        "artifact": "acceptance-criteria.md",
        "status": "complete",
        "location": "docs/acceptance-criteria.md"
      }
    ],
    "expectedOutputs": [
      {
        "artifact": "failing-tests",
        "type": "code",
        "description": "Test files with failing tests for each acceptance criterion"
      },
      {
        "artifact": "coverage-strategy.md",
        "type": "document",
        "description": "Test coverage strategy and goals"
      }
    ],
    "blockers": [],
    "dueDate": null,
    "notes": "Focus on red-green-refactor cycle. Tests must fail before implementation."
  }
}
```

## Handoff Generation

When a phase completes and workflow transitions, generate a handoff record that includes:

1. Required inputs from previous phase(s)
2. Expected outputs for current phase
3. Any known blockers or constraints
4. Notes on process or special requirements

## Handoff Delivery

Handoff records are:

- Stored in `.claude/runtime-logs/` for audit
- Made available to the assigned agent
- Used to validate completion of phase

## Handoff Completion

Phase is complete when all expected outputs are delivered and validated by the enforcement engine.
