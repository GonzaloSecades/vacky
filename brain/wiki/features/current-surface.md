# Current Surface

This page tracks the product surface that exists in the repo today, plus the short history needed to interpret how stable each area is.

## Current Product Shape

Vacky is currently an authenticated personal trip planner. It supports creating trips, creating and editing date-grouped itineraries from trip locations, viewing those locations on a map and globe, and adjusting a browser-local light/dark theme.

The landing page markets a broader planning experience, but current repo evidence supports a narrower surface than a full travel platform. There is no evidence yet of collaboration, bookings, budgeting, sharing, or broad trip editing/deletion. Location editing and deletion are scoped to the itinerary edit workflow. Product-direction questions live in [Product Direction](../product/direction.md), not on this implementation-surface page.

## Routes And Behavior

### `/`

- public landing page
- server-rendered with auth-aware CTA behavior
- now uses a warmer travel-oriented hero plus discovery/detail sections instead of the earlier generic blue SaaS-style layout
- markets maps, itineraries, and globe-backed trip memory/planning more coherently with the current product shape
- app metadata now uses Vacky naming

### `/trips`

- authenticated dashboard
- lists user-owned trips server-side
- now presents recent trips as a more image-first browse surface with stronger summary stats, travel-card treatment, and a polished empty-state create flow
- first shipped as a placeholder in PR #1 and became a real dashboard in PR #3

### `/trips/new`

- client-side trip creation form
- supports optional UploadThing cover image upload
- now uses the shared warm travel-form styling, a richer layout shell, and a styled upload preview area
- validates dates server-side through `createTrip`
- auth is enforced by the server action and UploadThing middleware, not by a visible route-level redirect in the page itself
- PR #2 explicitly called route-level protection for this page a follow-up
- shipped in PR #2

### `/trips/[tripId]`

- trip detail view with overview, itinerary, and map tabs
- reads one user-owned trip plus its locations on the server
- now uses a stronger trip hero, summary panels, cleaner tab chrome, and more polished overview/empty-state presentation
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
- now uses the same travel-facing shell language as the landing, dashboard, and trip-detail surfaces instead of a more utility-only page wrapper
- concept shipped in PR #3
- reliability and bundler compatibility were materially revised in PR #6 after `react-globe.gl` caused browser-only import evaluation and transitive `THREE.Clock()` compatibility problems
- current implementation uses a client-only wrapper plus webpack/Turbopack aliases to a local `three` shim
- should be treated as working but integration-fragile
- globe loading now uses the shared `CanvasLoader` with status semantics and screen-reader text

### `/settings`

- authenticated settings page
- shows account/provider summary
- supports light/dark theme selection
- theme is stored in a browser cookie and applied server-side before render
- shipped in PR #5

### API surface supporting visible features

- `/api/auth/[...nextAuth]`
- `/api/uploadthing`
- `/api/trips`

## Feature Areas

### Authenticated trip planning

- strongest current feature area
- includes trip creation, trip listing, trip detail, itinerary create/edit, and same-day location ordering
- the light-theme travel-facing surfaces now share one warmer consumer-travel visual system across landing, dashboard, trip detail, itinerary planner, and globe

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
- the advanced marker wrapper loads the marker library through React `use()` under a parent Suspense boundary, keeps the Google marker object stable while position/title/category mutate, and builds popup DOM lazily on click to avoid marker teardown during itinerary edits
- map loaders now reuse the globe spinner via a shared canvas loader, and trip-detail/planner markers wait for the base Google map to report idle before rendering
- the itinerary planner map no longer defaults to Argentina; its initial center is derived from selected itinerary marker coordinates, with only a neutral world fallback while no locations have been selected
- trip-detail and planner maps allow direct scroll/pinch exploration and include a layered `Reset` control to refit to the current location markers
- the planner map now uses explicit supported arbitrary height classes rather than the older `h-90`, `md:h-105`, and `lg:h-115` utilities questioned in PR #8 review
- globe gives a cross-trip country/point summary
- current risk is not feature absence but integration fragility and data-read cost

### Account and theme

- user menu and settings are present
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

## Known UX And Product Gaps

- no evidence of trip editing or deletion
- location editing and deletion exist only inside the itinerary edit workflow
- no collaboration or sharing flows
- no manual typed-location fallback in the current itinerary planner
- no route optimization, route lines, time-of-day scheduling, duplicate detection, or persistent drafts
- richer stop-card command verification passed, and manual browser verification was reported complete by the user; Codex did not replay browser automation during the PR-ready pass
- long itinerary planner sessions can still create VDOM for every stop when one row changes; if 20+ row trips become common or profiling shows row rendering pressure, the preferred future fix is a memoized `StopCard` child with stable row-specific props and callbacks
- auth redirects/messages are not fully consistent across protected pages
- route-level auth behavior and data-level auth behavior differ across product routes
- missing `/default-avatar.png` undermines fallback avatar behavior
- settings avatar image uses `size-18`, which PR #6 review questioned as potentially non-deterministic

## Dependencies That Shape The Surface

- GitHub auth via NextAuth
- Prisma + Postgres, with local Docker Postgres for development and Neon for preview/production or explicit cloud-like local testing
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
