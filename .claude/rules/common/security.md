---
title: "Security Fundamentals"
description: "Essential security practices for all code"
tags: [security, auth, secrets]
---

# Security Rules

## 1. Never Commit Secrets

### .env.local (Never Git Commit)

```bash
# .env.local (add to .gitignore)
DATABASE_URL=postgres://user:password@host/db
API_KEY=sk-1234567890
JWT_SECRET=super-secret-key-never-share

# ✅ Good: git will not track
# ❌ Bad: if committed, secret is in git history forever
```

### Check Before Committing

```bash
# ✅ Before git push, check for secrets
grep -r "sk-\|ghp_\|AKIA" src/ app/

# ✅ Use pre-commit hooks to catch secrets
npm install husky lint-staged --save-dev
```

## 2. Validate All Input

### User Input

```typescript
// ❌ NEVER trust user input
const userId = req.query.id; // Could be anything
const user = await db.user.findUnique({ where: { id: userId } });

// ✅ ALWAYS validate
import { z } from "zod";

const idSchema = z.string().uuid();
const userId = idSchema.parse(req.query.id); // Throws if invalid
const user = await db.user.findUnique({ where: { id: userId } });
```

### Email Validation

```typescript
const emailSchema = z.string().email();

try {
  const email = emailSchema.parse(userInput);
  // Safe to use
} catch (error) {
  return { error: "Invalid email" };
}
```

### SQL Injection Prevention

```typescript
// ❌ NEVER concatenate SQL
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ ALWAYS use parameterized queries
const user = await db.user.findUnique({
  where: { email }, // Prisma handles parameterization
});

// ✅ If raw SQL needed
const user = await db.$queryRaw`
  SELECT * FROM users WHERE email = ${email}
`; // $ prefix = parameterized
```

## 3. Authentication & Authorization

### Never Store Passwords

```typescript
// ❌ NEVER store plaintext
await db.user.create({
  email,
  password: userPassword, // ❌ HACKED
});

// ✅ ALWAYS hash
import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash(userPassword, 10);
await db.user.create({
  email,
  passwordHash: hashedPassword,
});

// ✅ Compare correctly
const isValid = await bcrypt.compare(inputPassword, user.passwordHash);
```

### Authentication Check

```typescript
// ✅ Every protected route
export async function GET(req: NextRequest) {
  const auth = await verifyAuth(req);

  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Safe to proceed
}
```

### Session Security

```typescript
// ✅ Use secure session library
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  // ...
};

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <div>{children}</div>;
}
```

## 4. CORS and Headers

### API Security Headers

```typescript
// src/app/api/users/route.ts
export async function POST(req: NextRequest) {
  // ✅ Set security headers
  const headers = {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Access-Control-Allow-Origin":
      process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Credentials": "true",
  };

  return NextResponse.json(data, { headers });
}
```

## 5. Secrets in Environment

### Public vs Secret

```typescript
// ✅ PUBLIC: Safe to expose to frontend
process.env.NEXT_PUBLIC_API_URL; // Visible in browser

// ❌ SECRET: Only server-side
process.env.DATABASE_URL; // NEVER in NEXT_PUBLIC_
process.env.API_KEY; // NEVER in NEXT_PUBLIC_
process.env.JWT_SECRET; // NEVER in NEXT_PUBLIC_

// ✅ Use correctly
// If you need JS on browser, send data from server, not the key
```

## 6. Error Messages

### Don't Leak Information

```typescript
// ❌ EXPOSING
export async function GET(req: NextRequest) {
  try {
    return await db.user.findUnique({ where: { id: "bad" } });
  } catch (error) {
    return NextResponse.json({
      error: error.message, // Database errors exposed!
    });
  }
}

// ✅ GENERIC
export async function GET(req: NextRequest) {
  try {
    return await db.user.findUnique({ where: { id: "bad" } });
  } catch (error) {
    // Log internally
    logger.error("DB error:", error);

    // Return generic message
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}
```

## 7. Rate Limiting

### Prevent Brute Force Attacks

```typescript
// ✅ Use rate limiter
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 requests per hour
});

export async function POST(req: NextRequest) {
  const { success } = await ratelimit.limit(req.ip || "anonymous");

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Process request
}
```

## 8. HTTPS Only

### Ensure Encryption

```typescript
// ✅ In middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // ✅ Force HTTPS in production
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get("host")}${request.nextUrl.pathname}`,
      { status: 301 },
    );
  }

  return NextResponse.next();
}
```

## Security Checklist

Before deploying, verify:

- [ ] No secrets hardcoded
- [ ] All inputs validated
- [ ] All passwords hashed
- [ ] All API routes authenticate
- [ ] CORS headers set
- [ ] Rate limiting enabled
- [ ] Error messages are generic
- [ ] HTTPS enforced in production
- [ ] Dependencies updated (`npm audit`)
- [ ] No console.log of sensitive data
