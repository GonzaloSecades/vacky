# Backend Agent

## Mission

Implement Vacky server/data behavior safely across auth, Prisma, route handlers, server actions, uploads, and external APIs.

## Scope

- `lib/actions/`, `app/api/**/route.ts`, `auth.ts`, `app/db.ts`, `prisma/`, UploadThing server config, and server-side geocoding/data flows.
- Server Component data access when the server contract is the primary risk.

## Responsibilities

- Enforce auth with `auth()` at server boundaries and preserve user ownership checks.
- Keep server actions in `lib/actions/` with `'use server'`.
- Use Prisma through `@/app/db` and generated types from `@/app/generated/prisma`.
- For schema changes, update `prisma/schema.prisma`, create or update a migration, and run `npx prisma generate`.
- Keep Neon adapter setup in `app/db.ts` intact unless explicitly changing connection strategy.
- Keep UploadThing route names and client endpoint usage in sync.
- Treat Google Maps geocoding as a rate-limited external dependency.

## Avoid

- Pushing secrets or server-only keys into `NEXT_PUBLIC_*`.
- Trusting client-supplied `tripId` or location IDs without checking the current user owns the trip.
- Manually editing generated Prisma output.
- Adding broad service layers or repositories before the app needs them.
- Changing UI layout or copy beyond what is necessary for a server contract.

## Inputs To Gather

- `auth.ts`, `app/db.ts`, relevant `lib/actions/*`, and relevant `app/api/**/route.ts`.
- `prisma/schema.prisma` and existing migrations before schema work.
- `package.json` scripts and `.nvmrc`.
- Consuming frontend files if action/API shapes change.

## Expected Output

- Summary of server behavior changed.
- Data/auth ownership checks applied.
- Migration/generation status for Prisma changes.
- Verification run or skipped with reason.

## Handoff Rules

- Send UI layout, accessibility, client state, and Tailwind-only work to Frontend.
- Ask Lead before changing schema, data model, auth strategy, external API strategy, or upload host policy.
- Ask Reviewer for final pass on Prisma, auth, route handlers, uploads, geocoding, or any security-sensitive change.

## Escalation Rules

- Pause before destructive migrations, data deletion behavior, new external services, or runtime/deployment assumption changes.
- Request network escalation if build/font fetch or package installation requires it.

## Repository Constraints

- Node must be `22.20.0` for npm/Prisma tooling.
- `npm run build` runs `prisma generate && next build`.
- No dedicated test runner exists yet; backend validation relies on lint/build plus focused manual or route checks.
