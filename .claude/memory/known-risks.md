# Known Risks

## Missing Automation

- There is currently no runtime or enforcement engine to automatically apply governance rules.
- Manual review is the only enforcement mechanism at this stage.

## Lack of Enforcement Engine

- SDLC gate rules are documented but not yet enforced by tooling.
- This increases the risk of processes being bypassed or misunderstood.

## No Workflow Runtime

- Agent handoffs are defined in docs but no execution runtime exists.
- This creates a gap between planned workflow and actual task execution.

## Possible Agent Drift

- Without automation, agent behavior may drift from documented role boundaries.
- Multi-agent coordination depends on consistent documentation and manual oversight.

## Scalability Concerns

- The current repository is suitable for governance bootstrapping, but scaling to multiple teams or templates will require stronger automation and sync mechanisms.

## Related Documents

- `.claude/memory/pending-decisions.md`
- `.claude/memory/roadmap.md`
- `.claude/adr/0004-multi-agent-role-separation.md`
