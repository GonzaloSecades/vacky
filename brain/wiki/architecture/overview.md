# Architecture Overview

Vacky is a single Next.js App Router application. The current architecture was established across PRs #1 through #13 and is now consistent enough to describe as a real server-first trip-planning app, even though parts of the product remain early-stage.

## Current Shape

- App Router with mostly server-first rendering.
- Shared app shell in `app/layout.tsx`, which reads auth state and theme cookie before render.
- Server actions handle most authenticated mutations, including transactional itinerary create/save.
- Client components are used where browser APIs, hooks, Google Places autocomplete, Google Maps, or client-only libraries are required.
- Local-only SpacetimeDB is the live persistence layer for auth, trips, and locations on this branch.
- External boundaries are concentrated in UploadThing, Google geocoding, Google Places, Google Maps, and globe rendering.
- The itinerary planner now stores lightweight Google Places metadata and user-entered stop metadata on `Location`, without adding a separate itinerary model.

## Main Layers

- `app/`
  - routes, layout, route handlers, and global UI shell
- `components/`
  - feature UI plus reusable UI primitives
- `lib/actions/`
  - authenticated server-side reads and mutations for trips, locations, and theme
- `lib/auth/` and `lib/spacetimedb/`
  - first-party session helpers plus SpacetimeDB access/mapping layers
- `spacetimedb/`
  - local module schema, reducers, procedures, and build config
- `brain/wiki/architecture/fullstack-feature-guide.md`
  - durable implementation guide for feature work that crosses Next.js UI/actions and local SpacetimeDB reducers/procedures
- `.agents/` and `.codex/`
  - repo-local workflow layer for Codex; operational, not runtime

## Route And Boundary Map

- Public entry:
  - `/`
- Product routes normally reached from the signed-in app shell:
  - `/sign-up`
  - `/sign-in`
  - `/verify-email`
  - `/trips`
  - `/trips/new`
  - `/trips/[tripId]`
  - `/trips/[tripId]/itinerary/new`
  - `/trips/[tripId]/itinerary/edit`
  - `/globe`
  - `/settings`
- Route handlers:
  - `/api/auth/sign-up`
  - `/api/auth/sign-in`
  - `/api/auth/sign-out`
  - `/api/auth/verify-email`
  - `/api/uploadthing`
  - `/api/trips`

## Server And Client Split

### Server-first areas

- route-level data loading
- auth checks through `getSession()` and `requireSession()`
- SpacetimeDB procedure reads and reducer-backed writes
- theme cookie read/write
- UploadThing authorization middleware

### Client-only areas

- trip creation form state
- itinerary planner form state and Places autocomplete
- itinerary stop-card expand/collapse state, rating/cost/notes inputs, and category icon rendering
- itinerary same-day drag-and-drop
- Google Maps embed
- planner map marker fitting
- globe rendering
- avatar menu portal

This split is strongly supported by the current code. The preference for server-first boundaries is explicit in `AGENTS.md`; some tradeoff framing is inference from the implementation shape.

## Auth Enforcement Caveat

Auth is consistently enforced at the data/mutation boundary, but not every product page has the same route-level behavior. For example, `/trips` renders a sign-in message when unauthenticated, `/settings` redirects, and client-heavy routes such as `/globe` rely on authenticated API/data boundaries. Treat route access and data access as related but separate concerns.

## Important Integrations

- first-party email/password auth with SpacetimeDB-backed sessions and email verification
- local-only SpacetimeDB via generated TypeScript bindings and server-side connection helpers
- UploadThing for trip image uploads
- Google Geocoding API for forward and reverse geocoding
- Google Places autocomplete in the itinerary planner through `AutocompleteSuggestion.fetchAutocompleteSuggestions()` and per-row session tokens
- Google Place Details metadata for planner-selected stops through the new `Place` class and `fetchFields()`
- Google Maps JS API for trip maps and planner maps
- Google Maps advanced markers for trip and planner map markers; `components/google-map-advanced-marker.tsx` treats marker construction as map/library lifetime, while position, title, and category changes update mutable marker fields and popup content is built lazily on click
- shared canvas loading UI now backs globe and map loading states; map marker children are gated until Google Maps reports the base map idle
- `react-globe.gl` behind a client-only wrapper, with a local `three` compatibility shim and both webpack/Turbopack aliasing

## Evolution So Far

- PR #1 established auth, Prisma, navbar, and the first authenticated shell.
- PR #2 introduced the `Trip` model, trip creation, and UploadThing.
- PR #3 introduced the real planner surface: dashboard, trip detail, locations, itinerary ordering, map, globe, and `/api/trips`.
- PR #4 added the repo-local Codex skills/workflow layer.
- PR #5 added settings, theme persistence, avatar menu, and semantic theme styling.
- PR #6 stabilized globe loading after direct `/globe` loads hit browser-only import and `THREE.Clock()` compatibility problems; final code uses a dynamic client wrapper plus webpack and Turbopack aliases for the shim.
- PR #7 recalibrated the committed brain evidence and workflow notes without changing runtime architecture.
- PR #8 replaced the narrow add-location path with the current itinerary planner: create/edit routes, `Location.scheduledDate` date keys, Google Places autocomplete, planner maps, transactional create/save actions, and same-day ordering.
- PR #9 updated brain documentation and briefings only; it did not change runtime architecture.
- PR #10 merged the `ItineraryEnhancement` work: richer planner stop cards, `Location` Google place metadata plus optional category/rating/cost-feel/notes fields, Google Maps advanced markers, shared accessible canvas loaders, and modern Places autocomplete/details APIs.
- On the migration branch, the old Prisma/Postgres path has been replaced by first-party auth plus local-only SpacetimeDB reducers, procedures, generated bindings, and session helpers.

## Important Constraints And Tradeoffs

- SpacetimeDB schema or reducer changes require a local publish plus binding regeneration.
- UploadThing config is split between route handler setup and client helper usage.
- external image hosts must match `next.config.ts`.
- Next.js 16 behavior changes should be checked against bundled docs before major routing or rendering changes.
- the globe feature now depends on custom bundler aliasing and a local shim, which is a fragile integration point.
- itinerary dates are stored as nullable `YYYY-MM-DD` strings on `Location`, not as a separate itinerary model.
- itinerary ordering is same-day ordering; cross-day drag-and-drop is intentionally outside the current UI and server action contract.
- itinerary stop metadata is structurally validated on save, but Google place IDs/types are still client-sourced from Place Details rather than server-revalidated.
- `/api/trips` currently trades implementation simplicity for latency and API cost by reverse-geocoding every stored location on each request.
- the branch intentionally excludes Maincloud, Neon, Docker Postgres, and hosted Postgres assumptions.

## Current Architecture Risks

- geocoding is used both on write and on read, increasing dependence on Google APIs
- `/api/trips` is the clearest current hotspot for latency and rate-limit risk
- Places autocomplete introduces another Google API configuration point for the browser key
- richer stop-card metadata increases the planner's reliance on Place Details `types` quality for category inference, with `GENERIC` as the fallback
- advanced markers require a map ID; local/test usage falls back to Google's `DEMO_MAP_ID`, but production custom-marker work should set `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`
- advanced marker rendering uses a parent Suspense boundary around marker lists and React `use()` for the marker library; keep future marker loading UI outside the GoogleMap child layer unless browser checks prove the fallback renders correctly there
- local development now depends on a running local SpacetimeDB instance and the expected local database/module naming
- legacy unscheduled locations can exist and require itinerary edit cleanup before they become fully scheduled itinerary rows
- theme support is cleanly integrated but only cookie-backed, not profile-backed
- settings avatar sizing still uses `size-18`; PR #6 review questioned whether that class is deterministic in this Tailwind setup

## Evidence Quality

- runtime boundaries above are well supported by current repo state and merged PR notes
- PR #1 through #6 now have GitHub metadata-backed raw notes; PR #8, PR #10, and PR #13 have post-merge raw notes with local merge evidence; direct commit `90cbe69` remains PR-less
- rationale is weaker than implementation evidence; where not explicit in raw notes or code comments, tradeoff framing should be treated as inference

## Primary Evidence

- [current state bootstrap raw note](../../raw/sessions/2026-04-10-current-state-bootstrap.md)
- [GitHub-backed recalibration raw note](../../raw/sessions/2026-04-10-current-state-bootstrap-2-github-recalibration.md)
- [PR #3 trip dashboard and location management raw note](../../raw/commits/2026-04-07-pr-3-trip-dashboard-location-management.md)
- [PR #6 globe loading and Three compatibility raw note](../../raw/commits/2026-04-08-pr-6-globe-loading-three-timer-compat.md)
- [PR #7 brain recalibration raw note](../../raw/commits/2026-04-11-pr-7-brain-sidequest-init.md)
- [PR #8 itinerary planner raw note](../../raw/commits/2026-04-11-pr-8-itinerary-planner.md)
- [PR #9 brain ingest and briefings raw note](../../raw/commits/2026-04-12-pr-9-brain-ingest-briefings.md)
- [richer itinerary stop cards raw note](../../raw/sessions/2026-04-14-richer-itinerary-stop-cards.md)
- [Google Maps modern API migration raw note](../../raw/sessions/2026-04-14-google-maps-modern-api-migration.md)
- [richer itinerary stop cards verification note](../../raw/verification/2026-04-14-richer-itinerary-stop-cards.md)
- [PR #10 itinerary maps and stop metadata raw note](../../raw/commits/2026-04-15-pr-10-improve-itinerary-maps-and-stop-metadata.md)
- [PR #13 local Docker Postgres raw note](../../raw/commits/2026-04-16-pr-13-local-docker-postgres.md)
- [local Docker Postgres decision](../decisions/2026-04-16-local-dev-docker-postgres.md)
- [local Docker Postgres verification](../../raw/verification/2026-04-16-local-docker-postgres.md)

## Related Risks

The canonical current risk status lives in [Risks](../risks.md). Keep this page focused on architecture shape and move recurring follow-up status there.
