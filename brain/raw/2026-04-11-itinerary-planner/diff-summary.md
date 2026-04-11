# Itinerary Planner Diff Summary

Date: 2026-04-11
Branch: `Feature-ItineraryPlanner`

## Product Changes

- `/trips/[tripId]/itinerary/new` now loads the itinerary planner for trips with no locations and redirects to edit when locations exist.
- `/trips/[tripId]/itinerary/edit` reuses the planner with existing locations and redirects to new when the trip has no locations.
- Trip detail actions now say create or edit itinerary depending on whether locations exist.
- Saved itinerary display is grouped by each trip day and supports drag-and-drop ordering within a day.

## Data And Server Changes

- `Location.scheduledDate` was added as an optional `String` date key.
- Itinerary create/save server actions authenticate the user, scope all mutations through an owned trip, validate submitted rows, reject invalid retained/deleted location IDs, and write changes transactionally.
- Same-day reorder validates the scheduled date, trip ownership, submitted location IDs, and day membership before updating order.
- Trip lookup orders locations by scheduled date and same-day order.

## Google Maps And Places Changes

- The planner uses Google Places autocomplete and place details in the browser.
- Shared Google Maps constants keep the script ID and `places` library consistent between the planner and trip maps.
- Trip and planner maps fit bounds for multiple markers and center single-marker cases.

## Prisma Changes

- `prisma/schema.prisma` adds nullable `Location.scheduledDate`.
- Migration `20260411170000_add_location_scheduled_date` adds the `scheduledDate` column.
- Migration `20260411052501_cascade_location_trip_fk` updates the `Location.tripId` foreign key to cascade deletes, aligning the database constraint with the current schema relation.

## Brain Changes

- Updated `brain/wiki/architecture/overview.md`.
- Updated `brain/wiki/architecture/data-and-auth.md`.
- Updated `brain/wiki/features/current-surface.md`.
- Updated `brain/wiki/now.md`.
- Appended `brain/wiki/log.md`.
- Updated `brain/outputs/brainstorms/2026-04-11-itinerary-planner-mvp.md` to record the string date-key decision and validation scope.
