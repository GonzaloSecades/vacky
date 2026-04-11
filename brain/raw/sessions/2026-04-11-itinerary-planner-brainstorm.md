# Itinerary Planner Brainstorm Session

Date: 2026-04-11

## Intent

Use the Vacky brain as context for a planning and brainstorming session around improving trip location management.

The session began from a broad idea:

- improve location entry with Google Maps autocomplete
- make existing locations visible during entry
- restructure itinerary from a single global ordered list into date-based day groups
- keep manual ordering only within the same day

The session ended with a more concrete feature:

- create and edit a trip itinerary through dedicated planner pages
- keep the data model simple by representing the itinerary as trip locations
- use Google Places autocomplete-only location selection
- require a date for every itinerary location
- support full CRUD only inside the itinerary edit workflow

## Brain Context Used

Files read during the planning session:

- `brain/wiki/now.md`
- `brain/wiki/index.md`
- `brain/wiki/log.md`
- `brain/wiki/features/current-surface.md`
- `brain/wiki/architecture/overview.md`
- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/agents/workflow.md`

Important current-state facts pulled from the brain:

- Vacky is an early-stage authenticated trip-planning app.
- Existing location creation is one-at-a-time and uses freeform address geocoding.
- Existing itinerary ordering is global drag-and-drop.
- Existing map and globe features depend on Google Maps/geocoding and should be treated as high-risk integration boundaries.
- Prisma schema changes and server/client boundary changes require careful verification.
- Meaningful behavior and schema changes should update the brain before PR-ready completion.

Code files inspected for grounding:

- `prisma/schema.prisma`
- `lib/actions/create-location.ts`
- `lib/actions/reorder-itinerary.ts`
- `lib/actions/get-trip-by-id.ts`
- `app/trips/[tripId]/itinerary/new/page.tsx`
- `app/trips/[tripId]/page.tsx`
- `components/new-location.tsx`
- `components/sortable-itinerary.tsx`
- `components/tripDetail.tsx`
- `components/map.tsx`
- `app/api/trips/route.ts`

## Key Session Decisions

### Itinerary Data Model

Accepted:

- do not add a separate `Itinerary` model
- a trip's itinerary is its `Location[]`
- add a scheduled date to `Location`
- keep `order`, but reinterpret it as order within a scheduled day

Reasoning:

- current Vacky architecture already treats locations as itinerary entries
- adding a separate itinerary model would add more domain complexity than the current product needs
- route/action names can still say "itinerary" without adding a new persistent entity

### Routes

Accepted:

- `/trips/[tripId]/itinerary/new` creates an itinerary for an existing trip
- `/trips/[tripId]/itinerary/edit` edits an existing itinerary
- both routes reuse the same planner layout with different initial data and action labels

### Trip Detail Behavior

Accepted:

- if a trip has no locations, the Itinerary tab should show `Create itinerary`
- it should not show the current `Add location` button in the empty state
- if a trip has locations, the Itinerary tab should show grouped itinerary content and an `Edit itinerary` action

### Planner UI

Accepted:

- split-screen layout
- left side: itinerary form/list
- right side: Google Map
- top-right action button
- repeated action button at the end of the form/map section
- one save/create action for the full planner state

### Google Places Autocomplete

Accepted:

- use Google Places autocomplete
- show at most 5 suggestions
- do not query until at least 3 characters are typed
- throttle or debounce query behavior
- only selected autocomplete suggestions are valid
- manual freeform typed location submission is not allowed in this version

Rejected for this version:

- manual typed fallback with server-side geocoding

Preserve as future improvement:

- allow manually typed locations if the server can geocode them safely

### Location Dates

Accepted:

- every itinerary location in new/edit flows must have one date
- the date must be inside the trip start/end range
- days can have any number of locations
- date handling should preserve selected calendar-day semantics
- do not introduce explicit UTC normalization behavior for this feature

Concern recorded:

- date-only values are risky when represented as `DateTime`; helpers should prevent accidental day shifts when parsing, grouping, sorting, or rendering

### Create And Edit Actions

Accepted:

- create uses a single `Create itinerary` action
- edit uses a single `Save itinerary` action
- create is enabled when there is at least one valid selected location
- save is enabled when there is at least one valid selected location
- editing includes adding, changing, and deleting locations
- deletion is scoped to itinerary edit, not a standalone location-management surface

The session briefly considered a minimum of two locations, but the final user decision was `locations > 0`.

### Map Behavior

Accepted:

- new planner map starts centered on Argentina with wide zoom
- with one selected marker, center/zoom reasonably on that marker
- with more than one selected marker, fit bounds across all markers
- after deleting or changing selected locations, update markers and bounds
- if there are no selected markers, return to the Argentina default view

Product rationale:

- Argentina default is an explicit MVP preference from the user.

### Reordering

Accepted:

- saved itinerary display can support drag-and-drop within the same day
- create/edit planner should not include drag-and-drop in this version
- cross-day drag-and-drop is out of scope

Preserve as future improvement:

- drag-and-drop directly inside the planner page

## Non-Goals From Session

- separate `Itinerary` model
- manual typed location fallback
- undated itinerary locations for new/edit flows
- UTC date normalization behavior
- cross-day drag-and-drop
- drag-and-drop in create/edit planner
- route optimization
- route lines
- travel duration estimates
- time-of-day scheduling
- persistent drafts
- duplicate detection
- collaboration or sharing
- standalone location management outside itinerary edit
- geocoding cache or `/api/trips` reverse-geocoding fix

## Risks Captured

- Date-only behavior can drift if implemented as naive UTC-midnight `DateTime` handling.
- Google Places autocomplete may require additional Google API configuration beyond the current map/geocode setup.
- Autocomplete-only submission blocks users if Google does not suggest the desired place.
- Full CRUD inside edit mode can expand quickly; keep it scoped to the planner.
- Bulk create/update should be transactional.
- Server actions must validate auth, ownership, trip existence, location IDs, date range, and selected-place payloads.
- Fit-bounds behavior needs browser verification because it depends on Google Maps client lifecycle.
- Existing legacy locations without scheduled dates require a migration/display strategy.

## Durable Output Created

Reusable brainstorm:

- `brain/outputs/brainstorms/2026-04-11-itinerary-planner-mvp.md`

Suggested future wiki promotion after implementation:

- `brain/wiki/features/current-surface.md`
- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/architecture/overview.md` if Maps/Places boundaries materially change
- `brain/wiki/now.md` if current state or risks change
- `brain/wiki/log.md`
