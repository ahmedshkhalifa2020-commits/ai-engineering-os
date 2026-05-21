# CI Checkpoints

## Purpose

Defines automated validation checkpoints that occur during CI pipeline execution.

## Checkpoint Definitions

### Discovery Phase Checkpoints

- No CI checkpoints required (documentation phase)

### Business Analysis Phase Checkpoints

- No CI checkpoints required (documentation phase)

### Planning Phase Checkpoints

- No CI checkpoints required (documentation phase)

### TDD Phase Checkpoints

**Checkpoint: Tests Syntax Valid**
- Trigger: On test file commit
- Check: Test files compile/parse correctly
- Pass: Tests are syntactically valid
- Fail: Return syntax errors
- Blocking: No (warning only)

### Implementation Phase Checkpoints

**Checkpoint: Lint Passes**
- Trigger: On code commit
- Command: `npm run lint`
- Pass: No linting errors
- Fail: Return lint violations
- Blocking: Yes (blocks CI progress)

**Checkpoint: Build Succeeds**
- Trigger: After lint passes
- Command: `npm run build`
- Pass: Build completes without errors
- Fail: Return build errors
- Blocking: Yes

**Checkpoint: Tests Pass**
- Trigger: After build succeeds
- Command: `npm test`
- Pass: All tests pass
- Fail: Return failing test list
- Blocking: Yes

**Checkpoint: Coverage Meets Threshold**
- Trigger: After tests pass
- Check: Coverage ≥ 80%
- Pass: Coverage threshold met
- Fail: Return coverage gap
- Blocking: Yes

### Review Phase Checkpoints

**Checkpoint: PR Linked**
- Trigger: On feature branch
- Check: PR exists and linked to runtime state
- Pass: PR metadata found
- Fail: Return PR link requirement
- Blocking: Yes (for merge)

### Security Phase Checkpoints (Enterprise)

**Checkpoint: Security Review Recorded**
- Trigger: Before release
- Check: approval.security = true in runtime state
- Pass: Security review approved
- Fail: Return missing security approval
- Blocking: Yes

### Release Phase Checkpoints

**Checkpoint: All Prior Checkpoints Pass**
- Trigger: On release request
- Check: All prior phase checkpoints passed
- Pass: Release eligible
- Fail: Return failed checkpoint list
- Blocking: Yes (blocks release)

## Checkpoint Status Reporting

Checkpoint results are:
- Reported to runtime state
- Used by enforcement gates
- Logged in `.claude/runtime-logs/`
- Made available to merge/release decisions

## Checkpoint Failure Handling

When a checkpoint fails:
1. CI reports failure with clear error message
2. Runtime state is updated with failure status
3. Workflow progression is blocked
4. Agent is notified of failure
5. Agent remediates and retriggers CI
