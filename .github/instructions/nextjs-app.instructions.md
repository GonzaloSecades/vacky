---
applyTo: "app/**/*.ts,app/**/*.tsx,components/**/*.tsx,lib/actions/**/*.ts,auth.ts"
---

This repository uses Next.js 16 App Router semantics, not older Pages Router assumptions.

- Preserve Server Component defaults.
- Only use `'use client'` where hooks, state, browser APIs, drag-and-drop, maps, or other client-only behavior require it.
- Flag any change that moves data fetching from server boundaries to the client without a clear reason.
- Flag hydration risks, especially if browser-only state changes markup, class names, or layout before hydration.
- When a change touches routing, rendering, data fetching, or server/client boundaries, expect the implementation to follow the repository guidance in `AGENTS.md`.
- Root layout, nested layouts, route handlers, and server actions are high-signal places for regressions. Review them carefully.
- Prefer `next/navigation` patterns that match App Router usage already present in the repository.
- For authenticated routes and server actions, verify redirects and auth checks happen on the server boundary.
