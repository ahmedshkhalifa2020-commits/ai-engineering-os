# Scope Validation

## Purpose

Ensures that agents only perform actions within their defined scope (from AGENTS.md).

## Scope Rules

Each agent has a defined scope from AGENTS.md:

- **planner**: Discovery, Planning phases only. NO code writing, NO architecture design skipping.
- **business-analyst**: Business Analysis phase only. NO architecture design, NO code writing.
- **architect**: System Analysis, Architecture phases only. NO code writing, NO business analysis.
- **testing-guide**: TDD phase only. NO implementation, NO business logic.
- **nextjs-implementation**: Implementation phase only. NO starting without architecture/TDD, NO skipping review.
- **code-reviewer**: Review phase only. NO code writing, NO approving insecure changes.
- **security-reviewer**: Security phase only (enterprise). NO skipping security for release, NO code writing.

## Scope Violation Detection

When an agent requests an action, validate:

1. **Phase validity**: Is the current phase within the agent's scope?
   - Example: testing-guide in TDD phase? YES
   - Example: testing-guide in implementation phase? NO → VIOLATION

2. **Action validity**: Is the requested action allowed in this phase?
   - Example: nextjs-implementation writing code in implementation? YES
   - Example: nextjs-implementation requesting review approval? NO → VIOLATION

3. **Prerequisite validity**: Are required artifacts present?
   - Example: nextjs-implementation implementing without TDD artifacts? NO → VIOLATION

## Violation Handling

If scope violation detected:

1. Reject the action with reason
2. Log the violation attempt
3. Suggest the correct agent or phase
4. Do not execute the requested action

Example response:
```
SCOPE VIOLATION: nextjs-implementation cannot enter implementation phase.
Reason: TDD artifacts missing.
Required: Failing tests from testing-guide.
Suggestion: Complete TDD phase first.
```

## Scope Validation Invocation

Scope validation is called by the enforcement engine before dispatching any action.
