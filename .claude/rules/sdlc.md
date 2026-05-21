# SDLC Governance Rules

This document defines the mandatory SDLC phase ordering, phase gates, required artifacts, and enforcement logic for the AI Engineering OS framework.

## Phase Sequence

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

### Why This Sequence

- Discovery validates the business need.
- Business Analysis captures the domain rules.
- System Analysis defines boundaries and ownership.
- Architecture designs the solution before coding.
- Planning makes execution concrete.
- TDD defines expected behavior first.
- Implementation delivers code against tests.
- Review and Security validate quality and risk.
- Release deploys only after all gates pass.

## Phase Definitions

### Discovery

- Required inputs: feature request, stakeholder context, business problem.
- Required outputs: problem statement, goals, success criteria, stakeholder list.
- Blockers: undefined business need, no stakeholder alignment, ambiguous scope.
- Validation: business problem is confirmed and documented.

### Business Analysis

- Required inputs: discovery artifacts.
- Required outputs: business goals, actors, business rules, assumptions, risks, edge cases.
- Blockers: missing business rules, incomplete actor model, absent risk assessment.
- Validation: all core business scenarios are documented and mapped to expected behavior.

### System Analysis

- Required inputs: business analysis artifacts.
- Required outputs: domain model, data ownership, system relationships, sync boundaries, non-functional constraints.
- Blockers: missing domain ownership, unset boundaries, unclear dependencies.
- Validation: system model covers all business use cases and identifies implementation constraints.

### Architecture

- Required inputs: system analysis artifacts.
- Required outputs: high-level architecture, module/component structure, data flow, separation of concerns, integration strategy.
- Blockers: no architecture diagram, design mismatch with business/system analysis.
- Validation: architecture solves the problem and is feasible for the target environment.

### Planning

- Required inputs: architecture artifacts.
- Required outputs: implementation waves, dependency order, test strategy, checkpoints, acceptance criteria.
- Blockers: missing implementation order, absent test strategy, undefined checkpoints.
- Validation: plan is executable and traceable to architecture.

### TDD

- Required inputs: plan and acceptance criteria.
- Required outputs: failing tests, acceptance tests, edge case coverage, coverage target.
- Blockers: no tests defined, test cases incomplete, acceptance criteria not covered.
- Validation: tests fail before code exists and exercise expected behavior.

### Implementation

- Required inputs: approved architecture, TDD artifacts.
- Required outputs: production code, passing tests, implementation notes.
- Blockers: architecture not approved, missing tests, unresolved analysis issues.
- Validation: implementation passes tests and does not violate architecture or governance.

### Review

- Required inputs: implemented code and tests.
- Required outputs: review feedback, code quality issues, signoff conditions.
- Blockers: no review completed, unresolved issues, checklist failures.
- Validation: review checklist passed and corrective actions applied.

### Security

- Required inputs: reviewed implementation and data/process design.
- Required outputs: threat model, mitigations, security signoff.
- Blockers: unassessed sensitive flows, unresolved security findings.
- Validation: security gap analysis completed and issues resolved.

### Release

- Required inputs: review and security signoff.
- Required outputs: deployment checklist, release notes, monitoring and rollback plan.
- Blockers: missing prior gate signoff, incomplete release readiness.
- Validation: release criteria are met and documented.

## Workflow Enforcement

The framework must detect and reject premature progression according to these rules:

- Implementation is blocked until Discovery, Business Analysis, Architecture, and TDD artifacts exist.
- Architecture approval is required before any code-writing requests are accepted.
- TDD artifacts must exist and fail before implementation begins.
- Review and Security gates must pass before Release.
- Missing use cases or incomplete analysis block Architecture and Planning.

## Detecting Missing Work

The system must treat these conditions as blockers:

- Missing discovery brief: no documented problem statement or business goals.
- Missing analysis: business rules, actors, assumptions, or domain boundaries are absent.
- Missing use cases: no normal, alternative, and failure-path descriptions for key workflows.
- Missing architecture: no high-level design or module decomposition.

## Lightweight vs Enterprise Mode

### Lightweight Mode

- Use when the task is low-risk, exploratory, or internal.
- Skip System Analysis and Architecture if the problem is simple and team size is small.
- Still require Discovery, Business Analysis, Planning, TDD, Implementation, Review, Release.
- Still enforce a “no-code-before-tests” rule.

### Enterprise Mode

- Use when the project is customer-facing, regulated, multi-team, or complex.
- Enforce all phases: Discovery → Business Analysis → System Analysis → Architecture → Planning → TDD → Implementation → Review → Security → Release.
- Require formal documentation and independent gate validation.

## Artifact Contracts

Each phase must document:

- Inputs
- Outputs
- Blockers
- Validation conditions
- Handoff conditions

Each artifact becomes the next phase’s required input.

## Agent Handoff Rules

- `planner` owns phase gating for Discovery and Planning.
- `business-analyst` owns Business Analysis and confirms analysis completeness.
- `architect` owns System Analysis and Architecture.
- `testing-guide` owns TDD artifacts and test adequacy.
- `nextjs-implementation` owns code delivery, but only after architecture and TDD are approved.
- `code-reviewer` owns Review and quality validation.
- `security-reviewer` owns Security and release control.

## References

- `SDLC.md`
- `.claude/agents/*.agent.md`
- `.claude/skills/sdlc-workflow.skill.md`
- `.claude/skills/tdd-workflow.skill.md`
- `.claude/skills/review-workflow.skill.md`
- `.claude/skills/security-workflow.skill.md`
