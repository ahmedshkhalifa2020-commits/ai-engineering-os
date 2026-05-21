# Memory Synchronization Rules

## Purpose

Defines when and how to update `.claude/memory/` artifacts from runtime state.

## Sync Events

Memory sync is triggered on:

- Phase transition completion
- Artifact validation success
- Approval gate passage
- Blocker creation or resolution
- State history milestone

## Sync Targets

### current-system-state.md

Updated when:

- **Phase changes**: Update currentPhase and activeAgent
- **Completion**: Update active modules and operational maturity
- **Blockers**: Update known missing systems

Content updated:

- `Current Governance Systems`
- `Active Workflow Modules`
- `Known Missing Systems`

### implementation-status.md

Updated when:

- **Artifact completes**: Mark system as completed/partially completed
- **Phase completes**: Update progress percentage
- **Gate passes**: Mark checkpoint as passed

Content updated:

- `Completed Systems`
- `Partially Completed Systems`
- `Current Repository Maturity Assessment`

### roadmap.md

Updated when:

- **Phase changes**: Update current phase in roadmap
- **Wave completes**: Move to next wave
- **Milestone achieved**: Update phase description

Content updated:

- `Current Phase`
- `Short-Term Roadmap`

### known-risks.md

Updated when:

- **Blocker appears**: Add to risks if new risk class
- **Blocker resolves**: Mark risk as mitigated
- **New gap detected**: Document in risks

Content updated:

- `[Risk categories with current status]`

### pending-decisions.md

Updated when:

- **Decision needed**: Record in pending decisions
- **Decision made**: Move to history or update content

Content updated:

- `[Pending decision items with current status]`

## Sync Validation

After sync, validate:

- Memory files are updated
- No stale content remains
- References are correct
- Terminology is consistent

## Sync Failure Handling

If memory sync fails:

- Log the error with timestamp
- Continue workflow (sync is not blocking)
- Flag for manual review
- Alert to stale memory state
