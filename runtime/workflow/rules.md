# Workflow Rules

## Core Enforcement Rules

These rules are referenced by the enforcement engine to validate workflow actions.

### Rule: No Code Before Tests

- **Phase**: tdd → implementation
- **Validation**: Confirm TDD artifacts exist and tests are marked as failing-first
- **Failure**: Block implementation, request TDD artifacts
- **Reference**: RULES.md, testing-guide agent scope

### Rule: No Implementation Without Architecture

- **Phase**: planning → implementation (enterprise mode)
- **Validation**: Confirm architecture document exists (enterprise) or accept direct plan (lightweight)
- **Failure**: Block implementation, request architecture approval
- **Reference**: architect agent scope, SDLC.md

### Rule: Phase Sequence Enforcement

- **Validation**: Proposed transition must match valid phase graph
- **Failure**: Deny invalid transitions, return required intermediate phase
- **Reference**: phases.md

### Rule: Agent Scope Enforcement

- **Validation**: Agent action must match its defined scope in AGENTS.md
- **Failure**: Deny out-of-scope action, log scope violation
- **Reference**: AGENTS.md, agent-coordination/dispatcher.md

### Rule: Approval Gate Enforcement

- **Phase**: review → release, security → release (enterprise)
- **Validation**: Confirm approval flags are true for required gatekeepers
- **Failure**: Block release, list missing approvals
- **Reference**: enforcement/gates.md

## Rule Violation Handling

When a rule violation is detected:
1. Reject the action with a clear reason
2. Log the violation attempt
3. Record the blocker in workflow state
4. Return required remediation steps
5. Do not allow progression until remediation is complete
