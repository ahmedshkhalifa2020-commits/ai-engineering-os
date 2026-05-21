# Gate Definitions

## SDLC Gates

Each gate controls progression to the next phase and enforces required approvals and artifacts.

### Discovery Gate

- **Blocks**: Progression to business-analysis
- **Requires**: Problem statement, stakeholder list, success criteria
- **Approvers**: (none required for lightweight mode)
- **Owner**: planner

### Business Analysis Gate

- **Blocks**: Progression to planning (lightweight) or system-analysis (enterprise)
- **Requires**: Business rules, actor definitions, edge cases
- **Approvers**: (none required for lightweight mode)
- **Owner**: business-analyst

### Planning Gate

- **Blocks**: Progression to tdd
- **Requires**: Implementation plan, dependencies, acceptance criteria
- **Approvers**: (none required)
- **Owner**: planner

### TDD Gate

- **Blocks**: Progression to implementation
- **Requires**: Failing tests (marked as failing-first), test coverage strategy
- **Approvers**: testing-guide
- **Owner**: testing-guide

### Implementation Gate

- **Blocks**: Progression to review
- **Requires**: Code files, passing tests, test coverage ≥ 80%
- **Approvers**: (none required)
- **Owner**: nextjs-implementation

### Review Gate

- **Blocks**: Progression to security (enterprise) or release (lightweight)
- **Requires**: Code review feedback, no critical issues unresolved
- **Approvers**: code-reviewer
- **Owner**: code-reviewer

### Security Gate (Enterprise Only)

- **Blocks**: Progression to release
- **Requires**: Threat model, security assessment, mitigations
- **Approvers**: security-reviewer
- **Owner**: security-reviewer

## Gate Validation Flow

1. Request phase transition
2. Fetch current gate definition
3. Validate artifact presence
4. Check approval status
5. Allow or deny transition
6. Record result in state history
