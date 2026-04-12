# Now

Last updated: 2026-04-11

## Project State

Vacky is an early-stage Next.js App Router trip-planning application. The current product surface is real and coherent: GitHub-authenticated trip creation, trip listing and detail views, date-grouped itinerary planning, trip maps, a global travel globe, and browser-local theme settings.

The strongest evidence-backed feature areas are:

- auth via `next-auth` with GitHub and Prisma
- trip creation with optional UploadThing cover image
- authenticated dashboard and trip detail flows
- itinerary creation/editing through Google Places autocomplete
- same-day itinerary ordering via drag and drop
- map and globe visualization
- settings and light/dark theme support

## Current Technical Shape

- framework: Next.js 16 App Router
- runtime stack: React 19, TypeScript, Tailwind v4
- data: Prisma + Postgres via Neon adapter
- auth: next-auth v5 beta
- uploads: UploadThing
- external APIs: Google Maps, Google Places, and geocoding

## Recent History

- PR #1 established auth, Prisma, navbar, and the first authenticated shell.
- PR #2 added the `Trip` model, trip creation, and UploadThing image upload.
- PR #3 created most of the current product surface: real dashboard, trip detail, locations, itinerary ordering, map, globe, and `/api/trips`.
- PR #4 added the repo-scoped Codex skills/workflow layer.
- PR #5 added `/settings`, avatar menu, and cookie-backed theme persistence.
- PR #6 stabilized globe loading with dynamic client import, responsive sizing, and `three` compatibility workarounds.
- Direct master commit `90cbe69` added the committed `brain/` knowledge base, seeded raw PR/bootstrap evidence, created the first wiki pages, and wired brain maintenance into agent, review, and PR workflows.
- PR #7 recalibrated the brain against GitHub metadata and final merged diffs for PRs #1 through #6.
- PR #8 merged the scoped itinerary planner from `Feature-ItineraryPlanner`: itineraries are scheduled trip locations, with create/edit routes, Places autocomplete, planner maps, same-day ordering, and passing Prisma generation, lint, and production build evidence from 2026-04-11.
- Commit `84f9abd` changed only `brain/.obsidian/workspace.json`; it is treated as editor-state churn, not product or architecture evidence.

## Brain State

The wiki is no longer just a scaffold. It now has a first source-backed pass for:

- current state
- architecture boundaries
- merged PR history through PR #8, distinguishing runtime changes from workflow-only and brain-only changes
- current workflow-layer understanding, including the direct `90cbe69` brain bootstrap commit
- a first lint-style cleanup of overbroad route-auth wording and stale local-state phrasing
- GitHub metadata-backed recalibration for PRs #1 through #6, including PR bodies, review summaries/comments where available, and final merged diffs
- PR #8 post-merge evidence, including GitHub PR body, review comments, final merge diff, branch verification notes, and a new date-key decision note
- a raw competitor/memory-first reference artifact; it is source material only and not yet accepted product direction

It still has weak coverage for:

- explicit product rationale
- deployment assumptions
- experiments and failed paths
- decision records beyond the itinerary date-key decision
- review-thread provenance for the direct brain bootstrap commit `90cbe69`
- manual browser-check completion evidence for itinerary, globe, and settings changes

## Known Risks

- `app/api/trips/route.ts` geocodes every stored location on every request
- Google Places autocomplete requires the browser Google Maps key to have the right Places capability enabled
- legacy unscheduled locations remain valid and can appear until edited into scheduled itinerary rows
- globe rendering depends on custom `three` aliasing and a local shim; PR #6 explains this was driven by `react-globe.gl`/`three-render-objects` using deprecated `THREE.Clock()` and by direct route loads evaluating browser-only code
- auth, Prisma schema, UploadThing, and map/geocoding boundaries remain high-risk areas
- repo README is still default template quality and should not be treated as project truth
- landing-page metadata and some branding copy are stale relative to the implemented product
- `/default-avatar.png` is referenced as a fallback but does not exist in `public/`
- `Trip.images` exists in schema but has no current user-facing flow
- the committed brain bootstrap came through direct master commit `90cbe69`, with no associated GitHub PR metadata or review-thread evidence found
- PR #8 merged Obsidian graph/workspace state despite review comments marking it as editor-local noise
- PR #8 review flagged the planner map container's `h-90`, `md:h-105`, and `lg:h-115` classes as potentially invalid Tailwind heights; current merged code still uses them
- route-level auth behavior is not uniform; data boundaries are stronger than some page-level redirects
- `app/db.ts` still lacks an explicit `DATABASE_URL` runtime guard, which PR #1 review flagged
- `GlobeCanvasLoader` is visual-only and lacks the accessible loading announcement suggested during PR #6 review
- `app/settings/page.tsx` still uses `size-18` for avatar sizing, which PR #6 review questioned

## Recommended Next Actions

1. Run manual browser verification for itinerary create/edit, Places autocomplete, planner map fitting and height, same-day ordering, and unauthorized mutation boundaries.
2. Resolve or explicitly verify the PR #8 planner map height review issue.
3. Run a focused query/lint pass for operational cleanup: stale metadata/branding, missing avatar fallback asset, `DATABASE_URL` fail-fast handling, globe loader accessibility, and `/api/trips` geocoding cost.
4. Capture browser/manual verification raw notes for itinerary planning, `/settings`, `/globe`, and trip creation so the brain is not only merge-history memory.
5. Decide whether the raw memory-first competitor analysis should be promoted into product rationale, a decision page, or left as raw source material.
6. Keep direct commit `90cbe69` marked as PR-less unless GitHub later shows an association.
