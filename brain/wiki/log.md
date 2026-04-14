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
