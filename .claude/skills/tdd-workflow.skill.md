# TDD Workflow Skill

## Purpose

This skill defines how the framework enforces test-first development and validates test artifacts before implementation.

## Core Rules

- Tests must be defined before implementation starts.
- Tests should fail initially and then pass after code is written.
- Test cases must map to acceptance criteria and edge cases.
- Coverage goals must be specified and measured.

## Steps

1. Review the implementation plan and acceptance criteria.
2. Define failing tests for each expected behavior.
3. Confirm tests fail before writing production code.
4. Implement code to make tests pass.
5. Validate coverage and edge case handling.

## Validation

- At least one failing test exists for each new feature.
- Tests cover normal, alternative, and failure paths.
- Coverage is defined and tracked.
- No implementation begins until TDD artifacts exist.

## Blockers

- Missing tests for new behavior
- Tests that do not fail first
- No coverage target
- Acceptance criteria not mapped to tests

## Handoff

- Deliver test artifacts to `nextjs-implementation`
- Confirm `testing-guide` has validated test readiness
- Hand off completed tests to `code-reviewer` after implementation

## References

- `.claude/rules/sdlc.md`
- `.claude/skills/sdlc-workflow.skill.md`
