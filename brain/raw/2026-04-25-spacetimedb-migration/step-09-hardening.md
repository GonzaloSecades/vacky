# Step 09: Hardening

## Status

Completed for static verification on 2026-04-26. Browser/manual hostile-client checks remain open.

## What Changed

The branch received a static hardening pass after full cutover.

- Verified SpacetimeDB module build/publish/codegen.
- Verified app lint and production build after deleting the old backend.
- Checked live imports and package scripts for stale Prisma, NextAuth, Docker Postgres, Neon, anonymous-publish, and generated Prisma references.
- Updated migration docs and compiled brain pages to reflect the cutover.

## How

- `spacetimedb/src/index.ts` keeps auth-sensitive and product tables private.
- Safe read procedures return explicit records instead of exposing password/session/token fields.
- Reducers require user-owned trip checks before location mutations.
- Next.js route handlers and server actions keep HTTP validation, cookie issuance, token hashing, password hashing, redirects, email sending, and external API calls outside reducers.

## Why

Step 9 exists to catch stale assumptions after dependency deletion. The branch should fail from missing imports or scripts now, not later in a browser or PR review.

## Checkpoints

- [x] C1 run lint/build plus SpacetimeDB-specific verification after the full cutover
- [x] C2 execute hostile-client and ownership-boundary static checks for auth, trips, itinerary, and upload access
- [x] C3 confirm privacy posture for auth-sensitive tables and exposed read projections
- [x] C4 sync `brain/wiki/architecture/data-and-auth.md`, `now.md`, `log.md`, risks context, and migration notes
- [x] C5 capture unresolved risks, manual checks, and production unknowns

## Risks Retired

- Stale live imports from the removed backend are caught and removed.
- The branch has one local SpacetimeDB database name and one local CLI identity flow.

## Risks Remaining

- Manual browser verification is still required for sign-up, verify-email, sign-in, sign-out, trip creation, itinerary create/edit/reorder, UploadThing, settings, and globe reads.
- Production deployment remains out of scope for this branch because the user requested local development instances only.
- `/api/trips` reverse-geocoding fan-out remains unresolved.

## Verification Evidence

- `npm run stdb:publish:local`: passed.
- `npm run stdb:generate`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- `rg` import/config sweep over live app surfaces: no active old-backend references found.
