# Step 10: Readiness

## Status

Ready with caveats as of 2026-04-26.

## What Changed

The branch now reads as SpacetimeDB-native for local development.

- Scripts, env examples, README, AGENTS guidance, and migration docs point at local SpacetimeDB.
- Prisma/Postgres/NextAuth artifacts were deleted from live code and package metadata.
- Temporary Prisma compatibility was removed from trips, locations, auth, settings, uploads, and supporting APIs.
- Final static verification passed after the full cutover.

## How

- Next.js runs on port `3001`; SpacetimeDB runs on port `3000`.
- The local database name is `vacky-spacetimedb-local-dev`.
- The required local identity setup is `spacetime login --server-issued-login http://localhost:3000 --no-browser`.
- Generated SpacetimeDB bindings live under `lib/spacetimedb/module_bindings/` and remain ignored.

## Why

Step 10 makes the branch handoff-ready by removing migration-only ambiguity and documenting the remaining verification and product caveats.

## Checkpoints

- [x] C1 reconcile naming, docs, scripts, and onboarding so the repo reads as SpacetimeDB-native instead of Prisma-native
- [x] C2 trim temporary adapters and migration-only compatibility shims that survived earlier steps
- [x] C3 produce the final migration summary, step index, and operator links for future contributors
- [x] C4 confirm the resulting branch satisfies static full-current-parity on the new backend
- [x] C5 record the final readiness call, remaining caveats, and recommended first post-migration follow-ups

## Readiness Call

Ready with caveats. The branch has passed static verification and local module verification, but it still needs browser/manual flow verification against the fresh local SpacetimeDB database before it should be treated as product-parity complete.

## Remaining Caveats

- First-party auth is local-only and email delivery is local/dev-oriented unless an email provider is configured.
- Existing Prisma data is not migrated into SpacetimeDB; this branch starts from a fresh local module database.
- Realtime client subscriptions are not yet added for current UX; reads are server/procedure-backed.
- Production and hosted deployment are intentionally not designed in this branch.

## Verification Evidence

- `npm run stdb:publish:local`: passed.
- `npm run stdb:generate`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Old-backend source search: clean for live app/package references.
