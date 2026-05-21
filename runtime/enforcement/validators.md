# Validator Definitions

## Artifact Validators

Validators check whether required artifacts exist and have the correct status.

### Discovery Artifact Validator

- **Checks**: existence of problem statement, stakeholder list, success criteria
- **Returns**: pass/fail + missing item list
- **Used by**: Discovery gate

### Business Analysis Artifact Validator

- **Checks**: existence of business rules, actor definitions, edge cases
- **Returns**: pass/fail + missing item list
- **Used by**: Business Analysis gate

### Plan Artifact Validator

- **Checks**: existence of implementation plan, dependencies, acceptance criteria
- **Returns**: pass/fail + missing item list
- **Used by**: Planning gate

### TDD Artifact Validator

- **Checks**: existence of failing tests, test coverage documentation
- **Checks**: tests are marked as failing-first
- **Returns**: pass/fail + issues list
- **Used by**: TDD gate

### Implementation Artifact Validator

- **Checks**: existence of production code, test files
- **Checks**: tests pass, coverage ≥ 80%
- **Returns**: pass/fail + issues list
- **Used by**: Implementation gate

### Review Artifact Validator

- **Checks**: code review feedback exists, critical issues resolved
- **Returns**: pass/fail + unresolved items list
- **Used by**: Review gate

## Approval Validators

Approve validators check whether required approvals have been granted.

### Approval Status Validator

- **Checks**: approval flag for specific gate in workflow state
- **Returns**: approved/denied + approver info
- **Used by**: All gates with required approvals

## Validator Invocation

Validators are called during gate evaluation in the enforcement engine.
