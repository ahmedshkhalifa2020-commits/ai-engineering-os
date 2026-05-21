## Mandatory Execution Flow

Before performing ANY task, the agent MUST:

1. Read AGENTS.md to determine the correct agent
2. Read RULES.md and all relevant files in `.claude/rules/`
3. Validate the task against:
   - Execution Contract
   - Definition of Done
   - Forbidden Behavior

If the task does not lead to real code execution → the agent MUST refuse to proceed.

---

## SDLC Governance

The AI Engineering OS enforces a structured lifecycle that prevents premature coding and preserves traceability.

### Required Phase Sequence

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

### Gate Rules

- Implementation cannot begin until architecture approval and TDD artifacts exist.
- Review cannot begin until implementation is complete and tests pass.
- Release cannot begin until review and security signoff are complete.
- Missing discovery, business rules, system boundaries, or use cases blocks progression.

### Workflow Modes

- **Lightweight mode:** for low-risk or prototype work. Enforces discovery, business analysis, planning, TDD, implementation, review, release.
- **Enterprise mode:** for complex or regulated work. Enforces all phases and formal gate validation.

---

# Project Rules — Always-Follow Guidelines

These rules apply to all code, all agents, and all features. They cannot be waived without explicit discussion.

---

## Universal Principles

### 1. Type Safety (No `any` Without Justification)

```typescript
// ❌ NEVER
const data: any = fetchData();

// ✅ ALWAYS
const data: UserData = fetchData();
// OR with explicit escape hatch:
const data: any = fetchData(); // @ts-ignore: legacy API returns untyped response
```

### 2. Test-Driven Development

- **Write tests first**, then implementation
- Minimum: **80% line coverage**
- Use `describe()` + `it()` for clarity
- Async tests must use `async/await` or return a Promise

```typescript
// ✅ GOOD
describe("User Component", () => {
  it("renders user name when provided", () => {
    // Test first, fails initially
    // Then implement to make it pass
  });
});
```

### 3. No Console Logs in Production Code

```typescript
// ❌ NEVER
console.log("Debug info");

// ✅ Use logger if available
logger.debug("Debug info");

// ✅ Or remove before committing
// console.log('temp debug');
```

### 4. Immutability by Default

```typescript
// ❌ AVOID
let user = { name: "John" };
user.name = "Jane"; // mutation

// ✅ PREFER
const user = { name: "John" };
const updatedUser = { ...user, name: "Jane" }; // new object
```

### 5. Error Handling is Mandatory

```typescript
// ❌ NO
async function fetchUser(id: string) {
  return await db.getUser(id);
}

// ✅ YES
async function fetchUser(id: string) {
  try {
    return await db.getUser(id);
  } catch (error) {
    logger.error(`Failed to fetch user ${id}`, error);
    throw new AppError("User not found", 404);
  }
}
```

---

## Next.js Specific Rules

### 1. File Structure

```
src/app/                     # App router directory
├── page.tsx                 # Route page
├── layout.tsx               # Route layout
├── error.tsx                # Error boundary
└── [slug]/
    └── page.tsx

src/components/              # Reusable components
├── Button.tsx
└── Header.tsx

src/lib/                      # Utilities
├── db.ts                     # Database queries
├── auth.ts                   # Authentication
└── utils.ts                  # Helpers
```

### 2. Server vs Client Components

```typescript
// ✅ Server component by default (no 'use client')
export default async function Page() {
  const data = await fetch('...'); // Server-side fetch OK
  return <div>{data}</div>;
}

// ✅ Client component when needed
'use client';
import { useState } from 'react';
export default function Button() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 3. No Inline Styles (Use CSS Modules)

```typescript
// ❌ AVOID
<div style={{ color: 'red' }}>Error</div>

// ✅ PREFER
<div className={styles.error}>Error</div>
// In Button.module.css:
.error { color: red; }
```

### 4. Environment Variables

```typescript
// ❌ NO
const apiKey = "sk-1234..."; // hardcoded secret

// ✅ YES (in .env.local)
// DATABASE_URL=postgres://...
const dbUrl = process.env.DATABASE_URL!; // ! = required

// ✅ For optional vars
const apiVersion = process.env.API_VERSION ?? "v1";
```

### 5. API Routes Security

```typescript
// ✅ Always validate input
export async function POST(req: Request) {
  const body = await req.json();

  // Validate
  if (!body.email || !isValidEmail(body.email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  // Authenticate
  const auth = await verifyAuth(req);
  if (!auth) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Process
  return Response.json({ success: true });
}
```

---

## Code Quality Checklist

Every merge request must satisfy ALL of these:

- [ ] TypeScript strict mode: `tsc --noEmit` passes
- [ ] Tests pass: `npm test` with 80%+ coverage
- [ ] Linting passes: `npm run lint`
- [ ] No console.log in production code
- [ ] Error handling for all async operations
- [ ] Documented API changes (if applicable)
- [ ] No hardcoded secrets or environment values
- [ ] Follows file structure conventions
- [ ] Accessibility basics checked (alt text, labels, etc.)

---

## Git Workflow

### Commit Message Format

```
<type>: <subject>

<body (optional)>

<footer (optional)>

Types:
  feat:     New feature
  fix:      Bug fix
  refactor: Code restructure (no behavior change)
  docs:     Documentation only
  test:     Test additions/changes
  chore:    Dependency updates, config changes
```

### Branch Naming

```
feat/add-user-auth        ✅
fix/login-error           ✅
docs/update-readme        ✅

feature-auth              ❌ (too vague)
fixing-stuff              ❌ (unclear)
```

---

## Security Rules

### 1. No Secrets in Code

- API keys: Environment variables only
- Database URLs: .env.local (never git)
- Auth tokens: Never logged or hardcoded

```bash
# .env.local (add to .gitignore)
DATABASE_URL=postgres://user:pass@host/db
API_KEY=sk-1234567890
```

### 2. Input Validation

```typescript
// ✅ ALWAYS validate
if (!email.includes("@")) {
  throw new Error("Invalid email");
}

if (age < 0 || age > 150) {
  throw new Error("Invalid age");
}
```

### 3. CORS Headers (for API routes)

```typescript
export async function POST(req: Request) {
  // Set appropriate CORS
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      process.env.ALLOWED_ORIGIN || "http://localhost:3000",
  };
  return Response.json({ data }, { headers });
}
```

---

## When Rules Are Broken

⚠️ **If an agent suggests breaking these rules:**

1. Point out the specific rule
2. Ask why the exception is needed
3. Document the exception with a comment explaining the trade-off
4. Example:

```typescript
// EXCEPTION: Using `any` because third-party lib returns untyped response
const result: any = legacyApi.call();

// EXCEPTION: Skipping test for this endpoint because it requires
// external service (TODO: mock service in test)
```

---

## References

- Next.js docs: `node_modules/next/dist/docs/`
- TypeScript handbook: https://www.typescriptlang.org/docs/
- Test patterns: `.claude/skills/tdd-workflow/`
- Workflow: [CLAUDE.md](./CLAUDE.md)
- Agent delegation: [AGENTS.md](./AGENTS.md)

---

## Execution Contract

Any task requested MUST result in:

1. File creation or modification inside the project
2. Working, runnable code (no pseudo-code)
3. No explanation-only responses

If no files are created or modified → the task is considered FAILED.

---

## Definition of Done

A task is NOT complete unless ALL of the following are satisfied:

- Code is written and placed in the correct folder
- Types are defined (TypeScript strict)
- Error handling is implemented
- Files are physically created or updated
- Code is ready to run (no placeholders)

If any of the above is missing → the task is INCOMPLETE.

---

## Forbidden Behavior

Agents MUST NOT:

- Provide explanation without implementation
- Skip file creation when code is required
- Mix planning and implementation in the same step
- Ignore rules inside `.claude/rules/`
- Produce pseudo-code instead of real code

---

## Universal Principles

### 1. Type Safety (No ny Without Justification)

` ypescript
// ❌ NEVER
const data: any = fetchData();

// ✅ ALWAYS
const data: UserData = fetchData();
// OR with explicit escape hatch:
const data: any = fetchData(); // @ts-ignore: legacy API returns untyped response
`

### 2. Test-Driven Development

- **Write tests first**, then implementation
- Minimum: **80% line coverage**
- Use describe() + it() for clarity
- Async tests must use sync/await or return a Promise

`	ypescript
// ✅ GOOD
describe("User Component", () => {
  it("renders user name when provided", () => {
    // Test first, fails initially
    // Then implement to make it pass
  });
});
`

### 3. No Console Logs in Production Code

` ypescript
// ❌ NEVER
console.log("Debug info");

// ✅ Use logger if available
logger.debug("Debug info");

// ✅ Or remove before committing
// console.log('temp debug');
`

### 4. Immutability by Default

` ypescript
// ❌ AVOID
let user = { name: "John" };
user.name = "Jane"; // mutation

// ✅ PREFER
const user = { name: "John" };
const updatedUser = { ...user, name: "Jane" }; // new object
`

### 5. Error Handling is Mandatory

` ypescript
// ❌ NO
async function fetchUser(id: string) {
return await db.getUser(id);
}

// ✅ YES
async function fetchUser(id: string) {
try {
return await db.getUser(id);
} catch (error) {
logger.error(\Failed to fetch user \\, error);
throw new AppError("User not found", 404);
}
}
`

---

## Next.js Specific Rules

### 1. File Structure

`
src/app/ # App router directory
├── page.tsx # Route page
├── layout.tsx # Route layout
├── error.tsx # Error boundary
└── [slug]/
└── page.tsx

src/components/ # Reusable components
├── Button.tsx
└── Header.tsx

src/lib/ # Utilities
├── db.ts # Database queries
├── auth.ts # Authentication
└── utils.ts # Helpers
`

### 2. Server vs Client Components

` ypescript
// ✅ Server component by default (no 'use client')
export default async function Page() {
const data = await fetch('...'); // Server-side fetch OK
return <div>{data}</div>;
}

// ✅ Client component when needed
'use client';
import { useState } from 'react';
export default function Button() {
const [count, setCount] = useState(0);
return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
`

### 3. No Inline Styles (Use CSS Modules)

` ypescript
// ❌ AVOID

<div style={{ color: 'red' }}>Error</div>

// ✅ PREFER

<div className={styles.error}>Error</div>
// In Button.module.css:
.error { color: red; }
`

### 4. Environment Variables

` ypescript
// ❌ NO
const apiKey = "sk-1234..."; // hardcoded secret

// ✅ YES (in .env.local)
// DATABASE_URL=postgres://...
const dbUrl = process.env.DATABASE_URL!; // ! = required

// ✅ For optional vars
const apiVersion = process.env.API_VERSION ?? "v1";
`

### 5. API Routes Security

` ypescript
// ✅ Always validate input
export async function POST(req: Request) {
const body = await req.json();

// Validate
if (!body.email || !isValidEmail(body.email)) {
return Response.json({ error: "Invalid email" }, { status: 400 });
}

// Authenticate
const auth = await verifyAuth(req);
if (!auth) {
return Response.json({ error: "Unauthorized" }, { status: 401 });
}

// Process
return Response.json({ success: true });
}
`

---

## Code Quality Checklist

Every merge request must satisfy ALL of these:

- [ ] TypeScript strict mode: \ sc --noEmit\ passes
- [ ] Tests pass: \
      pm test\ with 80%+ coverage
- [ ] Linting passes: \
      pm run lint\
- [ ] No console.log in production code
- [ ] Error handling for all async operations
- [ ] Documented API changes (if applicable)
- [ ] No hardcoded secrets or environment values
- [ ] Follows file structure conventions
- [ ] Accessibility basics checked (alt text, labels, etc.)

---

## Git Workflow

### Commit Message Format

\\\
<type>: <subject>

<body (optional)>

<footer (optional)>

Types:
feat: New feature
fix: Bug fix
refactor: Code restructure (no behavior change)
docs: Documentation only
test: Test additions/changes
chore: Dependency updates, config changes
\\\

### Branch Naming

\\\
feat/add-user-auth ✅
fix/login-error ✅
docs/update-readme ✅

feature-auth ❌ (too vague)
fixing-stuff ❌ (unclear)
\\\

---

## Security Rules

### 1. No Secrets in Code

- API keys: Environment variables only
- Database URLs: .env.local (never git)
- Auth tokens: Never logged or hardcoded

\\\ash

# .env.local (add to .gitignore)

DATABASE_URL=postgres://user:pass@host/db
API_KEY=sk-1234567890
\\\

### 2. Input Validation

\\\ ypescript
// ✅ ALWAYS validate
if (!email.includes("@")) {
throw new Error("Invalid email");
}

if (age < 0 || age > 150) {
throw new Error("Invalid age");
}
\\\

### 3. CORS Headers (for API routes)

\\\ ypescript
export async function POST(req: Request) {
// Set appropriate CORS
const headers = {
"Content-Type": "application/json",
"Access-Control-Allow-Origin":
process.env.ALLOWED_ORIGIN || "http://localhost:3000",
};
return Response.json({ data }, { headers });
}
\\\

---

## When Rules Are Broken

⚠️ **If an agent suggests breaking these rules:**

1. Point out the specific rule
2. Ask why the exception is needed
3. Document the exception with a comment explaining the trade-off
4. Example:

\\\ ypescript
// EXCEPTION: Using \ny\ because third-party lib returns untyped response
const result: any = legacyApi.call();

// EXCEPTION: Skipping test for this endpoint because it requires
// external service (TODO: mock service in test)
\\\

---

## References

- Next.js docs: \
  ode_modules/next/dist/docs/\
- TypeScript handbook: https://www.typescriptlang.org/docs/
- Test patterns: \.claude/skills/tdd-workflow/\
- Workflow: [CLAUDE.md](./CLAUDE.md)
- Agent delegation: [AGENTS.md](./AGENTS.md)

---

## Execution Contract

Any task requested MUST result in:

1. File creation or modification inside the project
2. Working, runnable code (no pseudo-code)
3. No explanation-only responses

If no files are created or modified → the task is considered FAILED.

---

## Definition of Done

A task is NOT complete unless ALL of the following are satisfied:

- Code is written and placed in the correct folder
- Types are defined (TypeScript strict)
- Error handling is implemented
- Files are physically created or updated
- Code is ready to run (no placeholders)

If any of the above is missing → the task is INCOMPLETE.

---

## Forbidden Behavior

Agents MUST NOT:

- Provide explanation without implementation
- Skip file creation when code is required
- Mix planning and implementation in the same step
- Ignore rules inside \.claude/rules/\
- Produce pseudo-code instead of real code
