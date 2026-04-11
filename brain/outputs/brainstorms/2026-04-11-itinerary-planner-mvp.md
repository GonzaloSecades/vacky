# Itinerary Planner MVP Brainstorm

Date: 2026-04-11

## Session Summary

This brainstorm refined Vacky's next location-management feature from smarter single-location entry into a dedicated itinerary creation and editing workflow for an existing trip.

The accepted direction is to keep the existing data concept simple: a trip's itinerary is represented by its `Location[]`. There should be no separate `Itinerary` database model in this version.

The user-facing flow should be:

- a trip must already exist before an itinerary can be created
- when a trip has no locations, the Itinerary tab shows `Create itinerary` instead of `Add location`
- `/trips/[tripId]/itinerary/new` creates the first itinerary locations
- `/trips/[tripId]/itinerary/edit` edits existing itinerary locations
- both routes reuse the same split-screen planner layout
- saved itinerary display is grouped into trip-day sections
- manual ordering is limited to locations within the same saved day group

## Locked Product Decisions

- No separate `Itinerary` model.
- The itinerary is the trip's set of locations.
- Every itinerary location created or edited through this workflow must have a date.
- Location dates must be within the trip's `startDate` and `endDate`.
- Days can have any number of locations.
- Location creation is autocomplete-only for this version.
- Manual typed location submission is not allowed in this version.
- The planner saves through one action button, not per-row persistence.
- The create action is enabled when there is at least one valid selected location.
- Editing includes full CRUD inside the itinerary edit workflow:
  - add location
  - change selected location
  - change date
  - delete location
  - save all changes together
- Drag-and-drop belongs only to the final saved itinerary display for now, not the create/edit planner.
- Cross-day drag-and-drop is out of scope.
- New planner maps start centered on Argentina with a wide zoom.
- Once selected locations exist, the map updates as locations change.

## Map Behavior

New itinerary planner map behavior:

- default center: Argentina
- default zoom: wide country-level zoom
- with no markers, return to the Argentina default view
- with one selected marker, center and zoom reasonably on that marker
- with more than one selected marker, fit bounds across all selected markers
- after deleting or changing a location, update marker state and bounds

The Argentina default is an explicit product choice for MVP.

## Autocomplete Behavior

Google Places autocomplete should:

- query only after at least 3 typed characters
- debounce or throttle requests
- show at most 5 suggestions
- require choosing a suggestion before a row is valid
- populate the location label and coordinates from the selected suggestion

Submitting a manually typed but unselected location is not allowed in this version.

## Date Handling Decision

The session explicitly rejected adding UTC-normalization behavior for this feature.

The intended product rule is date-only semantics: a selected itinerary day should remain the selected calendar day when saved, grouped, and rendered.

Implementation should avoid UTC-midnight conversions that could shift the displayed day. If Prisma stores the field as `DateTime`, shared helpers should handle parsing, validation, grouping, sorting, and display consistently so the date behaves as a calendar date rather than a moment in time.

## Recommended Data Shape

The likely minimum schema change is adding a nullable scheduled date field to `Location` for migration safety:

```prisma
model Location {
  id            String   @id @default(cuid())
  locationTitle String
  lat           Float
  lng           Float
  trip          Trip     @relation(fields: [tripId], references: [id], onDelete: Cascade)
  tripId        String
  order         Int      @default(0)
  scheduledDate DateTime?
  createdAt     DateTime @default(now())
}
```

Product invariant:

- legacy rows may have `scheduledDate = null`
- new itinerary create/edit flows require `scheduledDate`
- `order` should be interpreted as ordering within the same scheduled date, not global trip order

## Recommended Scope

Build:

- `Create itinerary` empty state in the trip detail Itinerary tab
- `Edit itinerary` action when locations already exist
- `/trips/[tripId]/itinerary/new`
- `/trips/[tripId]/itinerary/edit`
- shared planner component for new/edit modes
- split-screen planner UI with form/list on the left and map on the right
- Places autocomplete with max 5 suggestions and min 3 characters
- selected-place-only validation
- required date per location
- date range validation against trip start/end
- transactional create action
- transactional update action with add/change/delete support
- saved itinerary grouped by generated trip days
- same-day drag-and-drop only on the saved itinerary display
- map marker updates and fit-bounds behavior in the planner

## Non-Goals

- separate `Itinerary` model
- manual typed location fallback
- undated itinerary locations for new/edit flows
- UTC date normalization behavior
- cross-day drag-and-drop
- drag-and-drop on the create/edit planner
- route optimization
- route lines
- travel duration estimates
- time-of-day scheduling
- persistent drafts
- duplicate detection
- collaboration or sharing
- standalone location management outside itinerary edit
- geocoding cache or `/api/trips` reverse-geocoding cleanup

## Future Improvements

Good follow-ups after the MVP:

- allow manual typed locations with server-side geocoding fallback
- add drag-and-drop directly inside the create/edit planner
- detect likely duplicate locations before saving
- center the initial planner map from richer trip destination metadata instead of always Argentina
- draw route lines between same-day locations
- improve autocomplete session-token usage if the selected Google API path supports it cleanly

## Likely Repo Areas

- `prisma/schema.prisma`
- `prisma/migrations/`
- `lib/actions/create-location.ts`
- `lib/actions/reorder-itinerary.ts`
- likely new `lib/actions/create-itinerary.ts`
- likely new `lib/actions/update-itinerary.ts`
- `lib/actions/get-trip-by-id.ts`
- `app/trips/[tripId]/itinerary/new/page.tsx`
- likely new `app/trips/[tripId]/itinerary/edit/page.tsx`
- `components/new-location.tsx`, likely replaced by a planner component
- `components/sortable-itinerary.tsx`
- `components/tripDetail.tsx`
- `components/map.tsx` or a planner-specific map component

## Verification Expectations

Implementation should run:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```

Manual checks should include:

- no-location trip shows `Create itinerary`
- existing-location trip shows grouped itinerary and `Edit itinerary`
- autocomplete waits until 3 characters
- autocomplete shows at most 5 suggestions
- unselected manual text cannot be saved
- create/save disabled until at least one valid location exists
- dates outside trip range are blocked
- map starts on Argentina
- one selected marker centers/zooms reasonably
- multiple selected markers fit bounds
- deleted or changed locations update markers and bounds
- edit page can add, change, and delete locations
- save persists after refresh
- same-day ordering works on saved display
- cross-day ordering is unavailable
- unauthorized users cannot mutate another user's trip locations

## Brain Follow-Up

When implemented, this feature should update:

- `brain/wiki/features/current-surface.md`
- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/architecture/overview.md` if the Maps/Places boundary changes materially
- `brain/wiki/now.md` if current state, risks, or next actions change
- `brain/wiki/log.md`
