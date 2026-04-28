# SpacetimeDB Full Migration Spike For Vacky Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a separate Vacky branch/worktree that removes Prisma, Postgres, Docker Postgres, and NextAuth, makes SpacetimeDB the only persisted data backend, and lands first-party email/password auth with email verification.

**Architecture:** Vacky will use SpacetimeDB for all persistent application data and database-side business logic. Next.js remains the web shell for pages, forms, route handlers, secure cookie/session delivery, password hashing, and email delivery. Reducers own transactional state changes, views expose safe read models, and procedures are avoided for core auth because the current SpacetimeDB docs mark procedures as beta and reducers cannot perform network I/O.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, SpacetimeDB 2.0 TypeScript module, generated TypeScript bindings, Argon2id password hashing, server-side email sending, HTTP-only cookie sessions

---

## Scope And Intent

This is not a sidecar integration plan.

This is a **full migration spike** in a separate worktree whose purpose is:

- to onboard SpacetimeDB early while the app is still small
- to force Vacky’s data model and future features to fit SpacetimeDB’s model now
- to keep the current Prisma/Postgres branch intact as the fallback baseline
- to evaluate whether SpacetimeDB is a better foundation for Vacky’s next phase than the current CRUD-oriented stack

The migration branch should behave like “the app now runs on SpacetimeDB,” not “the app still runs on Prisma with some realtime experiments.”

## Product Stories In Scope

Stage 2 auth must support these stories:

- New user clicks sign up.
- User enters full name, country, email, and password.
- User receives an email to confirm sign up.
- User is created in the database.
- Password storage is robust and one-way; no plaintext and no reversible encryption.

Explicitly out of scope for this branch:

- social login
- password reset / restore password
- production-hard multi-provider auth abstraction

## Core Technical Decision

All persistent tables and schemas move to SpacetimeDB.

That includes:

- auth tables
- trip and location tables
- session tables
- verification token tables
- any future feature tables added on this branch

Next.js still owns the HTTP app boundary because:

- reducers are transactional but cannot call external services such as email providers or other APIs
- SpacetimeDB procedures can do external I/O, but the official docs currently mark procedures as beta
- HTTP-only cookie issuance/clearing and browser redirects belong naturally in the web app layer

Sources:

- [database modules](https://spacetimedb.com/docs/databases/)
- [reducers](https://spacetimedb.com/docs/functions/reducers/)
- [procedures](https://spacetimedb.com/docs/functions/procedures/)
- [functions overview](https://spacetimedb.com/docs/functions/)
- [access permissions](https://spacetimedb.com/docs/tables/access-permissions)

## Two-Stage Delivery

### Stage 1: Full Technical Migration

Remove the current DB/backend stack and make SpacetimeDB the main backend.

This stage includes:

- remove Prisma
- remove Prisma-generated client usage
- remove Postgres/Docker Postgres integration
- remove NextAuth and GitHub auth
- move all persistent schemas to SpacetimeDB
- convert app data access to SpacetimeDB reducers/views/bindings
- keep the app operational with a temporary minimal auth/session path if needed

### Stage 2: First-Party Auth And Onboarding

Build robust Vacky-owned auth on top of SpacetimeDB-backed tables.

This stage includes:

- email/password sign up
- email verification
- secure sign in/sign out
- session storage and revocation support
- private vs public data exposure rules

## Recommended File Structure

### Remove Or Retire From The Migration Branch

- `auth.ts`
- `app/db.ts`
- `prisma/schema.prisma`
- `prisma/`
- `docker-compose.yml`
- `scripts/pre-dev.mjs`
- `app/api/auth/[...nextAuth]/route.ts`
- any Prisma-specific imports in `app/`, `components/`, and `lib/actions/`

### Create For SpacetimeDB

- `spacetimedb/package.json`
- `spacetimedb/tsconfig.json`
- `spacetimedb/src/index.ts`
- `src/module_bindings/` or `lib/spacetimedb/module_bindings/`
- `lib/spacetimedb/client.ts`
- `lib/spacetimedb/server.ts`
- `lib/spacetimedb/types.ts`
- `lib/spacetimedb/auth.ts`
- `lib/spacetimedb/errors.ts`

### Create For First-Party Auth

- `app/(auth)/sign-up/page.tsx`
- `app/(auth)/sign-in/page.tsx`
- `app/(auth)/verify-email/page.tsx`
- `app/api/auth/sign-up/route.ts`
- `app/api/auth/sign-in/route.ts`
- `app/api/auth/sign-out/route.ts`
- `app/api/auth/verify-email/route.ts`
- `lib/auth/password.ts`
- `lib/auth/session.ts`
- `lib/auth/email-verification.ts`
- `lib/email/send-verification-email.ts`

### Modify Existing App Surfaces

- `app/layout.tsx`
- `app/page.tsx`
- `app/trips/page.tsx`
- `app/trips/[tripId]/page.tsx`
- `app/trips/[tripId]/itinerary/new/page.tsx`
- `app/trips/[tripId]/itinerary/edit/page.tsx`
- `app/globe/page.tsx`
- `components/tripDetail.tsx`
- `components/itinerary-planner.tsx`
- `components/sortable-itinerary.tsx`
- `app/api/trips/route.ts` or replace/remove it if direct SpacetimeDB reads make it unnecessary

### Brain And Operator Deliverables

- Modify: `brain/wiki/architecture/data-and-auth.md`
- Modify: `brain/wiki/now.md`
- Modify: `brain/wiki/log.md`
- Modify: `brain/wiki/risks.md`
- Create: `brain/wiki/decisions/2026-04-23-spacetimedb-full-migration-spike.md`
- Create: `brain/Operator/query/spacetimedb-vacky-guide.md`
- Modify: `brain/Operator/README.md`
- Modify: `brain/wiki/index.md` only if the new decision/operator guide should be linked there

## Target SpacetimeDB Schema

The exact row contents can evolve, but Stage 1 and Stage 2 should establish at least these tables:

- `user_account`
- `session`
- `email_verification_token`
- `trip`
- `location`

Recommended supporting tables:

- `auth_audit_event`
- `country`
- `trip_member` if collaboration is likely soon

Recommended privacy model:

- keep auth-sensitive tables private by default
- expose public/read-safe data through views
- never expose password hashes, verification token hashes, or session secrets via public tables or public views

Recommended auth columns:

- `user_account`
  - `id`
  - `email` with unique constraint
  - `full_name`
  - `country`
  - `password_hash`
  - `email_verified_at`
  - `created_at`
  - `updated_at`
- `session`
  - `id`
  - `user_id`
  - `token_hash`
  - `expires_at`
  - `created_at`
  - `revoked_at`
- `email_verification_token`
  - `id`
  - `user_id`
  - `email`
  - `token_hash`
  - `expires_at`
  - `consumed_at`
  - `created_at`

## Security Rules

- Do not encrypt passwords for later decryption.
- Hash passwords one-way with `Argon2id`.
- Use a per-password salt through the hashing library.
- Hash verification and session tokens before storage if the raw token is sent to the browser or email.
- Use HTTP-only cookies for session transport.
- Enforce email uniqueness and user ownership at the server boundary and in SpacetimeDB reducer logic.
- Keep auth tables private in SpacetimeDB unless a view intentionally exposes a safe projection.

## Stage 1 Tasks

### Task 1: Remove Prisma, Postgres, NextAuth, And GitHub Auth From The Branch

**Files:**
- Delete or retire: `auth.ts`
- Delete or retire: `app/db.ts`
- Delete or retire: `prisma/`
- Delete or retire: `docker-compose.yml`
- Delete or retire: `scripts/pre-dev.mjs`
- Delete or retire: `app/api/auth/[...nextAuth]/route.ts`
- Modify: `package.json`
- Modify: any files importing `@/app/db`, `@/auth`, or Prisma types

- [ ] Remove Prisma, Prisma client generation, and Prisma adapters from `package.json`.
- [ ] Remove NextAuth and GitHub provider dependencies.
- [ ] Remove Docker Postgres scripts and local database setup commands.
- [ ] Replace auth/data imports throughout the app so the branch no longer depends on Prisma or NextAuth.
- [ ] Keep the migration branch buildable after each dependency removal wave.

**Exit criteria:**
- No runtime code imports Prisma or NextAuth.
- The branch no longer assumes Docker Postgres or Neon.

### Task 2: Scaffold The SpacetimeDB Module As The Only Data Backend

**Files:**
- Create: `spacetimedb/package.json`
- Create: `spacetimedb/tsconfig.json`
- Create: `spacetimedb/src/index.ts`
- Modify: `package.json`
- Create: generated bindings output directory

- [ ] Add SpacetimeDB CLI/dev/generate scripts.
- [ ] Follow the official TypeScript project layout with module code in `spacetimedb/src/index.ts`.
- [ ] Pick one generated bindings directory and keep it stable.
- [ ] Document how local app development runs against local SpacetimeDB.

**Verification:**
- `spacetime dev` works locally.
- module publish/generation works locally.

### Task 3: Recreate The Full Vacky Data Model In SpacetimeDB

**Files:**
- Create: `spacetimedb/src/index.ts`
- Create: `lib/spacetimedb/types.ts`
- Review: current removed/retired Prisma schema concepts

- [ ] Define private auth tables and public/read-safe product tables or views.
- [ ] Port `Trip` and `Location` semantics, including itinerary date/order behavior.
- [ ] Add unique and indexed columns required for lookup patterns such as:
  - email lookup
  - session lookup
  - verification lookup
  - trip-by-user lookup
  - location-by-trip lookup
  - location-by-trip-and-scheduled-day lookup
- [ ] Preserve Vacky’s current ownership model in the new schema and reducer access patterns.

**Exit criteria:**
- The branch can represent all current Vacky persisted concepts without Prisma.

### Task 4: Rebuild Current Reads And Writes On Top Of Reducers And Views

**Files:**
- Create: `lib/spacetimedb/client.ts`
- Create: `lib/spacetimedb/server.ts`
- Create: `lib/spacetimedb/errors.ts`
- Modify: `lib/actions/get-all-trips.ts`
- Modify: `lib/actions/get-trip-by-id.ts`
- Modify: `lib/actions/create-trip.ts`
- Modify: `lib/actions/itinerary.ts`
- Modify: `lib/actions/reorder-itinerary.ts`
- Modify: `app/api/trips/route.ts`

- [ ] Convert state-changing operations to SpacetimeDB reducers.
- [ ] Convert server reads to views, safe table subscriptions, or server-side SpacetimeDB access helpers.
- [ ] Keep the current itinerary validation behavior as the contract unless intentionally changed.
- [ ] Remove Prisma-style ORM assumptions from server actions and route handlers.
- [ ] Decide case-by-case whether a Next.js route handler is still needed or whether the UI can talk to SpacetimeDB more directly.

**Exit criteria:**
- Trip list, trip detail, itinerary create/edit, reorder, and globe data all work from SpacetimeDB-backed data.

### Task 5: Temporary Minimal Auth Gate For Stage 1 Continuity

**Files:**
- Create or modify: `lib/spacetimedb/auth.ts`
- Modify: `app/layout.tsx`
- Modify: protected pages/routes

- [ ] Add the smallest temporary auth/session mechanism needed to keep the migrated app usable before Stage 2 completes.
- [ ] Keep this mechanism clearly marked transitional in comments and brain docs.
- [ ] Avoid writing throwaway abstractions that make Stage 2 harder.

**Exit criteria:**
- The migrated branch is usable enough to continue Stage 2 work.

## Stage 2 Tasks

### Task 6: Build The First-Party Email/Password Data Model

**Files:**
- Modify: `spacetimedb/src/index.ts`
- Create: `lib/auth/password.ts`
- Create: `lib/auth/session.ts`
- Create: `lib/auth/email-verification.ts`

- [ ] Add `user_account`, `session`, and `email_verification_token` tables with the constraints described above.
- [ ] Use private tables for sensitive auth rows.
- [ ] Add public views only for safe projections such as “current user profile”.
- [ ] Ensure user creation and token issuance logic can be implemented with reducers and safe Next.js orchestration.

**Exit criteria:**
- The schema fully supports sign up, sign in, sign out, and verify-email.

### Task 7: Implement Secure Password Handling

**Files:**
- Create: `lib/auth/password.ts`
- Modify: auth route handlers

- [ ] Hash passwords with `Argon2id`.
- [ ] Never log, store, or return plaintext passwords.
- [ ] Verify passwords using hash comparison only.
- [ ] Keep password policy simple but explicit for the beta branch.

**Exit criteria:**
- Passwords are one-way hashed and verifiable only by comparison.

### Task 8: Implement Sign Up And Email Verification

**Files:**
- Create: `app/(auth)/sign-up/page.tsx`
- Create: `app/api/auth/sign-up/route.ts`
- Create: `app/api/auth/verify-email/route.ts`
- Create: `app/(auth)/verify-email/page.tsx`
- Create: `lib/email/send-verification-email.ts`
- Create: `lib/auth/email-verification.ts`

- [ ] Accept full name, country, email, and password.
- [ ] Hash the password before persistence.
- [ ] Create the user row and verification token row.
- [ ] Send a verification email from Next.js server code.
- [ ] Mark the account verified when a valid token is redeemed.
- [ ] Handle expired, missing, or already-consumed verification tokens cleanly.

**Exit criteria:**
- The sign-up story works end-to-end.

### Task 9: Implement Sign In, Sign Out, And Session Cookies

**Files:**
- Create: `app/(auth)/sign-in/page.tsx`
- Create: `app/api/auth/sign-in/route.ts`
- Create: `app/api/auth/sign-out/route.ts`
- Modify: `lib/auth/session.ts`
- Modify: protected route/page guards

- [ ] Create revocable server-managed sessions backed by SpacetimeDB.
- [ ] Store only hashed session token material in the database if the browser receives the raw token.
- [ ] Issue and clear secure HTTP-only cookies from Next.js.
- [ ] Require verified email before allowing normal authenticated use unless the branch intentionally allows pre-verification sign-in.
- [ ] Replace all former NextAuth route-level assumptions with Vacky-owned session checks.

**Exit criteria:**
- User can sign in and out using only first-party auth.

### Task 10: Reconnect The Product Surface To The New Auth Layer

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/trips/page.tsx`
- Modify: `app/trips/new/page.tsx`
- Modify: `app/trips/[tripId]/page.tsx`
- Modify: `app/settings/page.tsx`
- Modify: navbar/account UI files

- [ ] Replace GitHub-login language and flows with first-party Vacky auth.
- [ ] Re-check route protection consistency across `/trips`, `/trips/new`, `/settings`, `/globe`, and itinerary routes.
- [ ] Remove any stale provider-specific assumptions from UI labels and settings.

**Exit criteria:**
- The product surface reflects email/password auth only.

## Brain And Operator Tasks

### Task 11: Record The Architecture Shift In The Brain

**Files:**
- Modify: `brain/wiki/architecture/data-and-auth.md`
- Modify: `brain/wiki/now.md`
- Modify: `brain/wiki/log.md`
- Modify: `brain/wiki/risks.md`
- Create: `brain/wiki/decisions/2026-04-23-spacetimedb-full-migration-spike.md`

- [ ] Replace the current Prisma/Postgres/NextAuth architecture description with the new SpacetimeDB + first-party auth shape once implementation lands.
- [ ] Record the migration branch intent and why the repo now has a separated “legacy baseline” and “SpacetimeDB migration” path.
- [ ] Add or update risks for auth, email delivery, token handling, and any loss of Prisma-era safeguards.
- [ ] Capture the decision that Vacky deliberately chose full migration instead of sidecar adoption.

### Task 12: Add An Operator Guide For Coding Against SpacetimeDB In Vacky

**Files:**
- Create: `brain/Operator/query/spacetimedb-vacky-guide.md`
- Modify: `brain/Operator/README.md`

- [ ] Write a concrete operator guide that explains, using Vacky’s file layout, how to add a new SpacetimeDB-backed feature.
- [ ] Cover:
  - where schema lives
  - where reducers live
  - where views live
  - where Next.js route handlers still belong
  - where password/session/email code belongs
  - how to wire client bindings into React/Next.js pages
- [ ] Include one simple end-to-end example for CRUD-style web app operations mapped to Vacky conventions.

The Operator guide should include an example shaped like this:

- **Create / POST**
  - Next.js route handler receives form data
  - validates and normalizes input
  - calls SpacetimeDB reducer like `create_trip`
  - returns redirect or JSON success
- **Read / GET**
  - page or route reads via a safe SpacetimeDB view or server helper
  - only exposes rows the current session should see
- **Update / PATCH**
  - route handler validates ownership and payload
  - calls reducer like `update_trip_title`
  - UI re-renders from fresh server read or live subscription
- **Delete / DELETE**
  - route handler confirms session + ownership
  - calls reducer like `delete_trip`
  - route or UI redirects to safe fallback

The guide should also include a minimal pseudo-file example using Vacky paths:

- `spacetimedb/src/index.ts` defines `trip` table and `create_trip`, `update_trip`, `delete_trip` reducers
- `lib/spacetimedb/server.ts` exposes helper functions for server reads
- `app/api/trips/route.ts` or `app/api/trips/[tripId]/route.ts` handles HTTP semantics
- `app/trips/page.tsx` and `app/trips/[tripId]/page.tsx` consume the server data

## Verification Plan

Implementation work following this plan should verify:

- local SpacetimeDB dev startup
- generated client bindings
- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`
- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build`

Manual verification should cover:

- sign up flow
- verification email flow
- sign in flow
- sign out flow
- unverified-user behavior
- protected-route behavior
- trip creation
- itinerary create/edit/reorder
- globe page data
- hostile-client attempts against auth and ownership boundaries

## Main Risks

- SpacetimeDB procedures are beta, so the plan should avoid relying on them for core auth correctness.
- Reducers cannot send emails or perform external network I/O, so Next.js must remain the delivery shell for email verification.
- Full migration removes mature Prisma/Postgres patterns quickly; expect temporary regressions while rebuilding auth and ownership checks.
- Route protection must be re-established carefully after removing NextAuth.
- The branch must not accidentally preserve stale Prisma assumptions in page components, types, or server actions.

## Final Recommendation

Treat this branch as a deliberate architecture fork:

- current branch/repo state remains the stable Prisma/Postgres baseline
- migration branch becomes the SpacetimeDB-native future path

If the branch completes Stage 1 and Stage 2 with acceptable DX, security, and product velocity, then Vacky can decide whether to merge toward SpacetimeDB as the main long-term backend.
