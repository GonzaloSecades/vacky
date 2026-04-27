# Now

Last updated: 2026-04-27

## Project State

Vacky is an early-stage Next.js App Router trip-planning application. The active SpacetimeDB migration branch has completed the local-only backend cutover: app-owned auth, sessions, trips, locations, itinerary writes, dashboard/trip reads, settings, uploads, and globe-supporting reads now use local SpacetimeDB plus thin Next.js orchestration.

The strongest evidence-backed feature areas are:

- local email/password auth backed by SpacetimeDB auth tables
- trip creation with optional UploadThing cover image
- authenticated dashboard and trip detail flows
- itinerary creation/editing through Google Places autocomplete, richer stop cards, and per-stop metadata
- same-day itinerary ordering via drag and drop
- map and globe visualization
- settings and light/dark theme support

## Current Technical Shape

- framework: Next.js 16 App Router
- runtime stack: React 19, TypeScript, Tailwind v4
- data: local-only SpacetimeDB at `http://localhost:3000`, database `vacky-spacetimedb-local-dev`
- app server: Next.js on `http://localhost:3001`
- auth: app-owned cookie sessions, password hashing, email verification, sign-in/sign-out routes, and SpacetimeDB-backed auth tables
- uploads: UploadThing, authorized through the first-party session helper
- external APIs: Google Maps, Google Places, geocoding, and optional email delivery

Prisma, Postgres, Docker Postgres, Neon adapter support, NextAuth, and GitHub OAuth have been removed from the live migration branch.

## Recent History

- PR #1 established auth, Prisma, navbar, and the first authenticated shell.
- PR #2 added the `Trip` model, trip creation, and UploadThing image upload.
- PR #3 created most of the current product surface: real dashboard, trip detail, locations, itinerary ordering, map, globe, and `/api/trips`.
- PR #4 added the repo-scoped Codex skills/workflow layer.
- PR #5 added `/settings`, avatar menu, and cookie-backed theme persistence.
- PR #6 stabilized globe loading with dynamic client import, responsive sizing, and `three` compatibility workarounds.
- Direct master commit `90cbe69` added the committed `brain/` knowledge base, seeded raw PR/bootstrap evidence, created the first wiki pages, and wired brain maintenance into agent, review, and PR workflows.
- PR #7 recalibrated the brain against GitHub metadata and final merged diffs for PRs #1 through #6.
- PR #8 merged the scoped itinerary planner from `Feature-ItineraryPlanner`.
- PR #10 merged `ItineraryEnhancement`: richer itinerary planner stop cards, Google-place-type-specific Maki itinerary icons, pastel Vacky-category map markers, metadata popups, long-itinerary ergonomics, Google place metadata persistence, controlled location metadata, and a Google Maps modernization pass.
- On 2026-04-16, local Docker Postgres was accepted and implemented as the pre-alpha local development direction on the old stack.
- PR #15 merged `DesignRefactor` on 2026-04-23.
- On 2026-04-24, the repo-local `spacetimedb-typescript-vacky` skill and source pack were added.
- On 2026-04-26, the SpacetimeDB migration branch completed auth, trip/location read-write cutover, side-system rewiring, old backend deletion, local module verification, and static readiness docs.

## Brain State

The wiki now has source-backed coverage for:

- current SpacetimeDB migration state
- architecture boundaries
- merged PR history through PR #15
- workflow-layer understanding and repo-local skills
- risk register and product direction separation
- local-only SpacetimeDB operator guidance
- raw execution docs for migration steps 01 through 10

It still has weak coverage for:

- browser/manual verification evidence for the completed SpacetimeDB migration branch
- hostile-client replay evidence for first-party auth, reducer ownership, UploadThing, and itinerary mutation boundaries
- deployment assumptions beyond local-only SpacetimeDB migration work
- live database/index inspection beyond publish/codegen success
- whether realtime subscriptions should replace some current server/procedure reads

## Highest Open Follow-Ups

[Risks](risks.md) is the canonical register. The highest-priority open items are:

- `RISK-002`: independently replayed browser/manual and hostile-client verification is still incomplete, now including the full SpacetimeDB migration branch.
- `RISK-001`: `/api/trips` reverse-geocodes every stored location on each request.
- `RISK-010`: memory-first direction is promising but not accepted product strategy.

## Recommended Next Actions

1. Run browser/manual verification against the fresh local SpacetimeDB database: sign-up, verify-email, sign-in, sign-out, trip creation, itinerary create/edit/reorder, UploadThing, settings, and globe.
2. Run hostile-client checks for auth routes, reducer-backed trip/location ownership, itinerary ID tampering, and UploadThing authorization.
3. Decide whether to add live SpacetimeDB subscriptions for dashboard/trip/globe UX or keep SSR/procedure reads for now.
4. Address `/api/trips` reverse-geocoding fan-out before larger location datasets.
5. Keep production/deployment design out of this local-only branch unless the branch scope changes explicitly.
