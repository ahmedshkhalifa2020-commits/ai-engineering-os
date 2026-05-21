---
title: "Testing and TDD"
description: "Test-driven development practices and coverage requirements"
tags: [testing, tdd, quality]
---

# Testing Rules

## TDD Workflow (Red-Green-Refactor)

### 1. RED - Write Failing Test First

```typescript
// ❌ WRONG: Write code then test
export function add(a: number, b: number) {
  return a + b;
}

// ✅ CORRECT: Test first
describe("add", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5); // Test fails - function doesn't exist yet
  });
});
```

### 2. GREEN - Write Minimal Code to Pass

```typescript
// ✅ First pass (minimal)
export function add(a: number, b: number) {
  return a + b;
}

// Then add more test cases
it("should handle negative numbers", () => {
  expect(add(-2, 3)).toBe(1);
});

it("should handle zero", () => {
  expect(add(0, 0)).toBe(0);
});
```

### 3. REFACTOR - Improve Without Changing Behavior

```typescript
// Before refactoring: tests confirm behavior
export function add(a: number, b: number): number {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Arguments must be numbers");
  }
  return a + b;
}
// All tests still pass ✓
```

## Coverage Requirements

### Minimum: 80% Line Coverage

```typescript
// npm test -- --coverage

// Coverage breakdown:
// ✅ Statements: 80%+   (lines executed)
// ✅ Branches: 80%+     (if/else paths)
// ✅ Functions: 80%+    (functions called)
// ✅ Lines: 80%+        (lines tested)

// ❌ This doesn't mean test every line - test behavior
// ✅ This means every reachable line should be exercised
```

### What NOT to Test

```typescript
// ❌ SKIP: Framework internals (Jest/React handles this)
it("should render when createElement is called", () => {});

// ❌ SKIP: Type checking (TypeScript catches this at compile time)
it("should accept only strings", () => {
  // TypeScript won't compile if you pass wrong type
});

// ❌ SKIP: Third-party library behavior
it("should parse JSON.parse correctly", () => {});
```

### What TO Test

```typescript
// ✅ DO: Business logic
it("should apply 10% discount for orders over $100", () => {
  expect(calculatePrice(150)).toBe(135);
});

// ✅ DO: Error cases
it("should throw on invalid email", () => {
  expect(() => validateEmail("not-an-email")).toThrow();
});

// ✅ DO: Edge cases
it("should handle empty array", () => {
  expect(sum([])).toBe(0);
});

// ✅ DO: Integration between functions
it("should create user and send welcome email", async () => {
  const user = await createUser({ email: "test@example.com" });
  expect(emailService.send).toHaveBeenCalledWith(user.email);
});
```

## Async Testing

### Use Async/Await

```typescript
// ✅ GOOD: Async/await is clearest
it("should fetch user data", async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe("John");
});

// ❌ AVOID: Returning promises (harder to read)
it("should fetch user data", () => {
  return fetchUser(1).then((user) => {
    expect(user.name).toBe("John");
  });
});
```

### Mock External Services

```typescript
// ✅ Always mock external APIs
jest.mock("./api", () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: "John" }),
}));

it("should handle fetch success", async () => {
  const user = await getUser(1);
  expect(user.name).toBe("John");
});

it("should handle fetch error", async () => {
  (fetchUser as jest.Mock).mockRejectedValue(new Error("Network error"));
  await expect(getUser(1)).rejects.toThrow("Network error");
});
```

## Test File Structure

```typescript
describe("ComponentName", () => {
  // Shared setup
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
  });

  afterEach(() => {
    container.remove();
  });

  describe("Happy Path", () => {
    it("should render on mount", () => {
      // Test
    });

    it("should update on prop change", () => {
      // Test
    });
  });

  describe("Error Cases", () => {
    it("should show error message on failure", () => {
      // Test
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty data", () => {
      // Test
    });
  });
});
```

## Test Naming

### Pattern: `should [expected behavior] [when/under conditions]`

```typescript
// ✅ CLEAR
it("should return 10% discount when order exceeds $100", () => {});
it("should throw error when email is invalid", () => {});
it("should render loading spinner while fetching", () => {});

// ❌ UNCLEAR
it("works correctly", () => {});
it("test discount", () => {});
it("should not fail", () => {});
```
