# Current Surface

This page tracks the product surface that exists in the repo today, plus the short history needed to interpret how stable each area is.

## Current Product Shape

Vacky is currently an authenticated personal trip planner. It supports creating trips, adding ordered locations, viewing those locations on a map and globe, and adjusting a browser-local light/dark theme.

The landing page markets a broader planning experience, but current repo evidence supports a narrower surface than a full travel platform. There is no evidence yet of collaboration, bookings, budgeting, sharing, or deletion/edit management for core entities.

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
- shipped in PR #2

### `/trips/[tripId]`

- trip detail view with overview, itinerary, and map tabs
- reads one user-owned trip plus its locations on the server
- shipped in PR #3

### `/trips/[tripId]/itinerary/new`

- location-creation flow for a trip
- accepts freeform address input
- geocodes the address before persisting a `Location`
- shipped in PR #3

### `/globe`

- client-only global view of visited countries and location points
- depends on `/api/trips`
- authenticated data comes from `/api/trips`; the page itself is not documented as a server-auth redirect boundary
- concept shipped in PR #3
- reliability and bundler compatibility were materially revised in PR #6
- should be treated as working but integration-fragile

### `/settings`

- authenticated settings page
- shows account/provider summary
- supports light/dark theme selection
- shipped in PR #5

### API surface supporting visible features

- `/api/auth/[...nextAuth]`
- `/api/uploadthing`
- `/api/trips`

## Feature Areas

### Authenticated trip planning

- strongest current feature area
- includes trip creation, trip listing, trip detail, and location ordering

### Location and itinerary management

- relies on Google geocoding and DnD Kit
- works for ordered itinerary planning but is still narrow in scope

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
- PR #5: settings, avatar menu, theme persistence
- PR #6: globe stabilization and compatibility fixes

## Known UX And Product Gaps

- no evidence of trip editing or deletion
- no evidence of location editing or deletion
- no collaboration or sharing flows
- auth redirects/messages are not fully consistent across protected pages
- route-level auth behavior and data-level auth behavior differ across product routes
- missing `/default-avatar.png` undermines fallback avatar behavior
- some landing-page branding/details do not match the implemented product

## Dependencies That Shape The Surface

- GitHub auth via NextAuth
- Prisma + Neon
- UploadThing
- Google geocoding and Google Maps
- `react-globe.gl` plus local compatibility shim

## Evidence Quality

- current routes and feature behavior are strongly supported by current code
- feature history is supported by merged PR raw notes
- rationale for product scope remains weak; current understanding should be treated as implementation-backed, not vision-backed
