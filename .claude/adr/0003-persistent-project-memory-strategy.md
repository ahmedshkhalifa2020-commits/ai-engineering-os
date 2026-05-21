# Title

Persistent Project Memory Strategy

## Status

Accepted

## Context

The repository uses AI agent workflows that benefit from workspace memory. A formal memory strategy is needed to capture operational state, roadmap context, risks, and pending decisions without mixing them into transient conversation logs.

## Decision

We establish a persistent memory layer under `.claude/memory/` for repository-scoped operational artifacts. The initial memory artifacts include:

- `current-system-state.md`
- `active-modules.md`
- `roadmap.md`
- `known-risks.md`
- `pending-decisions.md`
- `implementation-status.md`

This memory layer is treated as an operational snapshot of the framework itself, not as business or product data.

## Alternatives Considered

- Use only ADRs for history and no persistent memory: rejected because ADRs are not designed to track live operational state.
- Store memory in `README` or root docs: rejected because it mixes runtime state with static documentation.
- Use external issue tracker for all operational state: rejected because repository self-containment is preferred.

## Consequences

- Positive: workflow state and risks are visible in the repository.
- Positive: agents can reason with an explicit operational snapshot.
- Negative: these files must be maintained as the framework evolves.
- Negative: persistent memory may require periodic review to stay accurate.

## Related Documents

- `.claude/memory/README.md`
- `.claude/adr/0001-authoritative-repository-governance-model.md`
- `.claude/memory/current-system-state.md`
- `.claude/memory/roadmap.md`
