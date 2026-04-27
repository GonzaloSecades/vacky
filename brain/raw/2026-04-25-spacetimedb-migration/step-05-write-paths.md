# Step 05: Write Paths

## Status

Completed on 2026-04-26.

## What Changed

Trip and location mutations now write through SpacetimeDB reducers instead of Prisma.

- Added trip/location reducer coverage for trip creation, location creation, itinerary creation, itinerary saving, and same-day itinerary reordering.
- Added `lib/spacetimedb/trips.ts` as the server-side write helper layer around generated reducer calls.
- Rewired `lib/actions/create-trip.ts`, `lib/actions/create-location.ts`, `lib/actions/itinerary.ts`, and `lib/actions/reorder-itinerary.ts` to use SpacetimeDB helpers.
- Kept Next.js responsible for form parsing, Google geocoding/Places payload validation, redirects, and cache revalidation.

## How

- `create_trip` validates user existence, required fields, and date order before inserting a private `trip` row.
- `add_location`, `create_itinerary`, `save_itinerary`, and `reorder_itinerary_day` require a user-owned trip before touching `location` rows.
- Existing server actions still validate hostile form payloads before calling reducers, so reducers are the persistence boundary and Next.js remains the HTTP boundary.
- App helpers convert string session IDs and route params into SpacetimeDB `u64` values before reducer calls.

## Why

Reducers are the default transactional write path for this migration. Moving writes first retired Prisma transaction assumptions while preserving the existing UX surfaces.

## Checkpoints

- [x] C1 translate trip/location mutations into reducers for create, update, delete, itinerary save, and reorder behavior
- [x] C2 preserve current ownership and validation rules at the Next.js boundary and reducer boundary
- [x] C3 replace server actions that currently write through Prisma with calls into SpacetimeDB helpers/bindings
- [x] C4 remove transactional Prisma assumptions by encoding equivalent reducer-based behavior
- [x] C5 verify write flows compile against generated reducers

## Risks Retired

- Live write paths no longer depend on `app/db.ts`, Prisma Client, Prisma transactions, or Postgres migrations.
- Reducers now enforce trip ownership even if a hostile client bypasses the normal UI and calls app routes/actions with forged IDs.

## Risks Introduced

- SpacetimeDB reducer behavior still needs browser/manual verification with real sign-up, trip creation, itinerary creation/editing, and reorder flows.
- App session user IDs are now SpacetimeDB `u64` strings; old Prisma string IDs are not compatible with this branch.

## Verification Evidence

- `npm run stdb:publish:local`: passed after switching to a local server-issued CLI identity and database `vacky-spacetimedb-local-dev`.
- `npm run stdb:generate`: passed and regenerated TypeScript bindings.
- `npm run lint`: passed.
- `npm run build`: passed.
