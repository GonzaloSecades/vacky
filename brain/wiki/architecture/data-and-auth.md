# Data And Auth

## Current Data Stack

The app uses Prisma over Postgres through the Neon adapter. Authentication is handled by `next-auth` with the Prisma adapter. Current code configures GitHub as the only provider.

PR #1 review evidence confirms the Prisma 7 setup had to avoid schema-level datasource URLs and use `prisma.config.ts` plus adapter configuration. Current code follows the adapter strategy but still lacks an explicit `DATABASE_URL` runtime guard in `app/db.ts`.

## Important Files

- `auth.ts`
- `app/db.ts`
- `prisma/schema.prisma`
- `app/api/auth/[...nextAuth]/route.ts`
- `lib/actions/create-trip.ts`
- `lib/actions/get-all-trips.ts`
- `lib/actions/get-trip-by-id.ts`
- `lib/actions/create-location.ts`
- `lib/actions/itinerary.ts`
- `lib/actions/reorder-itinerary.ts`
- `lib/itinerary-dates.ts`
- `lib/actions/set-theme.ts`
- `app/api/trips/route.ts`

## Current Models

### Auth models

- `User`
- `Account`
- `Session`
- `VerificationToken`

These entered the project in PR #1 and have remained the auth/storage baseline since then.

### Product models

- `Trip`
  - owner via `userId`
  - title, description, optional `coverImageUrl`
  - `images: String[]` exists in schema but is not currently surfaced by the UI
  - `startDate` and `endDate`
- `Location`
  - belongs to `Trip`
  - stores `locationTitle`, `lat`, `lng`, optional `scheduledDate`, and `order`
  - `scheduledDate` is a nullable `YYYY-MM-DD` string for migration-safe date-only itinerary semantics
  - `order` is interpreted as order within the same scheduled day
  - legacy rows may remain unscheduled; new create/edit itinerary flows require a scheduled date

## Ownership Model

- trip reads and writes are expected to be user-owned
- location writes are scoped through a user-owned trip lookup
- itinerary create/save validates authenticated ownership, trip existence, selected-place payload shape, coordinates, date range, existing location IDs, deleted location IDs, and at least one retained/new location
- itinerary reordering validates:
  - that the trip belongs to the current user
  - that the location IDs belong to that trip and the submitted scheduled day
- `/api/trips` filters locations through `trip.userId`

The ownership model is strongly supported by current code and was explicitly strengthened during PR #3 review fixes.

## Auth Flow

- `auth.ts` exports `auth`, `handlers`, `signIn`, and `signOut`
- sign-in uses GitHub
- App Router auth route delegates to `handlers`
- server actions and data-fetching helpers call `auth()` at the server boundary
- auth UX is not fully uniform:
  - `/settings` redirects to `/`
  - `/trips` renders a sign-in message instead of redirecting
  - `/globe` is client-heavy and relies on `/api/trips` for authenticated data access
  - PR #2 explicitly left route-level auth protection for `/trips/new` as follow-up; current auth-sensitive edits should re-check that page boundary

## External Data Boundaries

- UploadThing
  - one image route slug: `imageUploader`
  - middleware requires an authenticated user
- Google geocoding
  - legacy forward geocoding action still exists but is no longer the main itinerary creation route
  - reverse geocoding on `/api/trips` reads
- Google Places
  - client-side autocomplete and place-details lookup in the itinerary planner
  - server actions structurally validate selected-place payloads and coordinates but do not re-query Google on save
- Google Maps JS
  - used client-side for trip map display and itinerary planner marker fitting

## Schema Evolution To Date

- PR #1: auth schema and Prisma setup
- PR #2: `Trip` model and first trip migration
- PR #3: `Location` model plus follow-up migration adjustments
- PRs #4 through #6: no major schema changes
- PR #8: nullable `Location.scheduledDate` string plus transactional create/save itinerary actions and a renamed cascade-only `Location.tripId` foreign-key migration

PR #1 review called out redundant `Session.sessionToken` uniqueness/indexing concerns. Current schema uses `sessionToken String @id`; live database index state was not inspected.

## High-Risk Boundaries

- schema changes must stay synchronized with migrations and generated client output
- user ownership should be enforced at server boundaries
- auth-sensitive routes and actions should assume hostile clients
- geocoding and map-related reads can become expensive or rate-limited
- itinerary date helpers should remain the boundary for parsing, grouping, sorting, and rendering `YYYY-MM-DD` scheduled dates

## Recurring Risks And Follow-Ups

- `/api/trips` reverse-geocodes every stored location on every request
- Google Places autocomplete depends on the Maps JavaScript API being enabled and configured for the public browser key
- itinerary saves trust the selected-place payload shape and coordinates after structural validation; the server does not re-query Google Places in the current MVP
- `app/db.ts` uses a non-null assertion for `DATABASE_URL`; a clearer fail-fast error remains a source-backed follow-up from PR #1 review
- `Trip.images` exists without a matching user-facing flow; this is either a forward-looking field or stale scope
- settings code anticipates multiple auth providers in labels, but only GitHub is active in current code
- missing `/default-avatar.png` means avatar fallback assumptions are currently unsound

## Evidence Quality

- model and ownership details are strongly supported by current code and raw PR notes
- Prisma/auth setup now has stronger PR-review provenance from GitHub for PR #1, but no live database introspection evidence
- rationale is weaker than implementation evidence; there is limited direct source material for why some schema or provider-shape decisions were made

## Primary Evidence

- [PR #1 auth and Prisma raw note](../../raw/commits/2026-03-31-pr-1-init-setup-auth-navbar-db.md)
- [PR #2 trip creation and UploadThing raw note](../../raw/commits/2026-03-31-pr-2-trip-creation-uploadthing.md)
- [PR #3 trip dashboard and location management raw note](../../raw/commits/2026-04-07-pr-3-trip-dashboard-location-management.md)
- [PR #8 itinerary planner raw note](../../raw/commits/2026-04-11-pr-8-itinerary-planner.md)
- [itinerary date-key decision](../decisions/2026-04-11-itinerary-date-keys.md)

## Related Risks

The canonical risk status lives in [Risks](../risks.md), especially:

- `RISK-001` for `/api/trips` reverse geocoding
- `RISK-004` for route-level auth inconsistency
- `RISK-006` for `DATABASE_URL` fail-fast handling
