# Current Surface

This page tracks the product surface that exists in the repo today, plus the short history needed to interpret how stable each area is.

## Current Product Shape

Vacky is currently an authenticated personal trip planner. It supports creating and deleting user-owned trips, creating and editing date-grouped itineraries from trip locations, viewing those locations on a map and globe, and adjusting a browser-local light/dark theme.

The landing page markets a broader planning experience, but current repo evidence supports a narrower surface than a full travel platform. There is no evidence yet of collaboration, bookings, budgeting, sharing, or broad trip editing. Full-trip deletion now exists from trip detail; location editing and deletion remain scoped to the itinerary edit workflow. Product-direction questions live in [Product Direction](../product/direction.md), not on this implementation-surface page.

## Routes And Behavior

### `/`

- public landing page
- server-rendered with auth-aware CTA behavior
- unauthenticated CTA now points to local sign-up instead of GitHub auth
- now uses the `Twilight Postcards` landing direction: plum-led accents, serif editorial headlines, paper-like panels, and postcard-style story blocks instead of the earlier generic blue SaaS-style layout
- markets maps, itineraries, and globe-backed trip memory/planning more coherently with the current product shape
- app metadata now uses Vacky naming

### `/sign-up`

- public first-party account creation page
- posts to the local sign-up route handler
- collects full name, country, email, and password

### `/sign-in`

- public first-party sign-in page
- posts to the local sign-in route handler
- returns users to the trip dashboard after session creation

### `/verify-email`

- public verification-status page for the first-party auth flow
- accepts the emailed verification link and reports verification errors in-page when present

### `/trips`

- authenticated dashboard
- lists user-owned trips server-side
- accepts a transient `deleted=trip` success state so a just-deleted trip can land back on the dashboard with a confirmation toast before the URL is cleaned
- now presents recent trips as a more image-first browse surface with stronger summary stats, travel-card treatment, and a polished empty-state create flow
- first shipped as a placeholder in PR #1 and became a real dashboard in PR #3

### `/trips/new`

- client-side trip creation form
- supports optional UploadThing cover image upload
- now uses the shared `Twilight Postcards` form shell, richer editorial copy/layout, and a styled upload preview area that still preserves the existing create-trip flow
- validates dates server-side through `createTrip`
- auth is enforced by the server action and UploadThing middleware, not by a visible route-level redirect in the page itself
- PR #2 explicitly called route-level protection for this page a follow-up
- shipped in PR #2

### `/trips/[tripId]`

- trip detail view with overview, itinerary, and map tabs
- reads one user-owned trip plus its locations on the server
- now uses a stronger image-first trip hero, summary panels, cleaner tab chrome, and more polished overview/empty-state presentation, including lighter commemorative status treatment for trip state
- now exposes a delete affordance in the hero for the current trip, guarded by a confirmation dialog
- successful deletion removes the owned trip and its saved locations, then returns to `/trips` with a success toast
- itinerary tab shows `Create itinerary` when the trip has no locations
- itinerary tab shows full trip-day sections, same-day manual ordering, and `Edit itinerary` when locations exist
- shipped in PR #3

### `/trips/[tripId]/itinerary/new`

- itinerary creation flow for an existing owned trip with no locations
- uses Google Places autocomplete; manual freeform location submission is not allowed
- requires a selected place, coordinates, and an in-range scheduled date for each new location
- planner stop cards now have summary and expanded states
- selected Google places store place ID, place types, and inferred place category metadata
- stop-card icons use Google place types for a more specific itinerary icon while preserving the stored Vacky category
- broad Google admin/address types such as cities, neighborhoods, town squares, and named piazzas are treated as landmarks instead of generic places
- expanded stop cards support optional `Your rating`, `Cost feel`, and notes
- saves all submitted locations through one server action and redirects back to trip detail
- shipped in PR #3
- materially revised in PR #8
- enriched with richer stop-card metadata in PR #10

### `/trips/[tripId]/itinerary/edit`

- itinerary editing flow for an existing owned trip with locations
- reuses the same planner as the create route
- supports adding, changing, dating, and deleting trip locations inside the itinerary workflow
- saves all changes transactionally through one server action
- loads and saves existing category, rating, cost-feel, and notes metadata
- unchanged existing locations can still save without a fresh autocomplete selection, while new or changed locations still require autocomplete
- shipped in PR #8
- enriched with richer stop-card metadata in PR #10

### `/globe`

- client-only global view of visited countries and location points
- depends on `/api/trips`
- authenticated data comes from `/api/trips`; the page itself is not documented as a server-auth redirect boundary
- now uses the same `Twilight Postcards` shell language as the landing, dashboard, and trip-detail surfaces while keeping utility-heavy globe/map controls more restrained
- concept shipped in PR #3
- reliability and bundler compatibility were materially revised in PR #6 after `react-globe.gl` caused browser-only import evaluation and transitive `THREE.Clock()` compatibility problems
- current implementation uses a client-only wrapper plus webpack/Turbopack aliases to a local `three` shim
- should be treated as working but integration-fragile
- globe loading now uses the shared `CanvasLoader` with status semantics and screen-reader text

### `/settings`

- authenticated settings page
- shows local account summary, verification state, and avatar fallback
- supports light/dark theme selection
- theme is stored in a browser cookie and applied server-side before render
- shipped in PR #5

### API surface supporting visible features

- `/api/auth/sign-up`
- `/api/auth/sign-in`
- `/api/auth/sign-out`
- `/api/auth/verify-email`
- `/api/uploadthing`
- `/api/trips`

## Feature Areas

### Authenticated trip planning

- strongest current feature area
- includes trip creation, trip listing, trip deletion, trip detail, itinerary create/edit, and same-day location ordering
- the light-theme travel-facing surfaces now share one `Twilight Postcards` visual system across landing, dashboard, trip detail, itinerary planner, and globe: plum primary actions, paper-like panels, serif display moments, and darker utility contrast reserved for map/planner-heavy areas

### Location and itinerary management

- current itinerary workflow uses Google Places autocomplete, scheduled date keys, and DnD Kit
- planner stop cards support collapsed summaries and expanded editing details
- adding a stop scrolls/focuses the new card, tablet/desktop users get a secondary add button below the sticky planner map when the main `Locations` heading/action block is out of view, and phone users get a bottom add button near the final save action
- Place Details metadata now feeds stored `Location.placeId`, `Location.placeTypes`, and inferred `Location.placeCategory`
- itinerary card icons use a curated Maki POI icon chosen from Google `placeTypes`; map markers remain category-level for future Vacky marker families
- Vacky applies travel-specific fallbacks for broad Google types so saved destinations like cities, neighborhoods, squares, and piazzas avoid the generic `Place` label
- optional per-stop `Your rating`, `Cost feel`, and notes are part of the planner create/edit flow
- saved itinerary display is grouped by full trip days
- manual ordering is limited to locations within the same scheduled day
- no separate itinerary model exists; a trip itinerary is represented by its locations

### Maps and globe visualization

- map is embedded in trip detail views
- trip-detail and planner maps use Google advanced markers with custom pastel category markers based on Vacky's location categories
- clicking trip-detail or planner map markers opens a compact stop popup with the stop name, optional `Your rating`, optional `Cost feel`, a Google Maps outbound link, and an icon-only type affordance with a hover/focus tooltip
- the advanced marker wrapper loads the marker library through React `use()` under a parent Suspense boundary, keeps the Google marker object stable while position/title/category mutate, opts markers into `gmpClickable`, listens through `gmp-click`, and builds popup DOM lazily on click to avoid marker teardown during itinerary edits
- map loaders now reuse the globe spinner via a shared canvas loader, and trip-detail/planner markers wait for the base Google map to report idle before rendering
- the itinerary planner map no longer defaults to Argentina; its initial center is derived from selected itinerary marker coordinates, with only a neutral world fallback while no locations have been selected
- trip-detail and planner maps allow direct scroll/pinch exploration and include a layered `Reset` control to refit to the current location markers
- the planner map now uses explicit supported arbitrary height classes rather than the older `h-90`, `md:h-105`, and `lg:h-115` utilities questioned in PR #8 review
- globe gives a cross-trip country/point summary
- current risk is not feature absence but integration fragility and data-read cost

### Account and theme

- user menu and settings are present
- account auth is now first-party email/password plus verification instead of provider-linked OAuth
- theme is cookie-backed per browser, not persisted per user account

## Feature History Milestones

- PR #1: auth shell, navbar, placeholder `/trips`
- PR #2: trip creation and UploadThing
- PR #3: real dashboard, trip detail, locations, itinerary ordering, map, globe
- PR #4: workflow-only skills layer, tracked in [Agent Workflow](../agents/workflow.md)
- PR #5: settings, avatar menu, theme persistence
- PR #6: globe stabilization and `three` compatibility fixes
- PR #8: scoped itinerary planner with create/edit routes, Places autocomplete, date-grouped stops, planner map, and same-day ordering
- PR #10: richer itinerary stop cards, long-itinerary add/focus ergonomics, Google place metadata persistence, Google-place-type-specific itinerary icons, controlled location category/cost enums, optional rating/cost/notes fields, custom category-marker popups, modern Places APIs, and Google Maps advanced markers
- PR #15: presentation-focused design refactor across the main travel-facing surfaces, shared UI primitives, navbar, globe shell, planner/map chrome, and root `DESIGN.md`
- 2026-04-23 working branch `codex/design-md-twilight-postcards`: superseded the earlier coral/`Geist` experiment with the `Twilight Postcards` design spec, `Manrope` + `DM Serif Display` typography, plum/paper tokens, postcard-oriented landing/dashboard/detail/create/globe polish, and a small Google advanced-marker click API alignment

## Known UX And Product Gaps

- no evidence of trip editing
- full-trip deletion exists, but it is only available from trip detail and still needs explicit browser/manual verification on the local SpacetimeDB branch
- location editing and deletion exist only inside the itinerary edit workflow
- no collaboration or sharing flows
- no manual typed-location fallback in the current itinerary planner
- no route optimization, route lines, time-of-day scheduling, duplicate detection, or persistent drafts
- richer stop-card command verification passed, and manual browser verification was reported complete by the user; Codex did not replay browser automation during the PR-ready pass
- long itinerary planner sessions can still create VDOM for every stop when one row changes; if 20+ row trips become common or profiling shows row rendering pressure, the preferred future fix is a memoized `StopCard` child with stable row-specific props and callbacks
- auth redirects/messages are not fully consistent across protected pages
- route-level auth behavior and data-level auth behavior differ across product routes
- settings avatar image uses `size-18`, which PR #6 review questioned as potentially non-deterministic

## Dependencies That Shape The Surface

- first-party auth routes with SpacetimeDB-backed sessions and email verification
- local-only SpacetimeDB for persisted auth, trips, and locations
- UploadThing
- Google Places autocomplete, Google geocoding, and Google Maps
- `react-globe.gl` plus local compatibility shim

## Evidence Quality

- current routes and feature behavior are strongly supported by current code
- feature history is supported by merged PR raw notes plus the DesignRefactor experiment and verification notes
- PR #8 added a raw competitor/memory-first reference, but it is explicitly not promoted to product truth yet
- rationale for product scope remains weak; current understanding should be treated as implementation-backed, not vision-backed

## Primary Evidence

- [current state bootstrap raw note](../../raw/sessions/2026-04-10-current-state-bootstrap.md)
- [GitHub-backed recalibration raw note](../../raw/sessions/2026-04-10-current-state-bootstrap-2-github-recalibration.md)
- [PR #1 auth shell raw note](../../raw/commits/2026-03-31-pr-1-init-setup-auth-navbar-db.md)
- [PR #2 trip creation raw note](../../raw/commits/2026-03-31-pr-2-trip-creation-uploadthing.md)
- [PR #3 dashboard and location management raw note](../../raw/commits/2026-04-07-pr-3-trip-dashboard-location-management.md)
- [PR #5 settings and theme raw note](../../raw/commits/2026-04-08-pr-5-avatar-menu-settings-theme-foundation.md)
- [PR #6 globe stabilization raw note](../../raw/commits/2026-04-08-pr-6-globe-loading-three-timer-compat.md)
- [PR #8 itinerary planner raw note](../../raw/commits/2026-04-11-pr-8-itinerary-planner.md)
- [richer itinerary stop cards raw note](../../raw/sessions/2026-04-14-richer-itinerary-stop-cards.md)
- [richer itinerary stop cards verification note](../../raw/verification/2026-04-14-richer-itinerary-stop-cards.md)
- [PR #10 itinerary maps and stop metadata raw note](../../raw/commits/2026-04-15-pr-10-improve-itinerary-maps-and-stop-metadata.md)
- [Product Direction](../product/direction.md)
- [Risks](../risks.md)
- [DesignRefactor UI experiment](../experiments/2026-04-21-design-refactor-ui-experiment.md)
- [DesignRefactor verification note](../../raw/verification/2026-04-21-design-refactor-ui-experiment.md)
