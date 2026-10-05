# Log

## 2026-04-30

- Prepared the `TripDelete` branch for PR as a combined local-development change: full-trip deletion plus a `dev:local` workflow for standing up the local SpacetimeDB-backed app.
- Added a full-trip delete flow: trip-detail delete affordance, confirmation dialog, `deleteTrip` server action, reducer-backed ownership enforcement, location cleanup, and dashboard success toast handling.
- Tightened the delete UX so successful deletion replaces the detail route in history before returning to `/trips`, avoiding a back-navigation dead end to a just-deleted trip.
- Added the `dev:local` workflow and docs so one command can start local SpacetimeDB, wait for readiness, republish the module, regenerate bindings, and then launch Next.js.
- Fixed the `/trips` page auth guard during review follow-up so `getAllTrips()` no longer runs before the unauthenticated prompt branch and the sign-in message is reachable again.
- Aligned the local SpacetimeDB defaults on `127.0.0.1:3000` across `dev:local`, publish scripts, app config, and branch docs so IPv6-first `localhost` resolution cannot make readiness or local publish fail against a server bound to `127.0.0.1`.
- Synced `current-surface.md`, `architecture/data-and-auth.md`, and `now.md` so repo memory now reflects both the destructive trip-delete flow and the new local runtime workflow.

## 2026-04-29

- Refreshed the fullstack feature guide so its SpacetimeDB file-path references match the modular `spacetimedb/src/schema/`, `spacetimedb/src/modules/`, and `spacetimedb/src/shared/` layout instead of the old monolithic `schema.ts` and mixed-responsibility `index.ts`.
- Added a dedicated architecture explainer for how Next.js, app sessions, generated SpacetimeDB bindings, reducers, procedures, and tables interact, including high-level and end-to-end Mermaid diagrams for sign-up, verification, trip creation, and itinerary saving.
- Refactored the SpacetimeDB module from a monolithic `spacetimedb/src/schema.ts` plus mixed-responsibility `spacetimedb/src/index.ts` into domain-scoped `schema/`, `modules/`, and `shared/` folders while preserving reducer/procedure names and table/index definitions.
- Updated the data/auth architecture page and SpacetimeDB operator guide so repo memory now reflects the new composition-root `spacetimedb/src/index.ts` and the split schema/domain module layout.

## 2026-04-27

- Added a fullstack feature guide for implementing Vacky features across Next.js App Router, server actions, local SpacetimeDB reducers/procedures, generated bindings, UI, verification, and brain maintenance, using delete trips as the end-to-end example.
- Ran the final PR-wrap review for the SpacetimeDB migration branch against the live worktree, focusing on scope drift, brain sync, and Node 22 verification requirements.
- Resolved `RISK-005` on the branch by adding `public/default-avatar.png` for the existing user-menu and settings fallback image path.
- Refreshed stale wiki coverage in `now.md`, `risks.md`, `features/current-surface.md`, `architecture/overview.md`, and `agents/workflow.md` so current-state pages no longer describe NextAuth/Prisma/Docker Postgres as live runtime behavior on the migration branch.
- Addressed PR #17 review-driven hardening items: aligned session-cookie clearing with the write path, moved trip ownership validation ahead of geocoding in `addLocation`, validated location enums when mapping SpacetimeDB rows, added globe location-name fallbacks, handled duplicate-email sign-up races with a user-facing redirect, and removed an avoidable O(n*m) itinerary reorder check.

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

## 2026-04-16

- Accepted local Docker Postgres as the default pre-alpha local-development database direction while preserving Neon for preview/staging/production.
- Added a decision record, raw architecture rationale, and reusable sidequest implementation prompt for introducing Docker Compose, local-safe env examples, Prisma adapter selection, and verification around local Postgres.
- Added `RISK-013` to track that local development still depends on remote Neon until the sidequest is implemented.
- Implemented the local Docker Postgres sidequest: root Docker Compose service, committed placeholder env example, local DB lifecycle scripts, pre-dev Docker health gate, Prisma runtime adapter selection between `@prisma/adapter-pg` and `@prisma/adapter-neon`, and a clear `DATABASE_URL` guard.
- Recorded verification for the sidequest: Compose config, Docker startup and healthy container status, pre-dev health gate, Prisma generate, local `migrate dev`, lint, and production build passed; production build needed network access for Google Fonts.
- Synced the new `grill-me` repo skill into the skill index and workflow wiki, indexed the trip photos tab brainstorm as a non-canonical promote candidate, linked it from product direction, and corrected stale architecture overview wording left over from the local Docker Postgres merge.

## 2026-04-21

- Implemented the `DesignRefactor` UI experiment on branch `DesignRefactor`: added a repo-root `DESIGN.md`, retuned global tokens and shared UI primitives, and restyled the landing page, dashboard, trip creation flow, trip detail, sortable itinerary display, itinerary planner chrome, globe page, navbar, and map controls around an Airbnb-led warm travel direction with restrained Uber-style utility influence on map/planner surfaces.
- Replaced the planner map's previously questioned `h-90`, `md:h-105`, and `lg:h-115` classes with explicit supported arbitrary heights and removed the stale landing `TripPlanner` CTA copy.
- Recorded fresh verification evidence for the branch: Node 22 lint and production build passed, and final browser/manual coverage was approved by the user on 2026-04-23 while Codex skipped Playwright at user direction.
- Added a design experiment note plus current-surface, risk-register, and now-page updates so the brain reflects the branch's visual-state changes and the resolved `RISK-003`/`RISK-012` items.

## 2026-04-23

- Reconciled PR #15 after merge to `master`: final merge commit `2d31a81` matched branch head `9857838`, PR comments were empty, the Copilot review introduced no required follow-up, and the existing branch-level brain updates accurately captured the durable UI/design changes with only PR-number history wording refreshed.
- Updated the branch-level canonical brain for `codex/design-md-twilight-postcards`: replaced stale coral/`Geist` design-language references with the `Twilight Postcards` direction, refreshed current-surface and experiment notes for the plum/paper serif-led system, and recorded the small Google advanced-marker `gmp-click` alignment that shipped alongside the map chrome refresh.

## 2026-04-24

- Added a repo-local `spacetimedb-typescript-vacky` skill with a curated official-source index, Vacky-specific migration context, and a refresh script for the raw SpacetimeDB TypeScript AI rules plus `llms.txt`.
- Updated the SpacetimeDB operator guide and Operator README so future query/planning work starts from the new source pack instead of re-discovering migration context ad hoc.

## 2026-04-26

- Continued the SpacetimeDB migration branch under a strict local-only policy: branch defaults now target `http://localhost:3000` and local database `vacky-spacetimedb-local-dev`.
- Published the updated module locally, regenerated bindings, and landed the first real auth reducers/procedures for user registration, session creation/revocation, user lookup, session lookup, and email verification.
- Replaced the live session boundary with app-owned cookie auth backed by SpacetimeDB and added local sign-up/sign-in/sign-out/verify-email pages and route handlers.
- Rewired navbar, landing CTAs, account settings copy, and server session lookups away from GitHub-only `next-auth` assumptions while leaving trip/location Prisma paths in place for the next migration steps.
- Completed the remaining SpacetimeDB migration steps: trip/location writes now use reducers, dashboard/trip/globe reads use SpacetimeDB helpers, UploadThing/settings/supporting APIs use the first-party session boundary, and Prisma/Postgres/Docker Postgres/NextAuth/GitHub OAuth artifacts were deleted from live code and package metadata.
- Switched SpacetimeDB publishing from unstable anonymous identities to `spacetime login --server-issued-login http://localhost:3000 --no-browser`, moved the local database default to `vacky-spacetimedb-local-dev`, and kept the branch local-instance-only.
- Recorded Step 05 through Step 10 execution docs and refreshed `architecture/data-and-auth.md` plus `now.md` for the SpacetimeDB-native local branch state.
- Verified the cutover with local SpacetimeDB publish, binding generation, lint, production build, and a live-source search confirming no active Prisma/NextAuth/Postgres imports remain.

## 2026-06-11

- Added the repo-local `vacky-brain` operational skill with explicit `idea`, `plan`, `raw`, `sync`, `post-merge`, `lint`, and `graph` command prompts plus a helper script for copy-ready suggestions.
- Updated `AGENTS.md`, `CLAUDE.md`, `.codex/skills.md`, and the planning/implementation/review/wiki-maintenance checklists so agents proactively suggest brain commands during ongoing work and suggest `$graphify . --update` after meaningful brain, skill, architecture, or code changes.
- Refreshed the workflow wiki and now page so the brain records that graphify is a generated navigation layer while `brain/wiki/` remains the canonical project memory.

## 2026-10-02

- Documented the proposed [image storage and delivery optimization experiment](experiments/2026-10-02-image-storage-and-delivery-optimization.md) for future implementation: baseline measurements, upload-time variants, SpacetimeDB image metadata/tiny previews, CDN caching, initial server rendering, bounded authenticated subscriptions, rendering controls, verification, migration/rollback, and open decisions. Indexed the experiment; no runtime changes or measured performance claims. Graphify refresh is recommended after this brain addition.
- Installed Graphify `graphifyy` 0.9.73 in an isolated Python 3.12 tool environment and registered its global Codex skill plus eight reference files. Added root [GRAPHIFY.md](../../GRAPHIFY.md) with captured CLI/skill usage, command inventory, optional dependency notes, and the Vacky maintenance workflow. Verified version and an existing-graph query; documented the CLI's old node-ID migration warning. No graph refresh, project integration hooks, or application changes were performed.

## 2026-10-05

- Prepared the Graphify command reference and audited October 2 deep rebuild for a dedicated PR, including its source image/optimization proposal, extraction evidence, generated wiki, and historical backups. Rechecked graph endpoints, source coverage, and HTML export counts. Updated current operator guidance to distinguish the completed rebuild from installation-time migration warnings. AI feature drafts and the standalone redesign archive are packaged separately on branch `Push`; they are not indexed by this dated snapshot. No application or runtime changes were made.
