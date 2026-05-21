---
title: "Next.js App Router Conventions"
description: "Next.js 15+ app directory patterns and best practices"
tags: [nextjs, app-router, typescript]
---

# Next.js Rules

## File Structure

```
src/
├── app/                              # App Router (Next.js 13+)
│   ├── page.tsx                      # Route: /
│   ├── layout.tsx                    # Root layout (wraps all pages)
│   ├── error.tsx                     # Error boundary
│   ├── not-found.tsx                 # 404 page
│   │
│   ├── dashboard/
│   │   ├── page.tsx                  # Route: /dashboard
│   │   ├── layout.tsx                # Dashboard layout
│   │   └── [id]/
│   │       └── page.tsx              # Route: /dashboard/[id]
│   │
│   └── api/
│       ├── users/
│       │   ├── route.ts              # POST /api/users
│       │   └── [id]/
│       │       └── route.ts          # GET /api/users/[id]
│       └── health/
│           └── route.ts              # GET /api/health
│
├── components/                       # Reusable React components
│   ├── Button.tsx
│   ├── Header.tsx
│   └── [feature]/
│       └── Feature.tsx
│
├── lib/                              # Business logic & utilities
│   ├── db.ts                         # Database client
│   ├── auth.ts                       # Authentication logic
│   ├── validation.ts                 # Input validators
│   └── utils.ts                      # Helper functions
│
└── types/                            # Shared type definitions (alternative to inline)
    └── index.ts
```

## Server vs Client Components

### Default: Server Component

```typescript
// src/app/dashboard/page.tsx
// ✅ NO 'use client' = Server Component

import { getUser } from '@/lib/db';

export default async function DashboardPage() {
  // ✅ Can await
  const user = await getUser(params.id);

  // ✅ Can access secrets
  const dbUrl = process.env.DATABASE_URL;

  // ✅ Can do server-only operations
  return <div>{user.name}</div>;
}
```

### Client Component: Only When Needed

```typescript
// src/components/UploadButton.tsx
'use client';

import { useState } from 'react';

export function UploadButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // ✅ Can use hooks
  return (
    <input
      type="file"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
    />
  );
}
```

### Server Action (Server Component → Client)

```typescript
// src/lib/actions.ts
'use server';

import { db } from '@/lib/db';

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string;

  // ✅ Server-only code
  await db.user.create({ email });

  // ✅ Return data to client
  return { success: true };
}

// --- In Client Component ---
// src/components/SignUpForm.tsx
'use client';

import { createUser } from '@/lib/actions';

export function SignUpForm() {
  return (
    <form action={createUser}>
      <input name="email" type="email" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

## API Routes

### Structure: `src/app/api/[route]/route.ts`

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ✅ Type all handlers
export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Always validate input
    const body = await request.json();

    if (!body.email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const user = await db.user.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}

// src/app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}
```

## Environment Variables

```typescript
// ✅ Define in .env.local
// DATABASE_URL=postgres://...
// API_KEY=sk-...
// NEXT_PUBLIC_API_URL=https://api.example.com

// ✅ Use with defaults
const dbUrl = process.env.DATABASE_URL!; // Required (! = assert)
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"; // Optional

// ❌ NO hardcoded values
const secret = "sk-1234"; // SECURITY ISSUE

// ❌ NO secrets in NEXT_PUBLIC_*
process.env.NEXT_PUBLIC_SECRET; // Browser can read this!
```

## Metadata and SEO

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "App description",
};

// src/app/blog/[slug]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  // Component
}
```

## Image Optimization

```typescript
import Image from 'next/image';

// ✅ USE Next.js Image component
<Image
  src="/hero.png"
  alt="Hero image"
  width={1200}
  height={600}
  priority
/>

// ❌ AVOID native img tag
<img src="/hero.png" alt="Hero image" />
```

## No CSS-in-JS (Use Modules)

```typescript
// ✅ CSS Modules (static)
import styles from './Button.module.css';

export function Button() {
  return <button className={styles.primary}>Click me</button>;
}

// ❌ AVOID inline styles
<button style={{ backgroundColor: 'blue' }}>Click me</button>

// ❌ AVOID styled-components (adds JS overhead)
import styled from 'styled-components';
const StyledButton = styled.button`...`;
```

## Dynamic Imports (Code Splitting)

```typescript
import dynamic from 'next/dynamic';

// ✅ Load component only when needed
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
});

export function Page() {
  return <HeavyComponent />;
}
```

## Error Handling with Error Boundary

```typescript
// src/app/layout.tsx or any directory
// error.tsx - Catches errors in this segment

'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Error:', error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

## Middleware

```typescript
// middleware.ts (root level)
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // ✅ Check auth
  const token = request.cookies.get("auth-token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

## Common Pitfalls

### ❌ Fetching in useEffect (Client Component with async)

```typescript
// ❌ AVOID
'use client';
export function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers);
  }, []);

  return <div>{users.map(u => u.name)}</div>;
}
```

### ✅ Fetch in Server Component

```typescript
// ✅ BETTER
export default async function UserList() {
  const users = await fetch('http://localhost:3000/api/users').then(r => r.json());
  return <div>{users.map(u => u.name)}</div>;
}
```

### ❌ Passing Server Data Through Props

```typescript
// ❌ AVOID: User data visible to browser
export default async function Page() {
  const user = await getUser();
  return <Dashboard user={user} />; // User data serialized to browser
}
```

### ✅ Use Server Component

```typescript
// ✅ BETTER
export default async function Page() {
  const user = await getUser();
  return <ServerDashboard user={user} />; // Never leaves server
}
```
