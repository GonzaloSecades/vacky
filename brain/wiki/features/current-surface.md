# Current Surface

This page tracks the product surface that exists in the repo today, plus the short history needed to interpret how stable each area is.

## Current Product Shape

Vacky is currently an authenticated personal trip planner. It supports creating trips, creating and editing date-grouped itineraries from trip locations, viewing those locations on a map and globe, and adjusting a browser-local light/dark theme.

The landing page markets a broader planning experience, but current repo evidence supports a narrower surface than a full travel platform. There is no evidence yet of collaboration, bookings, budgeting, sharing, or broad trip editing/deletion. Location editing and deletion are scoped to the itinerary edit workflow.

## Routes And Behavior

### `/`

- public landing page
- server-rendered with auth-aware CTA behavior
- promises maps, itineraries, and drag-and-drop planning
- currently contains stale details:
  - metadata is still create-next-app default
  - lower CTA still says `TripPlanner`

### `/trips`

- authenticated dashboard
- lists user-owned trips server-side
- shows recent trips, counts, and empty-state create flow
- first shipped as a placeholder in PR #1 and became a real dashboard in PR #3

### `/trips/new`

- client-side trip creation form
- supports optional UploadThing cover image upload
- validates dates server-side through `createTrip`
- auth is enforced by the server action and UploadThing middleware, not by a visible route-level redirect in the page itself
- PR #2 explicitly called route-level protection for this page a follow-up
- shipped in PR #2

### `/trips/[tripId]`

- trip detail view with overview, itinerary, and map tabs
- reads one user-owned trip plus its locations on the server
- itinerary tab shows `Create itinerary` when the trip has no locations
- itinerary tab shows full trip-day sections, same-day manual ordering, and `Edit itinerary` when locations exist
- shipped in PR #3

### `/trips/[tripId]/itinerary/new`

- itinerary creation flow for an existing owned trip with no locations
- uses Google Places autocomplete; manual freeform location submission is not allowed
- requires a selected place, coordinates, and an in-range scheduled date for each new location
- saves all submitted locations through one server action and redirects back to trip detail
- shipped in PR #3
- materially revised in PR #8

### `/trips/[tripId]/itinerary/edit`

- itinerary editing flow for an existing owned trip with locations
- reuses the same planner as the create route
- supports adding, changing, dating, and deleting trip locations inside the itinerary workflow
- saves all changes transactionally through one server action
- shipped in PR #8

### `/globe`

- client-only global view of visited countries and location points
- depends on `/api/trips`
- authenticated data comes from `/api/trips`; the page itself is not documented as a server-auth redirect boundary
- concept shipped in PR #3
- reliability and bundler compatibility were materially revised in PR #6 after `react-globe.gl` caused browser-only import evaluation and transitive `THREE.Clock()` compatibility problems
- current implementation uses a client-only wrapper plus webpack/Turbopack aliases to a local `three` shim
- should be treated as working but integration-fragile
- current loader is visual-only and still needs an accessibility pass

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

### Location and itinerary management

- current itinerary workflow uses Google Places autocomplete, scheduled date keys, and DnD Kit
- saved itinerary display is grouped by full trip days
- manual ordering is limited to locations within the same scheduled day
- no separate itinerary model exists; a trip itinerary is represented by its locations

### Maps and globe visualization

- map is embedded in trip detail views
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

## Known UX And Product Gaps

- no evidence of trip editing or deletion
- location editing and deletion exist only inside the itinerary edit workflow
- no collaboration or sharing flows
- no manual typed-location fallback in the current itinerary planner
- no route optimization, route lines, time-of-day scheduling, duplicate detection, or persistent drafts
- planner map height may be brittle until the PR #8 review comment about `h-90`, `md:h-105`, and `lg:h-115` is resolved or browser-verified
- auth redirects/messages are not fully consistent across protected pages
- route-level auth behavior and data-level auth behavior differ across product routes
- missing `/default-avatar.png` undermines fallback avatar behavior
- settings avatar image uses `size-18`, which PR #6 review questioned as potentially non-deterministic
- globe loading spinner lacks an accessible loading announcement
- some landing-page branding/details do not match the implemented product

## Dependencies That Shape The Surface

- GitHub auth via NextAuth
- Prisma + Neon
- UploadThing
- Google Places autocomplete, Google geocoding, and Google Maps
- `react-globe.gl` plus local compatibility shim

## Evidence Quality

- current routes and feature behavior are strongly supported by current code
- feature history is supported by merged PR raw notes
- PR #8 added a raw competitor/memory-first reference, but it is explicitly not promoted to product truth yet
- rationale for product scope remains weak; current understanding should be treated as implementation-backed, not vision-backed
