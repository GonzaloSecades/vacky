# Architecture Overview

Vacky is a single Next.js App Router application. The current architecture was established across PRs #1 through #6 and is now consistent enough to describe as a real server-first trip-planning app, even though parts of the product remain early-stage.

## Current Shape

- App Router with mostly server-first rendering.
- Shared app shell in `app/layout.tsx`, which reads auth state and theme cookie before render.
- Server actions handle most authenticated mutations, including transactional itinerary create/save.
- Client components are used where browser APIs, hooks, Google Places autocomplete, Google Maps, or client-only libraries are required.
- Prisma through the Neon adapter is the only visible persistence layer.
- External boundaries are concentrated in UploadThing, Google geocoding, Google Maps, and globe rendering.

## Main Layers

- `app/`
  - routes, layout, route handlers, DB setup, generated Prisma output
- `components/`
  - feature UI plus reusable UI primitives
- `lib/actions/`
  - authenticated server-side reads and mutations for trips, locations, and theme
- `prisma/`
  - schema and migrations
- `auth.ts`
  - central NextAuth configuration
- `.agents/` and `.codex/`
  - repo-local workflow layer for Codex; operational, not runtime

## Route And Boundary Map

- Public entry:
  - `/`
- Product routes normally reached from the signed-in app shell:
  - `/trips`
  - `/trips/new`
  - `/trips/[tripId]`
  - `/trips/[tripId]/itinerary/new`
  - `/trips/[tripId]/itinerary/edit`
  - `/globe`
  - `/settings`
- Route handlers:
  - `/api/auth/[...nextAuth]`
  - `/api/uploadthing`
  - `/api/trips`

## Server And Client Split

### Server-first areas

- route-level data loading
- auth checks through `auth()`
- Prisma reads and writes
- theme cookie read/write
- UploadThing authorization middleware

### Client-only areas

- trip creation form state
- itinerary planner form state and Places autocomplete
- itinerary same-day drag-and-drop
- Google Maps embed
- planner map marker fitting
- globe rendering
- avatar menu portal

This split is strongly supported by the current code. The preference for server-first boundaries is explicit in `AGENTS.md`; some tradeoff framing is inference from the implementation shape.

## Auth Enforcement Caveat

Auth is consistently enforced at the data/mutation boundary, but not every product page has the same route-level behavior. For example, `/trips` renders a sign-in message when unauthenticated, `/settings` redirects, and client-heavy routes such as `/globe` rely on authenticated API/data boundaries. Treat route access and data access as related but separate concerns.

## Important Integrations

- `next-auth` v5 beta with GitHub provider and Prisma adapter
- Prisma `7.6.0` with `@prisma/adapter-neon`
- UploadThing for trip image uploads
- Google Geocoding API for forward and reverse geocoding
- Google Places autocomplete in the itinerary planner
- Google Maps JS API for trip maps and planner maps
- `react-globe.gl` behind a client-only wrapper, with a local `three` compatibility shim and both webpack/Turbopack aliasing

## Evolution So Far

- PR #1 established auth, Prisma, navbar, and the first authenticated shell.
- PR #2 introduced the `Trip` model, trip creation, and UploadThing.
- PR #3 introduced the real planner surface: dashboard, trip detail, locations, itinerary ordering, map, globe, and `/api/trips`.
- PR #4 added the repo-local Codex skills/workflow layer.
- PR #5 added settings, theme persistence, avatar menu, and semantic theme styling.
- PR #6 stabilized globe loading after direct `/globe` loads hit browser-only import and `THREE.Clock()` compatibility problems; final code uses a dynamic client wrapper plus webpack and Turbopack aliases for the shim.

## Important Constraints And Tradeoffs

- Prisma client generation targets `app/generated/prisma`.
- UploadThing config is split between route handler setup and client helper usage.
- external image hosts must match `next.config.ts`.
- Next.js 16 behavior changes should be checked against bundled docs before major routing or rendering changes.
- the globe feature now depends on custom bundler aliasing and a local shim, which is a fragile integration point.
- itinerary dates are stored as nullable `YYYY-MM-DD` strings on `Location`, not as a separate itinerary model.
- itinerary ordering is same-day ordering; cross-day drag-and-drop is intentionally outside the current UI and server action contract.
- `/api/trips` currently trades implementation simplicity for latency and API cost by reverse-geocoding every stored location on each request.
- `app/db.ts` still uses `process.env.DATABASE_URL!`; PR #1 review called out the lack of an explicit fail-fast runtime check.

## Current Architecture Risks

- geocoding is used both on write and on read, increasing dependence on Google APIs
- `/api/trips` is the clearest current hotspot for latency and rate-limit risk
- Places autocomplete introduces another Google API configuration point for the browser key
- legacy unscheduled locations can exist and require itinerary edit cleanup before they become fully scheduled itinerary rows
- theme support is cleanly integrated but only cookie-backed, not profile-backed
- some UI assumptions remain brittle, including missing `/default-avatar.png` fallback asset and stale landing-page metadata/copy
- globe loading is still visual-only in current code, despite PR #6 review suggesting accessible loading status text
- settings avatar sizing still uses `size-18`; PR #6 review questioned whether that class is deterministic in this Tailwind setup

## Evidence Quality

- runtime boundaries above are well supported by current repo state and merged PR notes
- PR #1 through #6 now have GitHub metadata-backed raw notes; direct commit `90cbe69` remains PR-less
- rationale is weaker than implementation evidence; where not explicit in raw notes or code comments, tradeoff framing should be treated as inference
