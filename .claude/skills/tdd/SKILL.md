# TDD Workflow

## Goal

Write failing tests first, then implementation to make them pass.

## Trigger

User requests `/tdd` or testing-guide starts test-first cycle.

## Workflow Steps (Red-Green-Refactor)

### RED: Write Failing Test

1. Understand acceptance criteria from plan
2. Write test that fails initially
3. Verify test actually fails
4. Run `npm run test` to confirm

Test structure:
```typescript
describe("Feature Name", () => {
  it("should [expected behavior] [when conditions]", () => {
    // Test fails initially
  });
});
```

### GREEN: Write Minimal Implementation

1. Write minimum code to make test pass
2. No over-engineering
3. No extra features
4. Run `npm run test` - test passes
5. Run `npm run lint` - code is clean

### REFACTOR: Improve Without Breaking

1. Improve code quality
2. Extract duplicates
3. Improve naming
4. Run tests - still passing
5. Run lint - still clean

## Validation

✅ Tests fail initially
✅ Tests pass after implementation
✅ Coverage >= 80%
✅ No skipped tests
✅ All async handled correctly

## Handoff

Tests and implementation ready for `/code-review`.
