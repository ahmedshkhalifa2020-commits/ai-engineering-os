# Security Workflow Skill

## Purpose

This skill defines security validation and release gating for enterprise-grade projects.

## Core Rules

- Security review is mandatory for enterprise-mode work.
- Security must evaluate threat model, sensitive flows, and data handling.
- Release is blocked until security signoff is complete.

## Steps

1. Review architecture and system analysis for security risk.
2. Inspect implementation for secrets, validation, and auth controls.
3. Identify and document security findings.
4. Confirm mitigations and fixes.
5. Approve or block release based on security status.

## Validation

- Threat model exists and is reviewed
- Sensitive inputs/outputs are validated
- No unresolved critical security issues
- Security decision recorded before release

## Blockers

- No security assessment
- Unresolved critical or high-risk findings
- Missing threat model or risk documentation
- Enterprise-mode release without security review

## Handoff

- Require security signoff before release
- Coordinate with `code-reviewer` for sensitive feature review
- Document release gating in the deployment checklist

## References

- `.claude/rules/sdlc.md`
- `.claude/skills/sdlc-workflow.skill.md`
