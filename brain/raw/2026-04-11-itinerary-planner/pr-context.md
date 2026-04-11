# Itinerary Planner PR Context

Date: 2026-04-11
Head branch: `Feature-ItineraryPlanner`
Base branch: `master`

## PR Title

`[codex] Add itinerary planner create and edit flow`

## PR Body Draft

This PR replaces the narrow add-location flow with a scoped itinerary planner for a trip. Users can create an itinerary from Google Places autocomplete results, schedule each stop on a trip day, view selected stops on a planner map, and later edit, add, or delete stops through the same planner surface.

It stores itinerary scheduling directly on `Location` with a nullable `scheduledDate` date key. Existing rows remain migration-safe, while new planner submissions require a selected place, finite coordinates, and an in-range date. Saved itinerary ordering is interpreted within each scheduled day.

The server actions authenticate with `auth()`, scope all writes through a user-owned trip, validate retained and deleted location IDs, reject hostile payload shape, and write create/save operations transactionally. Same-day reorder now validates trip ownership, date range, submitted IDs, and scheduled-day membership before updating order.

Google Maps script loading now uses shared constants so the trip map and planner share the script ID and Places library configuration. Both maps fit bounds around multiple markers and center single-marker cases.

## Verification Plan

- Run `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`.
- If Prisma generated client state is stale, run `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate` and rerun lint.

## Manual Checks Recommended

- Create itinerary with multiple autocomplete-selected locations across multiple trip days.
- Edit existing itinerary by adding, changing, deleting, and dating stops.
- Confirm same-day drag-and-drop ordering persists.
- Confirm planner and trip maps load with a Google Maps browser key that has Places enabled.
- Confirm unauthorized users cannot mutate another user's trip or locations.
