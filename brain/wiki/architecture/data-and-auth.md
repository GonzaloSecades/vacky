# Data And Auth

## Current Data Stack

The app uses Prisma over Postgres through the Neon adapter. Authentication is handled by `next-auth` with the Prisma adapter. Current code configures GitHub as the only provider.

## Important Files

- `auth.ts`
- `app/db.ts`
- `prisma/schema.prisma`
- `app/api/auth/[...nextAuth]/route.ts`
- `lib/actions/create-trip.ts`
- `lib/actions/get-all-trips.ts`
- `lib/actions/get-trip-by-id.ts`
- `lib/actions/create-location.ts`
- `lib/actions/reorder-itinerary.ts`
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
  - stores `locationTitle`, `lat`, `lng`, and `order`
  - created from a geocoded address string rather than a richer place object

## Ownership Model

- trip reads and writes are expected to be user-owned
- location writes are scoped through a user-owned trip lookup
- itinerary reordering validates both:
  - that the trip belongs to the current user
  - that the location IDs belong to that trip
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

## External Data Boundaries

- UploadThing
  - one image route slug: `imageUploader`
  - middleware requires an authenticated user
- Google geocoding
  - forward geocoding on location creation
  - reverse geocoding on `/api/trips` reads
- Google Maps JS
  - used client-side for trip map display

## Schema Evolution To Date

- PR #1: auth schema and Prisma setup
- PR #2: `Trip` model and first trip migration
- PR #3: `Location` model plus follow-up migration adjustments
- PRs #4 through #6: no major schema changes

## High-Risk Boundaries

- schema changes must stay synchronized with migrations and generated client output
- user ownership should be enforced at server boundaries
- auth-sensitive routes and actions should assume hostile clients
- geocoding and map-related reads can become expensive or rate-limited

## Recurring Risks And Follow-Ups

- `/api/trips` reverse-geocodes every stored location on every request
- `Trip.images` exists without a matching user-facing flow; this is either a forward-looking field or stale scope
- settings code anticipates multiple auth providers in labels, but only GitHub is active in current code
- missing `/default-avatar.png` means avatar fallback assumptions are currently unsound

## Evidence Quality

- model and ownership details are strongly supported by current code and raw PR notes
- rationale is weaker than implementation evidence; there is limited direct source material for why some schema or provider-shape decisions were made
