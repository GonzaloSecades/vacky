# Vacky SpacetimeDB Migration Context

Reviewed: 2026-04-24

This is the repo-local context note for SpacetimeDB migration work. It complements the official docs and should not override them.

## Primary Local Inputs

- Plan: `docs/superpowers/plans/2026-04-23-spacetimedb-adoption-for-vacky.md`
- Operator guide: `brain/Operator/query/spacetimedb-vacky-guide.md`
- Repo guardrails: `AGENTS.md`

## Current Baseline

Today Vacky is a Next.js 16 App Router app using:

- Prisma + Postgres for persisted data
- `next-auth` v5 beta with GitHub login
- UploadThing for uploads
- Google Maps, Places, and geocoding

The migration branch goal is not a sidecar experiment. It is a full replacement spike where SpacetimeDB becomes the only persisted backend.

## Local-Only Runtime Policy

This branch is local-instance-only for SpacetimeDB development.

- Use `http://localhost:3000` as the SpacetimeDB server target.
- Use anonymous local identities for module publish and local development unless a later branch-specific decision says otherwise.
- Do not use Maincloud, hosted deployment defaults, or cloud-oriented login flows in branch scripts or migration docs.

## Working Architecture Assumption

Until a later decision replaces it, treat this as the migration default:

- SpacetimeDB owns persistent tables, indexes, reducers, views, and transactional data rules.
- Next.js owns HTTP forms, route handlers, server actions, redirects, secure cookies, password hashing, and email delivery.
- Generated bindings are the typed contract between the app and the module.

## Known Tensions

### 1. Native SpacetimeDB auth vs Vacky first-party auth

The official SpacetimeDB auth model is OIDC-based.

The migration plan instead proposes:

- app-owned email/password auth
- email verification
- cookie sessions issued by Next.js

Do not blur these together. If Vacky keeps first-party auth, document clearly how Next.js session state maps to SpacetimeDB identity and authorization decisions.

### 2. Reducers vs procedures

Reducers are the normal transactional write path and should remain the default.

Procedures can do external I/O, but the docs still describe them as beta. That is why the current migration plan keeps email delivery and other outward side effects in Next.js.

### 3. Private-by-default data exposure

Auth rows, sessions, verification tokens, and any secret-bearing records should stay private. Expose client-safe data through public views or explicitly public safe tables only.

### 4. Version drift risk

Docs reviewed for this prep pack show `Version 2.0.0`, while GitHub releases show `v2.1.0` on 2026-03-24. Validate suspicious examples against generated bindings before trusting them.

## Recommended Initial File Layout

- `spacetimedb/package.json`
- `spacetimedb/tsconfig.json`
- `spacetimedb/src/index.ts`
- `lib/spacetimedb/client.ts`
- `lib/spacetimedb/server.ts`
- `lib/spacetimedb/types.ts`
- `lib/spacetimedb/auth.ts`
- `lib/spacetimedb/errors.ts`
- `lib/auth/password.ts`
- `lib/auth/session.ts`
- `lib/auth/email-verification.ts`
- `lib/email/send-verification-email.ts`

Pick one generated bindings directory and keep it stable for the whole branch.

## Verification Expectations

- `spacetime generate` is part of normal development, not an optional cleanup step.
- Browser verification matters because subscriptions and connection lifecycle bugs are easy to miss in static code review.
- Keep brain updates on the same branch if the migration changes architecture, risks, or workflow guidance.
- Local module validation should explicitly target `http://localhost:3000`, not a CLI default server.
