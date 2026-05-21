# Agent Dispatcher

## Purpose

Maps current SDLC phase to the responsible agent and generates handoff records.

## Phase-to-Agent Mapping

| Phase             | Agent                 | Responsibility                                |
| ----------------- | --------------------- | --------------------------------------------- |
| discovery         | planner               | Define problem, goals, scope                  |
| business-analysis | business-analyst      | Extract business rules, actors, edge cases    |
| system-analysis   | architect             | Define domain model, boundaries, ownership    |
| architecture      | architect             | Design system structure, module layout        |
| planning          | planner               | Create implementation plan, dependencies      |
| tdd               | testing-guide         | Define failing tests, coverage strategy       |
| implementation    | nextjs-implementation | Write code, make tests pass                   |
| review            | code-reviewer         | Validate quality, compliance, approve/reject  |
| security          | security-reviewer     | Assess security, approve release (enterprise) |
| release           | governance/ops        | Handle deployment and release                 |

## Dispatcher Logic

When a new task enters the workflow:

1. Read current phase from `.claude/runtime-state.json`
2. Look up responsible agent from mapping above
3. Generate handoff record (see handoffs.md)
4. Set `activeAgent` in state
5. Return agent assignment to requester

## Agent Assignment Record

```json
{
  "assignment": {
    "fromPhase": "planning",
    "toAgent": "testing-guide",
    "currentPhase": "tdd",
    "assignedAt": "2026-05-21T14:00:00Z"
  }
}
```

## Scope Validation

Before dispatching to an agent, validate that the requested action is within that agent's scope using AGENTS.md definitions.

If scope violation detected, reject and suggest correct agent.
