# Data And Auth

## Current Data Stack

The SpacetimeDB migration branch is now local-only and SpacetimeDB-native.

- persistence: local SpacetimeDB on `http://localhost:3000`
- database: `vacky-spacetimedb-local-dev`
- web app: Next.js on `http://localhost:3001`
- auth: app-owned email/password auth, email verification, and HTTP-only `vacky_session` cookies
- generated bindings: `lib/spacetimedb/module_bindings/`

Prisma, Postgres, Docker Postgres, Neon adapter support, NextAuth, GitHub OAuth, `auth.ts`, `app/db.ts`, `prisma/`, and the NextAuth catch-all route have been removed from the live migration branch.

## Local Runtime Policy

This branch intentionally supports only local SpacetimeDB instances.

- Start SpacetimeDB with `npm run stdb:start`.
- Use a local server-issued CLI identity: `spacetime login --server-issued-login http://localhost:3000 --no-browser`.
- Publish the module with `npm run stdb:publish:local`.
- Reset local module data with `npm run stdb:publish:reset`.
- Regenerate bindings with `npm run stdb:generate`.

Do not add Maincloud, Neon, Docker Postgres, hosted Postgres, or anonymous-publish assumptions back into this branch.

## Important Files

- `spacetimedb/src/schema/index.ts`
- `spacetimedb/src/schema/auth.ts`
- `spacetimedb/src/schema/trips.ts`
- `spacetimedb/src/schema/locations.ts`
- `spacetimedb/src/index.ts`
- `spacetimedb/src/modules/`
- `spacetimedb/src/shared/`
- `lib/spacetimedb/config.ts`
- `lib/spacetimedb/server.ts`
- `lib/spacetimedb/auth.ts`
- `lib/spacetimedb/trips.ts`
- `lib/spacetimedb/types.ts`
- `lib/auth/session.ts`
- `lib/auth/password.ts`
- `lib/auth/email-verification.ts`
- `lib/email/send-verification-email.ts`
- `app/api/auth/sign-up/route.ts`
- `app/api/auth/sign-in/route.ts`
- `app/api/auth/sign-out/route.ts`
- `app/api/auth/verify-email/route.ts`
- `app/api/trips/route.ts`
- `app/api/uploadthing/core.ts`
- `lib/actions/create-trip.ts`
- `lib/actions/delete-trip.ts`
- `lib/actions/create-location.ts`
- `lib/actions/itinerary.ts`
- `lib/actions/reorder-itinerary.ts`

For new features that cross SpacetimeDB, server actions, and UI, use [Fullstack Feature Guide](fullstack-feature-guide.md) as the implementation workflow reference before editing.

## Current Tables

SpacetimeDB owns the persisted schema:

- `user_account`
- `session`
- `email_verification_token`
- `trip`
- `location`
- `auth_audit_event`

Auth-sensitive and product tables are private by default. Server-side procedures return explicit safe records instead of exposing password hashes, token hashes, or session secrets.

## Auth Flow

- Sign-up hashes passwords in Next.js, creates a SpacetimeDB user, creates a verification token hash, and sends or logs a local verification link.
- Verify-email hashes the supplied token, redeems it through SpacetimeDB, and marks the user verified.
- Sign-in verifies the password in Next.js, creates a SpacetimeDB-backed session, and sets `vacky_session`.
- Sign-out revokes the session in SpacetimeDB and clears the cookie.
- Server pages, actions, route handlers, UploadThing middleware, navbar state, and settings read the current user through `getSession()`.

`NODE_ENV === "production"` controls whether the session cookie is marked `secure`; development keeps the cookie usable on local HTTP.

## Trip And Location Flow

- Trip creation calls the `create_trip` reducer.
- Trip deletion calls the `delete_trip` reducer and deletes the owned trip plus its saved locations.
- Location creation calls the `add_location` reducer after server-side geocoding.
- Itinerary creation calls the `create_itinerary` reducer.
- Itinerary editing calls the `save_itinerary` reducer.
- Same-day drag-and-drop order calls the `reorder_itinerary_day` reducer.
- Dashboard and trip detail reads call SpacetimeDB-backed server helpers.
- `/api/trips` calls the globe-safe SpacetimeDB read helper and still performs reverse geocoding in the route handler.

The app keeps current UI-facing shapes through `AppTrip`, `AppLocation`, and mapping helpers in `lib/spacetimedb/types.ts`.

## Ownership Model

- App sessions carry SpacetimeDB `user_account.id` as the canonical user ID.
- Trip reducers verify the supplied user exists where relevant.
- The destructive delete-trip path is authorized twice: the Next.js server action requires a session, and the reducer rejects non-owned `tripId` values through `requireOwnedTrip`.
- Location and itinerary reducers require a user-owned trip before mutating locations.
- Server actions still validate form payloads, dates, selected-place payloads, metadata enums, IDs, and minimum retained/new locations before calling reducers.
- UploadThing middleware requires a valid first-party session.

## External Data Boundaries

- Email delivery remains in Next.js because reducers cannot send external network email.
- Password hashing and token hashing remain in Next.js before persistence.
- UploadThing remains the upload provider, with auth now based on `getSession()`.
- Google geocoding remains server-side.
- Google Places and Maps JS remain client-side where already established by the itinerary planner.

## Schema Evolution To Date

- PR #1 through PR #13 established the old Prisma/Postgres and local Docker Postgres baseline.
- The SpacetimeDB migration branch replaces that baseline with local SpacetimeDB schema, reducers, procedures, generated bindings, and first-party auth.
- Existing Prisma data is not migrated in this branch; the local SpacetimeDB module starts fresh.

## High-Risk Boundaries

- SpacetimeDB schema, reducer, procedure, or view changes require local publish and binding regeneration.
- Auth/session changes require hostile-client checks because cookie sessions map directly to reducer authorization inputs.
- Trip deletion is destructive and depends on the reducer-level ownership guard plus correct cleanup of associated `location` rows.
- `/api/trips` reverse-geocoding still fans out per stored location.
- Browser/manual parity checks are still required for auth, trips, itinerary editing, UploadThing, settings, and globe.
- Production deployment is intentionally out of scope for the local-only migration branch.

## Primary Evidence

- [Step 05 write paths](../../raw/2026-04-25-spacetimedb-migration/step-05-write-paths.md)
- [Step 06 read paths](../../raw/2026-04-25-spacetimedb-migration/step-06-read-paths.md)
- [Step 07 side systems](../../raw/2026-04-25-spacetimedb-migration/step-07-side-systems.md)
- [Step 08 cutover](../../raw/2026-04-25-spacetimedb-migration/step-08-cutover.md)
- [Step 09 hardening](../../raw/2026-04-25-spacetimedb-migration/step-09-hardening.md)
- [Step 10 readiness](../../raw/2026-04-25-spacetimedb-migration/step-10-readiness.md)
- [SpacetimeDB operator guide](../../Operator/query/spacetimedb-vacky-guide.md)
- [SpacetimeDB migration plan](../../../docs/superpowers/plans/2026-04-23-spacetimedb-adoption-for-vacky.md)

## Related Risks

The canonical risk status lives in [Risks](../risks.md), especially:

- `RISK-001` for `/api/trips` reverse geocoding
- `RISK-002` for missing independent browser/manual and hostile-client verification
- `RISK-004` for auth boundary consistency
