# Step 06: Read Paths

## Status

Completed on 2026-04-26.

## What Changed

Dashboard, trip detail, itinerary, map, and globe-supporting reads now use SpacetimeDB-backed server helpers instead of Prisma.

- Added SpacetimeDB procedures for current read models: `list_trips_by_user`, `get_trip_with_locations`, and `list_globe_locations_by_user`.
- Added app-local mapped types in `lib/spacetimedb/types.ts` so UI code consumes stable `AppTrip` and `AppLocation` shapes.
- Rewired `getAllTrips`, `getTripById`, server actions, and `/api/trips` to use SpacetimeDB helpers.

## How

- Private tables remain private; server-side procedures return explicit safe records.
- `lib/spacetimedb/trips.ts` calls generated procedure bindings and maps BigInt/timestamp fields into app-facing strings and `Date` values.
- `/api/trips` reads only the current user's globe-safe locations and keeps reverse geocoding in the route handler.

## Why

The app needed stable read models before Prisma could be deleted. Procedures are used here as server-side safe read projections because the current generated bindings do not expose private tables directly.

## Checkpoints

- [x] C1 create safe views and server read helpers for dashboard, trip detail, itinerary, map, and globe data needs
- [x] C2 replace Prisma page and route reads with SpacetimeDB-backed server helpers
- [x] C3 decide where live subscriptions add value versus plain server reads for current UX
- [x] C4 remove remaining generated Prisma type dependencies from UI and shared utils
- [x] C5 verify current pages compile with SpacetimeDB as the live source of truth

## Risks Retired

- UI/server code no longer imports generated Prisma models.
- Dashboard, trip detail, itinerary, and globe reads now share the same SpacetimeDB ownership boundary as writes.

## Risks Introduced

- Reads are currently request/SSR-style helpers, not live subscriptions. This preserves parity but does not yet exploit SpacetimeDB realtime UX.
- `/api/trips` still reverse-geocodes every returned location and remains a known cost/latency risk.

## Verification Evidence

- `rg` over live app/package/docs found no active imports of `@/app/db`, `@/auth`, `next-auth`, Prisma packages, or generated Prisma paths.
- `npm run lint`: passed.
- `npm run build`: passed and produced the expected dynamic app routes.
