# Log

## 2026-04-10

- Initialized `brain/` as the first Vacky knowledge base instance.
- Added Karpathy-style separation between `raw/`, `wiki/`, `outputs/`, and `Operator/`.
- Seeded the wiki from the current repository structure and `AGENTS.md`.
- Established reusable ingest, query, and lint operating docs with prompt templates.
- Added PR-prep and post-merge brain sync guidance across the local Codex workflows and operator docs.
- Ingested the first raw bootstrap sources into the wiki.
- Rewrote current-state, architecture, feature-surface, and workflow pages from merged PR evidence and current repo state.
- Refreshed `wiki/now.md` to reflect merged PR history through PR #6 and current known risks.
- Preserved uncertainty where GitHub PR discussions were unavailable and local git history was the only evidence.
- Ran a wiki lint pass and tightened route-auth wording, stale local-state phrasing, and next-action recommendations without adding unsupported facts.
- Ingested raw note for direct master commit `90cbe69`, documenting the committed brain bootstrap, PR-less provenance, and updated workflow expectations in `agents/workflow.md` and `now.md`.
- Recalibrated raw PR notes #1 through #6 with GitHub PR metadata, PR bodies, review comments/summaries where available, and final merged diffs.
- Added a current-state bootstrap 2.0 raw note for the GitHub-backed recalibration and updated wiki pages for stronger globe, auth/data, feature-surface, and workflow provenance.

## 2026-04-11

- Implemented the scoped itinerary planner on `Feature-ItineraryPlanner`: nullable `Location.scheduledDate` string storage, transactional create/save itinerary actions, Google Places autocomplete planner UI, planner map fitting, grouped day sections, and same-day saved ordering.
- Updated current-surface, architecture, data/auth, and now pages to reflect itinerary-as-locations semantics, Google Places as a client boundary, date-only scheduled keys, and remaining manual verification needs.
- Prepared the itinerary planner branch for PR packaging with raw artifacts under `brain/raw/2026-04-11-itinerary-planner/` and recorded passing Prisma generation, lint, and production build verification.
- Addressed PR review feedback by renaming the cascade-only `Location.tripId` foreign-key migration directory so it no longer looks like the `scheduledDate` column migration.
- Reconciled PR #8 after merge to `master`: added a raw merge note, promoted the itinerary date-key decision, marked the itinerary planner as merged current behavior, preserved the unresolved planner-map height review risk, and treated `84f9abd`/Obsidian workspace changes as editor-state churn.
- Ran a knowledge-maintenance lint over `wiki/` against `raw/` and `outputs/`: added evidence/output navigation, corrected stale PR-history and weak-coverage wording, tightened product-surface gaps around scoped location editing, removed duplicate workflow-gap wording, and linked the itinerary date-key decision back to source material.

## 2026-04-13

- Added central `wiki/risks.md` so recurring risks, follow-ups, and verification status are not duplicated across core pages.
- Added `wiki/product/direction.md` and a memory-first experiment note to separate product direction from current implemented surface.
- Added missing raw provenance notes for PR #7 and PR #9, closing the gap where wiki history mentioned PR #7 without a matching raw note.
- Added `raw/verification/` conventions for browser, command, accessibility, and hostile-client checks.
- Added primary-evidence sections to core wiki pages and expanded output indexes so generated briefs remain discoverable without becoming canonical truth.
- Updated Obsidian hygiene by ignoring local workspace and graph state.

## 2026-04-14

- Implemented the `ItineraryEnhancement` sprint for richer itinerary stop cards: summary/expanded planner cards, long-itinerary add/focus ergonomics, Google place metadata persistence, controlled category/cost enums, and optional per-stop rating, cost-feel, and notes.
- Migrated Vacky's visible map markers to Google Maps advanced markers, autocomplete lookup to `AutocompleteSuggestion.fetchAutocompleteSuggestions()` with session tokens, and selected-place detail lookup to the new `Place.fetchFields()` API, preserving the existing planner metadata shape while clearing the legacy API path for future custom markers.
- Added Google-place-type-specific itinerary stop icons using curated Mapbox Maki SVG paths, while keeping the map marker abstraction category-level for Vacky marker families.
- Replaced default red Google map pins with custom pastel advanced markers keyed by Vacky's eight location categories.
- Added compact click popups to Vacky category markers showing stop name, rating, cost feel, and a Google Maps outbound link, with icon-only type tooltip behavior.
- Tuned category inference for broad Google address/admin types so locality, neighborhood, town-square, and named piazza/square route results become Vacky landmarks instead of generic places.
- Added direct map gesture handling plus a layered reset-to-markers control on planner and trip-detail maps.
- Replaced the invalid legacy Google Maps JavaScript style-array artifact with a schema-validated Cloud-based Map Styling JSON output for Vacky's focused itinerary map style.
- Optimized the custom advanced marker wrapper so marker library loading uses React `use()` under parent Suspense, marker construction is scoped to map/library lifetime, mutable marker fields handle title/position/category edits without teardown, and popup DOM is created lazily on click.
- Reused the globe spinner as a shared canvas loader for map loading states and delayed trip-detail/planner marker rendering until Google Maps reports the base map idle.
- Replaced the itinerary planner map's Argentina-specific default center with a location-derived initial center and neutral no-marker fallback.
- Added raw implementation and verification notes for the richer itinerary stop cards work.
- Updated current-surface, architecture overview, data/auth, and now pages to reflect the new itinerary planner metadata shape and the remaining browser/manual verification gap.
- Recorded passing Prisma generation, lint, and production build; browser/manual and hostile-client checks remain pending because the user chose to perform them manually.

## 2026-04-15

- Captured the future itinerary planner `StopCard` performance refactor path: split row cards into memoized children with stable callbacks and row-specific props if long itineraries around 20+ stops make parent-level VDOM creation noticeable.
- Ran the `ItineraryEnhancement` PR-ready pass: Prisma generation, lint, and production build passed with Node 22; manual browser verification was reported complete by the user and was not replayed by Codex in this session.
- Reconciled PR #10 after merge to `master`: added the raw merge note, marked `ItineraryEnhancement` as merged current state, preserved review-resolution evidence for `placeTypes` normalization and cloud map styling, resolved the accessible globe-loader risk, and narrowed landing polish risk to remaining `TripPlanner` CTA copy.
- Refined `brain/Operator/` workflow docs so query can produce implementation prompts, ingest uses a brain impact gate, post-merge brain PRs are treated as drift repair rather than default flow, and lint explicitly reduces brain bloat.
