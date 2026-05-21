# AI Engineering OS SDLC

This repository now includes an enterprise-grade Software Development Life Cycle model for future projects to inherit.

## Purpose

The SDLC model enforces structured discovery, analysis, architecture, planning, and validation before implementation begins. It is intended to prevent premature coding, reduce rework, and make governance explicit for all agents.

## Required Phases

1. Discovery
2. Business Analysis
3. System Analysis
4. Architecture
5. Planning
6. TDD
7. Implementation
8. Review
9. Security
10. Release

## Why This Order

The order exists to ensure the team understands the problem before designing a solution, defines system boundaries before choosing implementation patterns, and only writes code after tests and architectural approval exist. It keeps requirements, design, and delivery separated and traceable.

## Phase Ownership

- `planner` owns Discovery and Planning
- `business-analyst` owns Business Analysis
- `architect` owns System Analysis and Architecture
- `testing-guide` owns TDD and test strategy
- `nextjs-implementation` owns Implementation
- `code-reviewer` owns Review
- `security-reviewer` owns Security
- Release is a joint gate between implementation, review, and operations

## Workflow Modes

### Lightweight Mode

- Use for prototypes, low-risk internal work, or rapid experiments.
- Phases: Discovery → Business Analysis → Planning → TDD → Implementation → Review → Release
- Still requires basic artifacts and test-first discipline.

### Enterprise Mode

- Use for customer-facing systems, regulated work, multi-team delivery, or offline/resilient architectures.
- Phases: Discovery → Business Analysis → System Analysis → Architecture → Planning → TDD → Implementation → Review → Security → Release
- Requires formal documentation and explicit gate validation.

## Document Contracts

Every phase has mandatory artifacts. Phase output becomes the next phase input.

- Discovery: problem statement, goals, stakeholder list
- Business Analysis: business rules, actors, assumptions, risks, edge cases
- System Analysis: domain model, data ownership, boundaries, sync strategy
- Architecture: system diagram, module structure, data flow, separation of concerns
- Planning: implementation waves, dependencies, testing strategy, checkpoints
- TDD: failing tests, acceptance tests, coverage goals
- Implementation: production code, passing tests, implementation notes
- Review: code review feedback, issue resolution
- Security: threat model, mitigations, compliance notes
- Release: deployment checklist, release notes, monitoring plan

## Enforcement

The framework prevents premature implementation by requiring explicit phase artifacts before work is accepted. Missing discovery, incomplete analysis, or missing use cases are treated as blockers and must be resolved before progressing.

## Framework Files

- `.claude/rules/sdlc.md` — phase order, gates, artefact contracts, enforcement logic
- `.claude/agents/*.agent.md` — agent roles, boundaries, handoff rules
- `.claude/skills/*.skill.md` — workflow orchestration and process intelligence
- `SDLC.md` — repository-level lifecycle reference

## How to Use

When a new task or feature request arrives, start with this flow:

1. Read `SDLC.md`
2. Confirm the requested mode (`lightweight` or `enterprise`)
3. Execute Discovery and create the first artifact
4. Proceed only when the gate conditions are satisfied

Future AI Engineering OS projects in this repository should inherit this model by reference and use these governance files as the source of truth.