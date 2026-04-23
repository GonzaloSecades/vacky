# Now

Last updated: 2026-04-23

## Project State

Vacky is an early-stage Next.js App Router trip-planning application. The current product surface is real and coherent: GitHub-authenticated trip creation, trip listing and detail views, date-grouped itinerary planning, trip maps, a global travel globe, browser-local theme settings, and a warmer travel-facing visual system across the main product surfaces.

The strongest evidence-backed feature areas are:

- auth via `next-auth` with GitHub and Prisma
- trip creation with optional UploadThing cover image
- authenticated dashboard and trip detail flows
- itinerary creation/editing through Google Places autocomplete, richer stop cards, and per-stop metadata
- same-day itinerary ordering via drag and drop
- map and globe visualization
- settings and light/dark theme support

## Current Technical Shape

- framework: Next.js 16 App Router
- runtime stack: React 19, TypeScript, Tailwind v4
- data: Prisma + Postgres; local development defaults to Docker Postgres via `@prisma/adapter-pg`, while Neon remains the preview/production and explicit cloud-like testing path via `@prisma/adapter-neon`
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
- PR #9 merged the 2026-04-12 brain ingest and briefings: post-merge PR #8 reconciliation, current-state and memory-first briefs, stronger evidence/output navigation, and the itinerary date-key decision. It changed brain documentation only, not runtime product behavior.
- PR #10 merged `ItineraryEnhancement`: richer itinerary planner stop cards, Google-place-type-specific Maki itinerary icons, pastel Vacky-category map markers with compact metadata popups, long-itinerary add/focus ergonomics, Google place metadata persistence, controlled location category/cost enums, optional per-stop rating/cost-feel/notes, shared accessible canvas loaders, Vacky app metadata, and a Google Maps modernization pass for advanced markers, `AutocompleteSuggestion`, and `Place.fetchFields()`. The final head commit resolved review feedback by filtering/de-duping persisted `placeTypes`; the trip-detail map terrain comment was intentionally handled through cloud map styling rather than restoring `mapTypeId="terrain"`. Prisma generation, lint, production build, and `git diff --check` passed before merge; manual browser verification was reported complete by the user and was not replayed by Codex.
- On 2026-04-16, local Docker Postgres was accepted and implemented as the pre-alpha local development direction: Docker Compose owns the local Postgres service, `npm run dev` runs a pre-dev health gate, Prisma runtime adapter selection supports both local Postgres and Neon, and safe placeholder env docs were added. Wrap-up verification confirmed a healthy local container and `npx prisma migrate dev` against the explicit local URL.
- On 2026-04-21, the `DesignRefactor` branch applied a scoped UI experiment across the landing page, dashboard, trip creation flow, trip detail, itinerary planner, globe, navbar, shared primitives, and map chrome. The branch added a repo-root `DESIGN.md`, chose the warm coral travel palette, kept `Geist`, limited the Uber-style influence to planner/map utility surfaces, removed the stale `TripPlanner` landing CTA copy, and replaced the questioned planner map height classes with explicit supported arbitrary heights. Lint and production build both passed; final browser/manual coverage was approved by the user on 2026-04-23 and Codex did not replay Playwright at user direction.

## Brain State

The wiki is no longer just a scaffold. It now has a first source-backed pass for:

- current state
- architecture boundaries
- merged PR history through PR #13, distinguishing runtime changes from workflow-only and brain-only changes
- current workflow-layer understanding, including the direct `90cbe69` brain bootstrap commit and PR #9 documentation pass
- a first lint-style cleanup of overbroad route-auth wording and stale local-state phrasing
- GitHub metadata-backed recalibration for PRs #1 through #6, including PR bodies, review summaries/comments where available, and final merged diffs
- PR #8, PR #10, and PR #13 post-merge evidence, including final merge diffs, branch verification notes, and promoted durable wiki updates
- raw implementation and verification notes for the 2026-04-14 richer itinerary stop cards sprint
- a raw competitor/memory-first reference artifact; it is source material only and not yet accepted product direction
- raw provenance for PR #7 and PR #9
- a central [risk register](risks.md)
- a separate [product direction](product/direction.md) page
- a first [memory-first experiment note](experiments/2026-04-12-memory-first-direction.md)
- a local development database decision, implementation prompt, and verification note for Docker Postgres
- a trip photos tab brainstorm as a promote-candidate memory-first implementation shape, not accepted product truth

It still has weak coverage for:

- deployment assumptions
- experiments and failed paths beyond the first memory-first direction note
- decision records beyond the itinerary date-key decision
- review-thread provenance for the direct brain bootstrap commit `90cbe69`
- independently replayed browser-check evidence for the richer itinerary planner metadata flow, settings, trip creation, and unauthorized mutation boundaries
- implementation evidence for whether very long itinerary editing needs the memoized `StopCard` refactor documented in `brain/raw/sessions/2026-04-15-itinerary-planner-stopcard-performance.md`
- live database/index inspection
- deployment-like Neon smoke evidence after the runtime adapter selection change
- raw evidence for the trip photos tab idea, which currently exists as a non-canonical brainstorm output rather than an accepted decision or implementation note

## Highest Open Follow-Ups

[Risks](risks.md) is the canonical register. The highest-priority open items are:

- `RISK-002`: independently replayed browser/manual and hostile-client verification is still incomplete
- `RISK-001`: `/api/trips` reverse-geocodes every stored location on each request
- `RISK-005`: `/default-avatar.png` is referenced but missing
- `RISK-010`: memory-first direction is promising but not accepted product strategy

## Recommended Next Actions

1. Keep closing `RISK-002` with independently replayed hostile-client and browser notes for broader auth/data boundaries beyond the `DesignRefactor` presentation pass.
2. Decide whether memory-first is accepted, rejected, or still exploratory; if accepted, create a real decision record before implementation.
3. Run a deployment-like Neon smoke check with a real Neon URL and `VACKY_DATABASE_DRIVER="neon"` before first preview/staging use.
4. Profile or manually stress-test 20+ stop itinerary editing before implementing the memoized `StopCard` split; use stable row-specific props and callbacks if the refactor becomes necessary.
5. Turn the top operational risks into scoped fixes: `/api/trips` geocoding cost, missing avatar fallback, and auth UX consistency.
6. Keep future PR/merge events paired with raw notes before mentioning them in wiki history.
7. Keep direct commit `90cbe69` marked as PR-less unless GitHub later shows an association.
