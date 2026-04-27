# Step 01: Foundation

## What changed

- Established the migration execution trail under `brain/raw/2026-04-25-spacetimedb-migration/`.
- Added a compatibility session facade in `lib/auth/session.ts` so app call sites can stop depending directly on `@/auth`.
- Added app-local trip and location types in `lib/spacetimedb/types.ts` so UI code can stop importing Prisma models directly.

## How

- Wrapped the legacy `next-auth` session behind `getSession()` and `requireSession()`.
- Introduced app-local domain mappers that convert current Prisma rows into stable app-facing types.
- Captured the migration as an execution artifact instead of letting the state live only in chat.

## Why

- The migration needs narrower interfaces before the underlying auth and data implementations can change safely.
- Direct imports from `@/auth` and Prisma-generated models would otherwise force large, repeated edits later in the branch.

## Checkpoints

- [x] C1 create the dedicated worktree/branch and lock Node 22 plus SpacetimeDB CLI assumptions
- [x] C2 freeze the migration source pack and operator guide as required references
- [x] C3 inventory all Prisma, NextAuth, Docker Postgres, generated Prisma type, and auth-touching entrypoints
- [x] C4 define the per-step raw-doc template and verification template
- [ ] C5 confirm baseline lint/build and record current runtime behavior that must survive the migration

## Risks

- The compatibility session layer still depends on `next-auth` internally until the new auth core lands.
- App-local domain types still map from Prisma rows for now; the single remaining Prisma dependency has been narrowed, not removed.

## Verification

- Pending fresh baseline `lint` and `build`.
