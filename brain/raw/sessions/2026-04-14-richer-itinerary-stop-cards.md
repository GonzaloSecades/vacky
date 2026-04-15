# Richer Itinerary Stop Cards

Date: 2026-04-14

Branch/sprint: `ItineraryEnhancement`, "Richer itinerary stop cards"

## Scope

Focused on the itinerary create/edit planner routes:

- `/trips/[tripId]/itinerary/new`
- `/trips/[tripId]/itinerary/edit`

Non-goals stayed out of scope: saved itinerary redesign, route optimization, route lines, time-of-day scheduling, cross-day or planner-side drag-and-drop, booking/collaboration/sharing, and `/api/trips` geocoding cleanup.

## Implemented Shape

- Added richer planner stop cards with summary and expanded states.
- Summary state includes stop index, selected place title, scheduled date, inferred category label, a Google-place-type-specific Maki icon, and compact rating/cost indicators when present.
- Expanded state keeps editable Google Places search and scheduled date controls, adds coordinates detail, optional `Your rating`, optional `Cost feel`, and optional notes with category-based placeholders.
- Improved long-itinerary add behavior: adding a stop scrolls the new card into view and focuses its location input.
- Added a desktop-only secondary `+ Add` button below the sticky planner map when the `Locations` heading/action block is out of the viewport.
- Added a mobile bottom `+ Add` button near the final save action, and tightened mobile width constraints so the save button and planner map keep right-side viewport spacing.
- Lowered the sticky side-map and secondary `+ Add` behavior to tablet-sized layouts so iPad viewports keep the map/add control alongside the itinerary list; sticky now lives on the side column and avoids an overflow-hidden ancestor.
- Kept the one-submit create/save flow, add/remove row behavior, selected-autocomplete-only validation for new and changed locations, same-day order assignment, and planner map marker behavior.
- Updated Google Place Details fields to request `formatted_address`, `geometry`, `name`, `place_id`, and `types`.
- Stores Google `place_id` as `Location.placeId`, Google `types` as `Location.placeTypes`, and infers `Location.placeCategory` from those types.
- The stop-card icon can be more granular than the stored Vacky category: Google `placeTypes` now choose a curated Maki POI icon for itinerary cards, while the map remains category-level for future Vacky marker families.
- Added a Vacky-side fallback for Google places that come back as administrative or address-like types. `locality`, `neighborhood`, and `town_square` now classify as `LANDMARK`, and title-based `route` results that look like named squares or piazzas also classify as `LANDMARK`.
- Existing saved `GENERIC` rows are re-inferred in planner and map display when their stored Google types/title now support a better Vacky category; saving the edit form persists the improved category.
- Planner and trip-detail maps now render custom advanced markers by Vacky category instead of Google's default red marker. The marker icons use the same category fallback icon set and a softened pastel palette:
  - `TRANSPORTATION`: sky
  - `ACCOMMODATION`: lavender
  - `FOOD`: peach
  - `LANDSCAPE`: sage
  - `LANDMARK`: butter
  - `SHOPPING`: rose
  - `ENTERTAINMENT`: periwinkle
  - `GENERIC`: stone
- Planner and trip-detail maps now use greedy gesture handling so users can scroll/zoom the map directly without the browser's Cmd/Ctrl-scroll prompt.
- Both map surfaces include a layered `Reset` control that refits the viewport to the current saved/planner markers after the user explores away.

## Data Shape

Added Prisma enums:

- `LocationPriceSentiment`: `FREE`, `CHEAP`, `MID_RANGE`, `EXPENSIVE`
- `LocationPlaceCategory`: `TRANSPORTATION`, `ACCOMMODATION`, `FOOD`, `LANDSCAPE`, `LANDMARK`, `SHOPPING`, `ENTERTAINMENT`, `GENERIC`

Added `Location` fields:

- `placeId String?`
- `placeTypes String[] @default([])`
- `placeCategory LocationPlaceCategory?`
- `appreciation Int?`
- `priceSentiment LocationPriceSentiment?`
- `notes String?`

The migration also adds a database check constraint so `appreciation` is null or between 1 and 5.

## Validation Notes

`lib/actions/itinerary.ts` now validates:

- `placeTypes` is an array of strings, defaulting missing values to `[]` for legacy compatibility.
- `placeCategory` is absent or one of the controlled category values; if absent but `placeTypes` is present, the server infers it.
- `priceSentiment` is absent or one of the controlled cost values.
- `appreciation` is absent or an integer from 1 through 5.

Existing auth, trip ownership, location ID, deleted ID, coordinate, autocomplete, retained-location, date-range, and same-day ordering validation remained in the action.

## Helper Boundary

Added `lib/location-metadata.ts` as the shared typed metadata helper for:

- controlled enum-like TypeScript unions
- cost labels: `Free`, `Cheap`, `Mid-Range`, `Expensive`
- category labels
- category-based notes placeholders
- Google place type to category inference
- Google place type to itinerary-card icon inference
- travel-specific fallback inference for broad Google address/admin types such as cities, neighborhoods, town squares, and piazzas

Itinerary-card place icons are UI-only in `components/itinerary-place-type-icon.tsx`, sourced from Mapbox Maki SVG paths under CC0. Core UI controls still use `lucide-react`.

Map marker icons are rendered through `components/google-map-advanced-marker.tsx` with `AdvancedMarkerElement.content`, using Vacky category-level icons and pastel category colors.

Shared map fit-bounds behavior lives in `lib/map-bounds.ts` so the initial focus and reset control use the same marker-fitting rules.

## Icon Sources

- Google Place Types (New): https://developers.google.com/maps/documentation/places/web-service/place-types
- Mapbox Maki: https://github.com/mapbox/maki
- Temaki expansion pack: https://github.com/rapideditor/temaki

## Open Verification

Command verification passed in this session. Browser/manual checks were intentionally left for the user after Playwright automation was skipped.
