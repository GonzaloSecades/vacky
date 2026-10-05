# Itinerary Planner Form

> 21 nodes · cohesion 0.17

## Key Concepts

- **itinerary-planner.tsx** (58 connections) — `components/itinerary-planner.tsx`
- **ItineraryPlanner()** (25 connections) — `components/itinerary-planner.tsx`
- **itinerary/new/page.tsx** (14 connections) — `app/trips/[tripId]/itinerary/new/page.tsx`
- **inferPlaceCategory()** (10 connections) — `lib/location-metadata.ts`
- **NewItinerary()** (4 connections) — `app/trips/[tripId]/itinerary/new/page.tsx`
- **getDisplayCategory()** (4 connections) — `components/itinerary-planner.tsx`
- **isCompleteRow()** (4 connections) — `components/itinerary-planner.tsx`
- **createInitialRows()** (3 connections) — `components/itinerary-planner.tsx`
- **getMarkerFingerprint()** (3 connections) — `components/itinerary-planner.tsx`
- **getPlaceCategoryNotesPlaceholder()** (3 connections) — `lib/location-metadata.ts`
- **formatCoordinates()** (2 connections) — `components/itinerary-planner.tsx`
- **getSelectedPlaceDetails()** (2 connections) — `components/itinerary-planner.tsx`
- **isExistingLocationUnchanged()** (2 connections) — `components/itinerary-planner.tsx`
- **loadPlacesLibrary()** (2 connections) — `components/itinerary-planner.tsx`
- **toPayloadRows()** (2 connections) — `components/itinerary-planner.tsx`
- **looksLikeNamedSquare()** (2 connections) — `lib/location-metadata.ts`
- **initialActionState** (1 connections) — `components/itinerary-planner.tsx`
- **ItineraryPlannerProps** (1 connections) — `components/itinerary-planner.tsx`
- **ItineraryPlannerTrip** (1 connections) — `components/itinerary-planner.tsx`
- **PlaceSuggestion** (1 connections) — `components/itinerary-planner.tsx`
- **SelectedPlaceDetails** (1 connections) — `components/itinerary-planner.tsx`

## Relationships

- [Map Bounds And Places](Map_Bounds_And_Places.md) (11 shared connections)
- [Itinerary Routes And Planning](Itinerary_Routes_And_Planning.md) (9 shared connections)
- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (9 shared connections)
- [Location Metadata Contracts](Location_Metadata_Contracts.md) (8 shared connections)
- [Itinerary Dates And Reordering](Itinerary_Dates_And_Reordering.md) (7 shared connections)
- [Itinerary Server Actions](Itinerary_Server_Actions.md) (6 shared connections)
- [Planner Client Type Contracts](Planner_Client_Type_Contracts.md) (5 shared connections)
- [Advanced Map Markers](Advanced_Map_Markers.md) (4 shared connections)
- [Globe UI And Loaders](Globe_UI_And_Loaders.md) (4 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (2 shared connections)
- [Historical Itinerary Merge Evidence](Historical_Itinerary_Merge_Evidence.md) (2 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (2 shared connections)

## Source Files

- `app/trips/[tripId]/itinerary/new/page.tsx`
- `components/itinerary-planner.tsx`
- `lib/location-metadata.ts`

## Audit Trail

- EXTRACTED: 109 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `app_trips_tripid_itinerary_new_page` | itinerary/new/page.tsx | `app/trips/[tripId]/itinerary/new/page.tsx` | not_tagged |
| `app_trips_tripid_itinerary_new_page_newitinerary` | NewItinerary() | `app/trips/[tripId]/itinerary/new/page.tsx` | not_tagged |
| `components_itinerary_planner` | itinerary-planner.tsx | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_createinitialrows` | createInitialRows() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_formatcoordinates` | formatCoordinates() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_getdisplaycategory` | getDisplayCategory() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_getmarkerfingerprint` | getMarkerFingerprint() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_getselectedplacedetails` | getSelectedPlaceDetails() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_initialactionstate` | initialActionState | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_iscompleterow` | isCompleteRow() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_isexistinglocationunchanged` | isExistingLocationUnchanged() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_itineraryplanner` | ItineraryPlanner() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_itineraryplannerprops` | ItineraryPlannerProps | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_itineraryplannertrip` | ItineraryPlannerTrip | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_loadplaceslibrary` | loadPlacesLibrary() | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_placesuggestion` | PlaceSuggestion | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_selectedplacedetails` | SelectedPlaceDetails | `components/itinerary-planner.tsx` | not_tagged |
| `components_itinerary_planner_topayloadrows` | toPayloadRows() | `components/itinerary-planner.tsx` | not_tagged |
| `lib_location_metadata_getplacecategorynotesplaceholder` | getPlaceCategoryNotesPlaceholder() | `lib/location-metadata.ts` | not_tagged |
| `lib_location_metadata_inferplacecategory` | inferPlaceCategory() | `lib/location-metadata.ts` | not_tagged |
| `lib_location_metadata_lookslikenamedsquare` | looksLikeNamedSquare() | `lib/location-metadata.ts` | not_tagged |
