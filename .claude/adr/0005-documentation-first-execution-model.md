# Title

Documentation-First Execution Model

## Status

Accepted

## Context

The repository's governance and workflow depend on transparent, versioned documentation. Since agents rely on doc-based rules, the execution model must prioritize documentation before implementation.

## Decision

We adopt a documentation-first execution model where:

- governance is defined in repository docs first
- agent behavior follows documented rules
- workflow changes require doc updates before code changes
- repository conventions are captured in ADRs and memory artifacts

This ensures that the repository's operational model is auditable and that governance is not an afterthought.

## Alternatives Considered

- Allow implementation to lead and document later: rejected because it breaks the audit trail.
- Keep governance only in code or comments: rejected because it is less accessible to agents and contributors.
- Use informal conventions without docs: rejected because it does not satisfy the repository's governance-first intent.

## Consequences

- Positive: the workflow is explicit and discoverable.
- Positive: compliance and review can reference written artifacts.
- Negative: document maintenance adds overhead.
- Negative: contributors must learn the documentation model before acting.

## Related Documents

- `RULES.md`
- `CLAUDE.md`
- `.claude/README.md`
- `.claude/adr/0001-authoritative-repository-governance-model.md`
- `.claude/memory/pending-decisions.md`
