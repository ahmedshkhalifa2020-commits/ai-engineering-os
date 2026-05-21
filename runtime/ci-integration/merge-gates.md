# Merge Gate Rules

## Purpose

Defines when a feature branch can be merged to main/develop based on workflow state and CI results.

## Merge Gate Rules

### Rule: Phase Must Be Review or Later

- **Check**: current phase in `.claude/runtime-state.json` >= review
- **Pass**: Phase is review or later
- **Fail**: "Cannot merge. Workflow must reach review phase. Current: {currentPhase}"
- **Action**: Block merge

### Rule: All Implementation Checkpoints Must Pass

- **Check**: lint, build, tests, coverage all passed
- **Pass**: All checkpoints passed
- **Fail**: "Cannot merge. CI checkpoints failed: {failed_checkpoint_list}"
- **Action**: Block merge, link to CI logs

### Rule: Code Review Approval Must Be Present

- **Check**: approval.review == true in runtime state
- **Pass**: Code review approved
- **Fail**: "Cannot merge. Code review approval required"
- **Action**: Block merge, suggest requesting review

### Rule: Memory Sync Must Be Current

- **Check**: Last memory sync timestamp is recent (< 1 hour old)
- **Pass**: Memory is current
- **Fail**: "Cannot merge. Runtime memory is stale. Update required."
- **Action**: Block merge, suggest memory sync

### Rule: No Active Blockers

- **Check**: blockers list in runtime state is empty
- **Pass**: No blockers
- **Fail**: "Cannot merge. Workflow blockers: {blocker_list}"
- **Action**: Block merge, require blocker resolution

## Merge Gate Evaluation

When a merge is requested:

1. Evaluate Rule: Phase
2. If fail: Reject with reason, stop
3. Evaluate Rule: Implementation Checkpoints
4. If fail: Reject with reason, stop
5. Evaluate Rule: Code Review Approval
6. If fail: Reject with reason, stop
7. Evaluate Rule: Memory Sync
8. If fail: Reject with reason, stop
9. Evaluate Rule: No Blockers
10. If fail: Reject with reason, stop
11. All rules pass: ALLOW MERGE

## Merge Gate Status Display

When a merge is blocked, display:
- Which rule(s) failed
- What is required to pass
- Next steps to unblock

Example:
```
Merge blocked. Violations:
✗ Code review approval required (code-reviewer must approve)
✗ Test coverage 65% (required 80%; add {15 percentage points})

Next steps:
1. Request code review from code-reviewer
2. Increase test coverage
3. Retry merge
```
