# Itinerary Planner PR Status

Date: 2026-04-11
Branch: `Feature-ItineraryPlanner`
Base: `master`

## Worktree Status Before PR Packaging

`git status --short --branch` showed the branch on `Feature-ItineraryPlanner` with itinerary planner implementation changes, Prisma schema/migration changes, maintained brain updates, one incidental Obsidian workspace metadata change, and new itinerary planner files.

The incidental workspace metadata file is `brain/.obsidian/workspace.json`. It is not part of the packaging commit scope.

## Intended Scope

- Replace the old add-location route behavior with a create-itinerary planner for trips without locations.
- Add an edit-itinerary route for trips that already have locations.
- Add a shared itinerary planner client component with Google Places autocomplete, date selection, add/remove rows, and planner map markers.
- Persist itineraries as trip `Location` rows with nullable `scheduledDate` date keys and same-day `order`.
- Add server actions for create/save itinerary validation and transactional writes.
- Limit saved itinerary drag-and-drop reordering to locations within the same scheduled day.
- Share Google Maps script loading constants between trip maps and the planner.
- Update maintained brain pages for itinerary semantics, Google Places boundaries, date-key storage, and current risks.

## Out Of Scope

- Route optimization, route lines, time-of-day scheduling, persistent drafts, duplicate detection, and cross-day drag-and-drop.
- Manual freeform location submission in the planner.
- UploadThing, auth provider, theme, globe, and `/api/trips` reverse-geocoding changes.
