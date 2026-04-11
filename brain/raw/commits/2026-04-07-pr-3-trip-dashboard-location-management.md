# PR #3 Raw Note

Title: Add trip dashboard and location management

PR: https://github.com/GonzaloSecades/vacky/pull/3

Merge date: 2026-04-07

Merge commit: `84d38e369c6a6738f26a24bf912e66aa85f76be4`

Branch: `TripsDashboard`

Base: `d28749acea1b8994aa63a7d1e5da098a551dd1b1`

Head: `cc8011b0600cec8a6c93fb05c93e7a9b579c84ee`

## Evidence Used

- GitHub PR metadata, body, final diff, and Copilot review summary/comments for PR #3.
- Local merge commit `84d38e3`.
- Existing first-bootstrap raw note, reconciled with GitHub metadata.
- Current repo state at `90cbe69` to distinguish original implementation from later changes.

## Problem Or Goal

The PR body frames the goal as the first full trip-planning product surface:

- trip dashboard
- trip detail flow
- new-itinerary page
- persisted locations
- server actions for location management
- geocoding
- itinerary reordering
- map and globe UI
- `Location` Prisma model and migrations

This is the PR that changed Vacky from "can create a trip" into an early usable trip planner.

## Final Merged Behavior

Final merged behavior at `84d38e3`:

- `/` stopped being the default create-next-app page and became a marketing/CTA landing page.
- `/trips` became a real authenticated dashboard:
  - server-loaded trips for the signed-in user
  - sorted trip list/cards
  - counts for total/upcoming/past trips
  - empty-state creation flow
- `/trips/[tripId]` was added:
  - server fetch of one user-owned trip
  - client tabbed detail UI
  - overview, itinerary, and map tabs
- `/trips/[tripId]/itinerary/new` was added:
  - server trip existence check
  - client address form
  - server action geocodes and persists a `Location`
- `Location` entered the Prisma schema:
  - `locationTitle`
  - `lat`
  - `lng`
  - `tripId`
  - `order`
  - `createdAt`
- Itinerary reordering shipped through DnD Kit and a server action.
- `components/map.tsx` rendered Google Maps for trip locations.
- `/globe` shipped as a client page:
  - fetched `/api/trips`
  - rendered visited countries and markers on `react-globe.gl`
  - initially used direct globe import and fixed `800x600` sizing
- `/api/trips` shipped:
  - authenticated route
  - selects locations belonging to the signed-in user
  - returns transformed records with reverse-geocoded country/formatted address
- `app/trips/new/page.tsx` improved image upload pending-state behavior from the PR #2 version.
- `AGENTS.md` gained substantial repo/architecture/verification guidance.

Important timeline note: later PRs changed the globe implementation substantially, but PR #3 established the route, API contract, geocoding dependency, and product concept.

## Main Files Or Areas Touched

- routes and pages:
  - `app/page.tsx`
  - `app/trips/page.tsx`
  - `app/trips/new/page.tsx`
  - `app/trips/[tripId]/page.tsx`
  - `app/trips/[tripId]/itinerary/new/page.tsx`
  - `app/globe/page.tsx`
  - `app/api/trips/route.ts`
- client components:
  - `components/tripDetail.tsx`
  - `components/new-location.tsx`
  - `components/sortable-itinerary.tsx`
  - `components/map.tsx`
  - `components/auth-button.tsx`
- server actions and helpers:
  - `lib/actions/get-all-trips.ts`
  - `lib/actions/get-trip-by-id.ts`
  - `lib/actions/create-location.ts`
  - `lib/actions/reorder-itinerary.ts`
  - `lib/actions/geocode.ts`
  - `lib/constants.ts`
  - `lib/utils.ts`
- data model:
  - `prisma/schema.prisma`
  - `prisma/migrations/20260401210613_add_location/migration.sql`
  - `prisma/migrations/20260402184653_update_location_schema/migration.sql`
  - `prisma/migrations/20260402193055_romove_locations_updated_at/migration.sql`
- docs/tooling:
  - `AGENTS.md`
  - `.prettierrc`
  - `.vscode/settings.json`
  - `eslint.config.mjs`
  - `package.json`
  - `package-lock.json`

## Important Review-Driven Changes Or Comments

GitHub review evidence is strong for this PR.

- Copilot review summary states the PR added the core trip-planning UX and persisted trip locations with geocoding, reordering, and map/globe visualization.
- Copilot reviewed 31 of 32 changed files and generated 20 comments.
- Review summary explicitly identifies `app/api/trips/route.ts` as returning transformed locations with geocoded country/address.
- Review summary identifies the migration sequence for `Location`: create table, add ordering/timestamps, then drop `updatedAt`.
- Review summary notes `app/trips/new/page.tsx` improved image upload pending-state handling.
- Specific comments visible through GitHub included:
  - `params` typed as `Promise` and awaited in dynamic route pages.
  - dead commented `revalidatePath('/trips')` in `lib/actions/create-trip.ts`.
- The `params` comments should not be promoted as proven bugs without checking Next.js 16 docs. The repo-level `AGENTS.md` explicitly warns that this Next version has breaking App Router semantics, and current code still uses the Promise-shaped params pattern.

The PR body reports verification:

- `npm run lint` with Node `22.20.0`
- `npm run build` with Node `22.20.0`
- Initial sandboxed build failed because Next.js could not fetch Google font assets; rerun with network access passed.

## Risks, Follow-Ups, Or Unresolved Questions

- `app/api/trips/route.ts` reverse-geocodes every stored location on every request. This was introduced here and remains a known current risk.
- Location creation depends on Google geocoding at write time; globe data depends on reverse geocoding at read time.
- PR #3 globe implementation used direct `react-globe.gl` import and fixed dimensions; PR #6 later proves this was fragile.
- There is no evidence in this PR of delete/edit flows for trips or locations.
- Dynamic route `params` typing should be verified against the bundled Next.js 16 docs before changing it.

## What Should Be Promoted Into The Wiki

- PR #3 should be treated as the point where Vacky became a usable trip planner.
- Architecture docs should capture the split between server pages/data loading, server actions/mutations, and client-only components for maps, globe, tabs, forms, and drag/drop.
- Risk docs should preserve geocoding-on-read for `/api/trips` as a recurring hotspot.
- Product surface docs should connect `/globe` directly to stored `Location` records and `/api/trips`, not treat it as an isolated visualization.
- Workflow docs can cite PR #3 as the moment `AGENTS.md` became a detailed repo guide and Node 22/font-network verification expectations became explicit.
