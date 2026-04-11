# Now

Last updated: 2026-04-10

## Project State

Vacky is an early-stage Next.js App Router trip-planning application. The current product surface is real and coherent: GitHub-authenticated trip creation, trip listing and detail views, location planning with ordered itineraries, trip maps, a global travel globe, and browser-local theme settings.

The strongest evidence-backed feature areas are:

- auth via `next-auth` with GitHub and Prisma
- trip creation with optional UploadThing cover image
- authenticated dashboard and trip detail flows
- location creation through Google geocoding
- itinerary ordering via drag and drop
- map and globe visualization
- settings and light/dark theme support

## Current Technical Shape

- framework: Next.js 16 App Router
- runtime stack: React 19, TypeScript, Tailwind v4
- data: Prisma + Postgres via Neon adapter
- auth: next-auth v5 beta
- uploads: UploadThing
- external APIs: Google Maps/geocoding

## Recent History

- PR #1 established auth, Prisma, navbar, and the first authenticated shell.
- PR #2 added the `Trip` model, trip creation, and UploadThing image upload.
- PR #3 created most of the current product surface: real dashboard, trip detail, locations, itinerary ordering, map, globe, and `/api/trips`.
- PR #4 added the repo-scoped Codex skills/workflow layer.
- PR #5 added `/settings`, avatar menu, and cookie-backed theme persistence.
- PR #6 stabilized globe loading with dynamic client import, responsive sizing, and `three` compatibility workarounds.
- Direct master commit `90cbe69` added the committed `brain/` knowledge base, seeded raw PR/bootstrap evidence, created the first wiki pages, and wired brain maintenance into agent, review, and PR workflows.

## Brain State

The wiki is no longer just a scaffold. It now has a first source-backed pass for:

- current state
- architecture boundaries
- feature history through merged PRs #1 to #6
- current workflow-layer understanding, including the direct `90cbe69` brain bootstrap commit
- a first lint-style cleanup of overbroad route-auth wording and stale local-state phrasing
- GitHub metadata-backed recalibration for PRs #1 through #6, including PR bodies, review summaries/comments where available, and final merged diffs

It still has weak coverage for:

- explicit product rationale
- deployment assumptions
- experiments and failed paths
- decision records with named alternatives
- review-thread provenance for the direct brain bootstrap commit `90cbe69`
- manual browser-check completion evidence for the globe/settings changes

## Known Risks

- `app/api/trips/route.ts` geocodes every stored location on every request
- globe rendering depends on custom `three` aliasing and a local shim; PR #6 explains this was driven by `react-globe.gl`/`three-render-objects` using deprecated `THREE.Clock()` and by direct route loads evaluating browser-only code
- auth, Prisma schema, UploadThing, and map/geocoding boundaries remain high-risk areas
- repo README is still default template quality and should not be treated as project truth
- landing-page metadata and some branding copy are stale relative to the implemented product
- `/default-avatar.png` is referenced as a fallback but does not exist in `public/`
- `Trip.images` exists in schema but has no current user-facing flow
- the committed brain bootstrap came through direct master commit `90cbe69`, with no associated GitHub PR metadata or review-thread evidence found
- route-level auth behavior is not uniform; data boundaries are stronger than some page-level redirects
- `app/db.ts` still lacks an explicit `DATABASE_URL` runtime guard, which PR #1 review flagged
- `GlobeCanvasLoader` is visual-only and lacks the accessible loading announcement suggested during PR #6 review
- `app/settings/page.tsx` still uses `size-18` for avatar sizing, which PR #6 review questioned

## Recommended Next Actions

1. Run a focused query/lint pass for operational cleanup: stale metadata/branding, missing avatar fallback asset, `DATABASE_URL` fail-fast handling, globe loader accessibility, and `/api/trips` geocoding cost.
2. Add the first decision page only when a real alternative and accepted downside are evidenced, likely around geocoding persistence/caching or globe integration strategy.
3. Capture browser/manual verification raw notes for `/settings`, `/globe`, and trip creation so the brain is not only merge-history memory.
4. Keep direct commit `90cbe69` marked as PR-less unless GitHub later shows an association.
