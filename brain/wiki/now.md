# Now

Last updated: 2026-04-15

## Project State

Vacky is an early-stage Next.js App Router trip-planning application. The current product surface is real and coherent: GitHub-authenticated trip creation, trip listing and detail views, date-grouped itinerary planning, trip maps, a global travel globe, and browser-local theme settings.

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
- PR #9 merged the 2026-04-12 brain ingest and briefings: post-merge PR #8 reconciliation, current-state and memory-first briefs, stronger evidence/output navigation, and the itinerary date-key decision. It changed brain documentation only, not runtime product behavior.
- The 2026-04-14 `ItineraryEnhancement` sprint added richer itinerary planner stop cards, Google-place-type-specific Maki itinerary icons, pastel Vacky-category map markers with compact metadata popups, long-itinerary add/focus ergonomics, Google place metadata persistence, controlled location category/cost enums, optional per-stop rating/cost-feel/notes, and a Google Maps modernization pass for advanced markers, `AutocompleteSuggestion`, and `Place.fetchFields()`. The advanced marker wrapper now avoids teardown for title, position, and category edits by updating mutable marker fields and building popup DOM lazily on click. The sprint also produced a schema-validated Cloud-based Map Styling JSON output for a quieter Vacky-focused Google base map. Prisma generation, lint, and production build passed again on 2026-04-15; manual browser verification was reported complete by the user and was not replayed by Codex during the PR-ready pass.

## Brain State

The wiki is no longer just a scaffold. It now has a first source-backed pass for:

- current state
- architecture boundaries
- merged PR history through PR #9, distinguishing runtime changes from workflow-only and brain-only changes
- current workflow-layer understanding, including the direct `90cbe69` brain bootstrap commit and PR #9 documentation pass
- a first lint-style cleanup of overbroad route-auth wording and stale local-state phrasing
- GitHub metadata-backed recalibration for PRs #1 through #6, including PR bodies, review summaries/comments where available, and final merged diffs
- PR #8 post-merge evidence, including GitHub PR body, review comments, final merge diff, branch verification notes, and a new date-key decision note
- raw implementation and verification notes for the 2026-04-14 richer itinerary stop cards sprint
- a raw competitor/memory-first reference artifact; it is source material only and not yet accepted product direction
- raw provenance for PR #7 and PR #9
- a central [risk register](risks.md)
- a separate [product direction](product/direction.md) page
- a first [memory-first experiment note](experiments/2026-04-12-memory-first-direction.md)

It still has weak coverage for:

- deployment assumptions
- experiments and failed paths beyond the first memory-first direction note
- decision records beyond the itinerary date-key decision
- review-thread provenance for the direct brain bootstrap commit `90cbe69`
- independently replayed browser-check evidence for the richer itinerary planner metadata flow, globe, settings, trip creation, and unauthorized mutation boundaries
- implementation evidence for whether very long itinerary editing needs the memoized `StopCard` refactor documented in `brain/raw/sessions/2026-04-15-itinerary-planner-stopcard-performance.md`
- live database/index inspection

## Highest Open Follow-Ups

[Risks](risks.md) is the canonical register. The highest-priority open items are:

- `RISK-002`: manual browser and hostile-client verification is still incomplete
- `RISK-003`: PR #8 planner map height needs verification or cleanup
- `RISK-001`: `/api/trips` reverse-geocodes every stored location on each request
- `RISK-005`: `/default-avatar.png` is referenced but missing
- `RISK-006`: `DATABASE_URL` lacks a clear fail-fast runtime guard
- `RISK-010`: memory-first direction is promising but not accepted product strategy

## Recommended Next Actions

1. Capture detailed browser/manual verification evidence when the next manual pass is run, especially for richer stop-card persistence, map markers, and hostile-client ownership boundaries.
2. Decide whether memory-first is accepted, rejected, or still exploratory; if accepted, create a real decision record before implementation.
3. Turn the top operational risks into scoped fixes: `/api/trips` geocoding cost, missing avatar fallback, `DATABASE_URL` guard, globe loader accessibility, and auth UX consistency.
4. Profile or manually stress-test 20+ stop itinerary editing before implementing the memoized `StopCard` split; use stable row-specific props and callbacks if the refactor becomes necessary.
5. Keep future PR/merge events paired with raw notes before mentioning them in wiki history.
6. Keep direct commit `90cbe69` marked as PR-less unless GitHub later shows an association.
