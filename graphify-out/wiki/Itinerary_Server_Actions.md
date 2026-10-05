# Itinerary Server Actions

> 20 nodes · cohesion 0.19

## Key Concepts

- **itinerary.ts** (46 connections) — `lib/actions/itinerary.ts`
- **saveItinerary()** (12 connections) — `lib/actions/itinerary.ts`
- **createItinerary()** (10 connections) — `lib/actions/itinerary.ts`
- **parseRows()** (10 connections) — `lib/actions/itinerary.ts`
- **normalizeOptionalPlaceCategory()** (4 connections) — `lib/actions/itinerary.ts`
- **applySameDayOrder()** (3 connections) — `lib/actions/itinerary.ts`
- **isExistingLocationUnchanged()** (3 connections) — `lib/actions/itinerary.ts`
- **normalizeOptionalPriceSentiment()** (3 connections) — `lib/actions/itinerary.ts`
- **parseDeletedLocationIds()** (3 connections) — `lib/actions/itinerary.ts`
- **parseJsonField()** (3 connections) — `lib/actions/itinerary.ts`
- **ensureCreateRowsHaveSelectedPlaces()** (2 connections) — `lib/actions/itinerary.ts`
- **ItineraryActionState** (2 connections) — `lib/actions/itinerary.ts`
- **normalizeOptionalInteger()** (2 connections) — `lib/actions/itinerary.ts`
- **normalizeOptionalString()** (2 connections) — `lib/actions/itinerary.ts`
- **normalizeStringArray()** (2 connections) — `lib/actions/itinerary.ts`
- **parseCoordinate()** (2 connections) — `lib/actions/itinerary.ts`
- **rejectDuplicateIds()** (2 connections) — `lib/actions/itinerary.ts`
- **sameCoordinates()** (2 connections) — `lib/actions/itinerary.ts`
- **ExistingLocation** (1 connections) — `lib/actions/itinerary.ts`
- **RawItineraryRow** (1 connections) — `lib/actions/itinerary.ts`

## Relationships

- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (8 shared connections)
- [Planner Client Type Contracts](Planner_Client_Type_Contracts.md) (7 shared connections)
- [Itinerary Dates And Reordering](Itinerary_Dates_And_Reordering.md) (6 shared connections)
- [Itinerary Planner Form](Itinerary_Planner_Form.md) (6 shared connections)
- [Authenticated Trip Create Actions](Authenticated_Trip_Create_Actions.md) (3 shared connections)
- [Itinerary Routes And Planning](Itinerary_Routes_And_Planning.md) (3 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (2 shared connections)
- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (1 shared connections)
- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (1 shared connections)
- [Location Metadata Contracts](Location_Metadata_Contracts.md) (1 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (1 shared connections)
- [Historical Reducer Write Migration](Historical_Reducer_Write_Migration.md) (1 shared connections)

## Source Files

- `lib/actions/itinerary.ts`

## Audit Trail

- EXTRACTED: 79 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `lib_actions_itinerary` | itinerary.ts | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_applysamedayorder` | applySameDayOrder() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_createitinerary` | createItinerary() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_ensurecreaterowshaveselectedplaces` | ensureCreateRowsHaveSelectedPlaces() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_existinglocation` | ExistingLocation | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_isexistinglocationunchanged` | isExistingLocationUnchanged() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_itineraryactionstate` | ItineraryActionState | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_normalizeoptionalinteger` | normalizeOptionalInteger() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_normalizeoptionalplacecategory` | normalizeOptionalPlaceCategory() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_normalizeoptionalpricesentiment` | normalizeOptionalPriceSentiment() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_normalizeoptionalstring` | normalizeOptionalString() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_normalizestringarray` | normalizeStringArray() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_parsecoordinate` | parseCoordinate() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_parsedeletedlocationids` | parseDeletedLocationIds() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_parsejsonfield` | parseJsonField() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_parserows` | parseRows() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_rawitineraryrow` | RawItineraryRow | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_rejectduplicateids` | rejectDuplicateIds() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_samecoordinates` | sameCoordinates() | `lib/actions/itinerary.ts` | not_tagged |
| `lib_actions_itinerary_saveitinerary` | saveItinerary() | `lib/actions/itinerary.ts` | not_tagged |
