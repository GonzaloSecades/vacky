# Itinerary Dates And Reordering

> 24 nodes · cohesion 0.20

## Key Concepts

- **sortable-itinerary.tsx** (27 connections) — `components/sortable-itinerary.tsx`
- **itinerary-dates.ts** (25 connections) — `lib/itinerary-dates.ts`
- **reorder-itinerary.ts** (18 connections) — `lib/actions/reorder-itinerary.ts`
- **isDateKeyWithinRange()** (10 connections) — `lib/itinerary-dates.ts`
- **reorderItineraryDay()** (9 connections) — `lib/actions/reorder-itinerary.ts`
- **isItineraryDateKey()** (9 connections) — `lib/itinerary-dates.ts`
- **SortableItinerary()** (8 connections) — `components/sortable-itinerary.tsx`
- **formatItineraryDateKey()** (6 connections) — `lib/itinerary-dates.ts`
- **generateItineraryDateKeys()** (6 connections) — `lib/itinerary-dates.ts`
- **validateDateRange()** (5 connections) — `lib/actions/itinerary.ts`
- **sortItineraryLocations()** (5 connections) — `lib/itinerary-dates.ts`
- **DaySection()** (4 connections) — `components/sortable-itinerary.tsx`
- **addDaysToItineraryDateKey()** (4 connections) — `lib/itinerary-dates.ts`
- **compareItineraryDateKeys()** (4 connections) — `lib/itinerary-dates.ts`
- **dateToItineraryDateKey()** (4 connections) — `lib/itinerary-dates.ts`
- **groupLocationsByScheduledDate()** (4 connections) — `lib/itinerary-dates.ts`
- **parseDateKeyParts()** (4 connections) — `lib/itinerary-dates.ts`
- **dateKeyToLocalDate()** (3 connections) — `lib/itinerary-dates.ts`
- **padDatePart()** (3 connections) — `lib/itinerary-dates.ts`
- **sortLocationsWithinDay()** (3 connections) — `lib/itinerary-dates.ts`
- **SortableItem()** (2 connections) — `components/sortable-itinerary.tsx`
- **ScheduledLocationLike** (1 connections) — `lib/itinerary-dates.ts`
- **TripDateRangeSource** (1 connections) — `lib/itinerary-dates.ts`
- **ref_dnd_kit_utilities** (1 connections)

## Relationships

- [Itinerary Routes And Planning](Itinerary_Routes_And_Planning.md) (7 shared connections)
- [Itinerary Planner Form](Itinerary_Planner_Form.md) (7 shared connections)
- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (6 shared connections)
- [Itinerary Server Actions](Itinerary_Server_Actions.md) (6 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (5 shared connections)
- [Planner Client Type Contracts](Planner_Client_Type_Contracts.md) (3 shared connections)
- [Historical Itinerary Merge Evidence](Historical_Itinerary_Merge_Evidence.md) (3 shared connections)
- [Application Package Configuration](Application_Package_Configuration.md) (2 shared connections)
- [Globe UI And Loaders](Globe_UI_And_Loaders.md) (2 shared connections)
- [Trips API And Geocoding](Trips_API_And_Geocoding.md) (2 shared connections)
- [Google Maps Modernization Evidence](Google_Maps_Modernization_Evidence.md) (2 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (2 shared connections)

## Source Files

- `components/sortable-itinerary.tsx`
- `lib/actions/itinerary.ts`
- `lib/actions/reorder-itinerary.ts`
- `lib/itinerary-dates.ts`

## Audit Trail

- EXTRACTED: 109 (99%)
- INFERRED: 1 (1%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `components_sortable_itinerary` | sortable-itinerary.tsx | `components/sortable-itinerary.tsx` | not_tagged |
| `components_sortable_itinerary_daysection` | DaySection() | `components/sortable-itinerary.tsx` | not_tagged |
| `components_sortable_itinerary_sortableitem` | SortableItem() | `components/sortable-itinerary.tsx` | not_tagged |
| `components_sortable_itinerary_sortableitinerary` | SortableItinerary() | `components/sortable-itinerary.tsx` | not_tagged |
| `lib_actions_itinerary_validatedaterange` | validateDateRange() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_reorder_itinerary` | reorder-itinerary.ts | `lib/actions/reorder-itinerary.ts` | not_tagged |
| `lib_actions_reorder_itinerary_reorderitineraryday` | reorderItineraryDay() | `lib/actions/reorder-itinerary.ts` | not_tagged |
| `lib_itinerary_dates` | itinerary-dates.ts | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_adddaystoitinerarydatekey` | addDaysToItineraryDateKey() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_compareitinerarydatekeys` | compareItineraryDateKeys() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_datekeytolocaldate` | dateKeyToLocalDate() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_datetoitinerarydatekey` | dateToItineraryDateKey() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_formatitinerarydatekey` | formatItineraryDateKey() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_generateitinerarydatekeys` | generateItineraryDateKeys() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_grouplocationsbyscheduleddate` | groupLocationsByScheduledDate() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_isdatekeywithinrange` | isDateKeyWithinRange() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_isitinerarydatekey` | isItineraryDateKey() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_paddatepart` | padDatePart() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_parsedatekeyparts` | parseDateKeyParts() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_scheduledlocationlike` | ScheduledLocationLike | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_sortitinerarylocations` | sortItineraryLocations() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_sortlocationswithinday` | sortLocationsWithinDay() | `lib/itinerary-dates.ts` | not_tagged |
| `lib_itinerary_dates_tripdaterangesource` | TripDateRangeSource | `lib/itinerary-dates.ts` | not_tagged |
| `ref_dnd_kit_utilities` | ref_dnd_kit_utilities | `` | not_tagged |
