# Code Review Workflow

## Goal

Verify code quality, standards compliance, and architectural consistency before merge.

## Trigger

User requests `/code-review` or code-reviewer starts review cycle.

## Workflow Steps

1. **Check Build & Lint**
   - Run `npm run build` - must pass
   - Run `npm run lint` - must pass
   - No warnings tolerated

2. **Review Against RULES.md**
   - Type safety: no `any` without justification
   - Error handling: all async operations wrapped
   - No console.log in production
   - Immutability: no mutations
   - Environment: no hardcoded secrets

3. **Review Code Quality**
   - Naming conventions followed
   - Single responsibility principle
   - No code duplication
   - Reasonable function/method length
   - Clear intent

4. **Review Architecture**
   - Components placed correctly
   - No circular dependencies
   - Proper separation of concerns
   - Conventions followed

5. **Flag Issues**
   - Violations: must fix
   - Improvements: suggest but not required
   - Questions: ask for clarity

## Review Checklist

- [ ] Build passes
- [ ] Lint passes
- [ ] Tests pass with 80%+ coverage
- [ ] RULES.md standards met
- [ ] Code is readable
- [ ] Architecture is sound
- [ ] No hardcoded secrets

## Validation

✅ All checks pass
✅ No violations flagged
✅ Code quality is consistent

## Handoff

Approved code ready for merge.
