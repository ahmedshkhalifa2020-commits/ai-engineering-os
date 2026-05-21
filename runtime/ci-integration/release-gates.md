# Release Gate Rules

## Purpose

Defines when a project can be released based on workflow state, approvals, and CI validation.

## Release Gate Rules

### Rule: Phase Must Be Release

- **Check**: currentPhase == "release"
- **Pass**: Workflow is in release phase
- **Fail**: "Cannot release. Workflow must complete all prior phases. Current: {currentPhase}"
- **Action**: Block release

### Rule: All Approvals Must Be Granted

**Lightweight Mode**:
- **Check**: approval.review == true
- **Pass**: Code review approved
- **Fail**: "Cannot release. Code review approval required"

**Enterprise Mode**:
- **Check**: approval.review == true AND approval.security == true
- **Pass**: Code review and security approved
- **Fail**: "Cannot release. Missing approvals: {missing_approvers}"

### Rule: All CI Checkpoints Must Pass

- **Check**: All implementation, review, security checkpoints passed
- **Pass**: CI validation complete
- **Fail**: "Cannot release. CI checkpoints failed: {failed_list}"
- **Action**: Block release, link to CI logs

### Rule: Memory State Must Be Synced

- **Check**: All memory artifacts are current (synced within 1 hour)
- **Pass**: Memory is synchronized
- **Fail**: "Cannot release. Runtime memory sync required"
- **Action**: Block release until sync completes

### Rule: No Active Blockers

- **Check**: blockers list is empty
- **Pass**: No blockers
- **Fail**: "Cannot release. Active blockers: {blocker_list}"
- **Action**: Block release until blockers resolved

### Rule: Release Notes Exist

- **Check**: RELEASE-NOTES.md or CHANGELOG.md exists and is updated
- **Pass**: Release documentation exists
- **Fail**: "Cannot release. Release notes required"
- **Action**: Block release, request release documentation

## Release Gate Evaluation

When a release is requested:

1. Evaluate Rule: Phase
2. If fail: Reject and return to appropriate phase
3. Evaluate Rule: Approvals
4. If fail: Request missing approvals
5. Evaluate Rule: CI Checkpoints
6. If fail: Return to implementation/review for fixes
7. Evaluate Rule: Memory Sync
8. If fail: Sync memory and retry
9. Evaluate Rule: No Blockers
10. If fail: Resolve blockers and retry
11. Evaluate Rule: Release Notes
12. If fail: Create release notes and retry
13. All rules pass: ALLOW RELEASE

## Release Gate Status Display

When a release is blocked, display:
- Which rule(s) failed
- What is required
- How to remedy

Example:
```
Release blocked. Violations:
✗ Security review approval required (security-reviewer must approve)
✗ Release notes not found (create RELEASE-NOTES.md)
✗ 1 active blocker (missing-security-assessment)

Next steps:
1. Complete security review and get approval
2. Create or update RELEASE-NOTES.md
3. Resolve blocker: security assessment
4. Retry release
```

## Release Success

When all gates pass:

1. Log release event with timestamp
2. Update runtime state to "release_complete"
3. Generate release summary
4. Archive runtime state for this release
5. Create release tag in VCS
6. Trigger deployment pipeline (if configured)
