# Review Workflow Skill

## Purpose

This skill defines the code review process, quality gates, and the conditions required before moving to security and release.

## Core Rules

- Review happens after implementation and before final signoff.
- Review must validate architecture alignment, tests, and code quality.
- Review issues must be resolved before release.

## Steps

1. Inspect code against architecture and plan.
2. Confirm tests pass and coverage goals are met.
3. Validate style, type safety, and maintainability.
4. Document issues and required fixes.
5. Approve or reject based on review criteria.

## Validation

- Code review checklist completed
- No unresolved critical or major issues
- Architecture and test compliance confirmed
- Review signoff recorded

## Blockers

- No completed review
- Unresolved code quality or design issues
- Missing test coverage evidence
- No security handoff in enterprise mode

## Handoff

- Return code to `nextjs-implementation` for fixes when needed
- Once passed, hand off code to `security-reviewer`
- Require review summary for `release`

## References

- `.claude/rules/sdlc.md`
- `.claude/skills/sdlc-workflow.skill.md`
