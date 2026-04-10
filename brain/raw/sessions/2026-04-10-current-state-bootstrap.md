# Current State Bootstrap

Date: 2026-04-10

## Scope And Evidence Used

- required reads at start of session:
  - `AGENTS.md`
  - `brain/README.md`
  - `brain/raw/README.md`
  - `brain/wiki/index.md`
  - `brain/wiki/now.md`
  - `git status --short --branch`
- current repo code state on local `master` at `fb34bc0` (`Merge pull request #6 ...`)
- current route files under `app/`
- current server actions under `lib/actions/`
- current Prisma schema and migrations
- local git merge history for merged PRs into `master`
- GitHub app context was attempted but this repository was not available through the connector in this environment, so PR evidence fell back to local merge commits and branch history

## Repo State Snapshot

- branch: `master`
- HEAD: `fb34bc0` from 2026-04-08
- local working tree is not clean
- unrelated local changes already exist in `.agents/`, `.codex/`, `AGENTS.md`, and `brain/`
- `brain/` itself is still early bootstrap material and should not yet be treated as authoritative history

## App As It Exists Today

Vacky is currently a single Next.js App Router application for authenticated trip planning. The user-facing surface is real but still narrow:

- a marketing landing page at `/` with login CTA and feature cards
- GitHub-authenticated trip dashboard at `/trips`
- trip creation flow at `/trips/new`
- trip detail pages at `/trips/[tripId]`
- itinerary location add flow at `/trips/[tripId]/itinerary/new`
- globe visualization at `/globe`
- account/settings page at `/settings`

The product feels like an early but usable personal trip planner rather than a broad travel platform. There is no evidence in the current repo of sharing, collaboration, bookings, budgeting, or social features despite the landing page copy implying broader aspirations.

## Current Routes And Visible Feature Surface

### Page routes

- `/`
  - server component checks auth and renders a public landing page
  - copy promises maps, itineraries, and drag-and-drop planning
  - CTA routes logged-in users to `/trips` and otherwise starts GitHub sign-in
  - copy still says `TripPlanner` in the lower CTA, which is stale against current branding
- `/trips`
  - authenticated dashboard
  - fetches trips server-side with `getAllTrips()`
  - shows counts for total/upcoming/past trips
  - shows up to six recent trips with cover image, description, and date range
  - empty state includes a create button
- `/trips/new`
  - client form for title, description, start/end dates, and optional cover image
  - UploadThing upload happens client-side before submit
  - submit calls server action `createTrip`
- `/trips/[tripId]`
  - server fetch for one user-owned trip
  - renders client tabbed detail UI with overview, itinerary, and map tabs
  - supports adding locations
  - renders map when locations exist
- `/trips/[tripId]/itinerary/new`
  - server validates trip existence
  - client form submits an address string
  - server action geocodes the address and creates a `Location`
- `/globe`
  - client-only visualization
  - fetches `/api/trips`
  - renders visited countries and point markers on a rotating globe
  - current implementation uses a dynamically imported wrapper component plus responsive sizing logic
- `/settings`
  - authenticated server page
  - reads the signed-in user's auth provider records from Prisma
  - shows account card and theme selection
  - theme is stored in a cookie and applied by the root layout before render

### API routes

- `/api/auth/[...nextAuth]`
  - NextAuth GET/POST handlers
- `/api/uploadthing`
  - UploadThing route handler for `imageUploader`
- `/api/trips`
  - authenticated JSON endpoint for globe data
  - returns one transformed record per stored location
  - currently performs reverse geocoding on every stored location for every request

## Current Architecture And Main Boundaries

- App Router, mostly server-first
  - `app/layout.tsx` is a server component
  - layout fetches both `auth()` session and theme cookie before rendering
- auth boundary
  - centralized in `auth.ts`
  - GitHub is the only configured provider in code
  - server pages and actions usually enforce auth before data access
- data boundary
  - Prisma client creation lives in `app/db.ts`
  - Neon adapter is used with `DATABASE_URL`
  - Prisma generated client output is under `app/generated/prisma`
- server mutations
  - implemented as server actions in `lib/actions/`
  - current major actions: create trip, get all trips, get trip by id, add location, reorder itinerary, set theme
- browser-only feature boundaries
  - trip creation form
  - sortable itinerary
  - Google map
  - globe rendering
  - avatar menu portal
- external API boundaries
  - UploadThing for uploads
  - Google geocode API for both forward and reverse geocoding
  - Google Maps JS API for embedded maps

## Important Integrations And Dependencies

- `next-auth` v5 beta with GitHub provider and Prisma adapter
- Prisma `7.6.0` with `@prisma/adapter-neon`
- UploadThing (`uploadthing`, `@uploadthing/react`)
- Google Maps and geocoding APIs
- `react-globe.gl` plus custom `three` compatibility shim
- `@dnd-kit/core` and `@dnd-kit/sortable` for itinerary reordering
- Radix tabs via `@radix-ui/react-tabs`
- Tailwind CSS v4 and app-local UI primitives

## Current Data Shape

The durable user data model appears to be:

- `User`, `Account`, `Session`, `VerificationToken` from NextAuth/Prisma
- `Trip`
  - title
  - description
  - optional `coverImageUrl`
  - `images` string array exists in schema but there is no current UI for managing it
  - start/end dates
  - owner via `userId`
- `Location`
  - `locationTitle`
  - `lat`, `lng`
  - `tripId`
  - `order`
  - `createdAt`

## Known Risks, Unclear Areas, And Likely Stale Assumptions

- confirmed known risk: `app/api/trips/route.ts` reverse-geocodes every location on every request
- landing page metadata is still default create-next-app metadata (`Create Next App`, `Generated by create next app`)
- landing page CTA copy still says `TripPlanner`, which suggests branding drift
- repository `README.md` is still default Next.js boilerplate and should not be used as truth
- there is no configured test runner; effective verification is lint/build/manual checks
- `session.user.image || '/default-avatar.png'` is used in settings and user menu, but `public/default-avatar.png` does not exist in the current tree
- `providerLabelMap` includes `google`, but `auth.ts` currently configures GitHub only
- `Trip.images` exists in Prisma schema with a comment about future image-management workflows, but current UI only writes `coverImageUrl`
- `/trips` uses a sign-in message for unauthenticated access while `/settings` redirects to `/`; auth UX is not fully consistent across protected pages
- `next.config.ts` allows UploadThing host `qzkm7tlm4u.ufs.sh`; this is likely environment-specific and should be checked if UploadThing app config changes
- no evidence yet that the wiki pages under `brain/wiki/` have been updated from actual source-backed ingest work; they look scaffold-level

## Areas Where Evidence Is Thin

- no GitHub PR descriptions, review comments, or thread resolution state were available through the connector for this repo
- current repo does not explain intended deployment target or production environment beyond generic Next.js defaults
- there is little durable rationale in-code for product direction, only implementation evidence

## Wiki Pages To Strengthen First In The Next Ingest Pass

1. `brain/wiki/features/current-surface.md`
   - the current wiki surface summary is too high-level and should be replaced with route-by-route reality from this note
2. `brain/wiki/architecture/overview.md`
   - needs explicit boundaries for App Router, server actions, auth, Prisma/Neon, UploadThing, Google APIs, and client-only components
3. `brain/wiki/architecture/data-and-auth.md`
   - should capture actual Prisma models, ownership boundaries, and auth enforcement patterns
4. `brain/wiki/now.md`
   - should be revised from scaffold language to evidence-backed current state, risks, and next steps
5. `brain/wiki/log.md`
   - should record this first real raw-source bootstrap and the PR-history ingest that follows
6. `brain/wiki/agents/workflow.md`
   - should reflect the actual repo-local skill layer and Phase 1 workflow once raw PR notes for #4 and current local docs are ingested

## Suggested Ingest Direction After This Bootstrap

- ingest the merged PR notes in chronological order first
- use PR #1 through #3 to build the product/architecture timeline
- use PR #4 through #6 to build the workflow/theme/globe reliability timeline
- only after that, rewrite `wiki/now.md` and `features/current-surface.md`
