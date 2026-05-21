---
title: "Coding Style and Structure"
description: "Universal principles for code organization, naming, and structure"
tags: [universal, coding-style]
---

# Coding Style — Universal Principles

## File Organization

### Single Responsibility

- One module = one concept
- A file doing 10 things = split into 10 files
- Max file size: ~300 lines (time to refactor)

```
src/
├── components/Button.tsx           # Just the button
├── hooks/useAuth.ts                # Just the auth hook
└── lib/validation.ts               # Just validation logic
```

### Naming Conventions

```typescript
// Components & Classes: PascalCase
class UserManager {}
const UserCard: React.FC = () => {};

// Functions & Variables: camelCase
function fetchUser() {}
const isActive = true;

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";

// Type/Interface: PascalCase
interface UserData {}
type Status = "pending" | "complete";
```

## Code Formatting

### Immutability Rules

```typescript
// ❌ Avoid mutation
const users = ["Alice"];
users.push("Bob");

// ✅ Prefer new array
const users = ["Alice"];
const updatedUsers = [...users, "Bob"];
```

### Destructuring

```typescript
// ✅ Prefer destructuring
const { name, email } = user;

// ❌ Avoid dot notation chains
const name = response.data.user.profile.name;
```

### Arrow Functions

```typescript
// ✅ For callbacks
array.map((item) => item.id);

// ✅ For exports
export const fetchData = async () => {};

// ❌ Avoid function keyword for new code
const oldStyle = function () {}; // OK for existing, but not for new
```

## Error Handling

### Always Use Try-Catch

```typescript
// ❌ NO
async function load() {
  return await fetch("/data");
}

// ✅ YES
async function load() {
  try {
    return await fetch("/data");
  } catch (error) {
    logger.error("Failed to load data", error);
    throw new AppError("Data load failed", 500);
  }
}
```

### Specify Error Types

```typescript
// ✅ Type your errors
catch (error: unknown) {
  if (error instanceof TypeError) {
    // Handle type error
  } else if (error instanceof NetworkError) {
    // Handle network error
  }
}
```

## Comments

### When NOT to Comment

```typescript
// ❌ DON'T: Comment obvious code
const age = 25; // Set age to 25

// ❌ DON'T: Comment what the code does (variable names should say that)
const u = getUserById(id); // Get user by ID

// ❌ DON'T: Comment todo items (use // TODO: instead)
// need to fix this // Use // TODO: need to fix
```

### When TO Comment

```typescript
// ✅ WHY - explain the reasoning
// EXCEPTION: Using deprecated API because newer version breaks legacy browsers
// TODO: Remove after browser support updated (see JIRA-123)

// ✅ Non-obvious business logic
// Users get 10% discount if they've been customers for 5+ years
// See PriceCalculation.md for formula
const discount = customer.yearsActive >= 5 ? 0.1 : 0;

// ✅ Temporary workarounds
// HACK: API returns wrong format from v2.0, strip quotes until fixed
const parsed = JSON.parse(response.replace(/"/g, ""));
```

## Type Safety in Practice

### Use Union Types

```typescript
// ✅ Model specific states
type Status = "idle" | "loading" | "success" | "error";

// ❌ Avoid boolean chains
// let isLoading = false;
// let hasError = false;
// // Now: which combinations are valid? All 4?
```

### Discriminated Unions

```typescript
// ✅ For complex state
type Result =
  | { status: "success"; data: User }
  | { status: "error"; message: string };

// Usage - compiler forces you handle both cases
if (result.status === "success") {
  console.log(result.data); // Only data exists, narrowed by discriminant
}
```

### Required vs Optional

```typescript
// ✅ Be explicit
interface User {
  id: string; // Required
  email: string; // Required
  phone?: string; // Optional
  nickname?: string | null; // Can be null or undefined
}

// ❌ Using undefined everywhere makes types unclear
interface UserBad {
  id?: string;
  email?: string;
  phone?: string;
}
```
