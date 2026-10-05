# Server Trip Data Helpers

> 22 nodes · cohesion 0.21

## Key Concepts

- **spacetimedb/trips.ts** (37 connections) — `lib/spacetimedb/trips.ts`
- **withSpacetimeDbConnection()** (19 connections) — `lib/spacetimedb/server.ts`
- **getTripForUser()** (13 connections) — `lib/spacetimedb/trips.ts`
- **parseU64Id()** (11 connections) — `lib/spacetimedb/trips.ts`
- **createTripForUser()** (7 connections) — `lib/spacetimedb/trips.ts`
- **createItineraryForUser()** (6 connections) — `lib/spacetimedb/trips.ts`
- **listTripsForUser()** (6 connections) — `lib/spacetimedb/trips.ts`
- **saveItineraryForUser()** (6 connections) — `lib/spacetimedb/trips.ts`
- **addLocationForUser()** (5 connections) — `lib/spacetimedb/trips.ts`
- **deleteTripForUser()** (5 connections) — `lib/spacetimedb/trips.ts`
- **listGlobeLocationsForUser()** (5 connections) — `lib/spacetimedb/trips.ts`
- **reorderItineraryDayForUser()** (5 connections) — `lib/spacetimedb/trips.ts`
- **toItineraryLocationInput()** (5 connections) — `lib/spacetimedb/trips.ts`
- **toAppTrip()** (5 connections) — `lib/spacetimedb/types.ts`
- **toAppTripWithLocations()** (5 connections) — `lib/spacetimedb/types.ts`
- **normalizeOptionalString()** (3 connections) — `lib/spacetimedb/trips.ts`
- **lib_spacetimedb_module_bindings_types** (2 connections)
- **toTimestamp()** (2 connections) — `lib/spacetimedb/trips.ts`
- **lib_spacetimedb_module_bindings_types_itinerarylocationinput** (1 connections)
- **GlobeLocationSource** (1 connections) — `lib/spacetimedb/trips.ts`
- **SaveItineraryLocationInput** (1 connections) — `lib/spacetimedb/trips.ts`
- **U64_MAX** (1 connections) — `lib/spacetimedb/trips.ts`

## Relationships

- [Itinerary Server Actions](Itinerary_Server_Actions.md) (8 shared connections)
- [Planner Client Type Contracts](Planner_Client_Type_Contracts.md) (6 shared connections)
- [Authenticated Trip Dashboard](Authenticated_Trip_Dashboard.md) (6 shared connections)
- [Trips API And Geocoding](Trips_API_And_Geocoding.md) (5 shared connections)
- [Itinerary Dates And Reordering](Itinerary_Dates_And_Reordering.md) (5 shared connections)
- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (3 shared connections)
- [Local SpacetimeDB Connection Boundary](Local_SpacetimeDB_Connection_Boundary.md) (3 shared connections)
- [Authenticated Trip Create Actions](Authenticated_Trip_Create_Actions.md) (3 shared connections)
- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (3 shared connections)
- [Itinerary Routes And Planning](Itinerary_Routes_And_Planning.md) (3 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (3 shared connections)
- [SpacetimeDB Auth Server Helpers](SpacetimeDB_Auth_Server_Helpers.md) (2 shared connections)

## Source Files

- `lib/spacetimedb/server.ts`
- `lib/spacetimedb/trips.ts`
- `lib/spacetimedb/types.ts`

## Audit Trail

- EXTRACTED: 99 (96%)
- INFERRED: 4 (4%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `lib_spacetimedb_module_bindings_types` | lib_spacetimedb_module_bindings_types | `` | not_tagged |
| `lib_spacetimedb_module_bindings_types_itinerarylocationinput` | lib_spacetimedb_module_bindings_types_itinerarylocationinput | `` | not_tagged |
| `lib_spacetimedb_server_withspacetimedbconnection` | withSpacetimeDbConnection() | `lib/spacetimedb/server.ts` | not_tagged |
| `lib_spacetimedb_trips` | spacetimedb/trips.ts | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_addlocationforuser` | addLocationForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_createitineraryforuser` | createItineraryForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_createtripforuser` | createTripForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_deletetripforuser` | deleteTripForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_gettripforuser` | getTripForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_globelocationsource` | GlobeLocationSource | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_listglobelocationsforuser` | listGlobeLocationsForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_listtripsforuser` | listTripsForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_normalizeoptionalstring` | normalizeOptionalString() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_parseu64id` | parseU64Id() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_reorderitinerarydayforuser` | reorderItineraryDayForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_saveitineraryforuser` | saveItineraryForUser() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_saveitinerarylocationinput` | SaveItineraryLocationInput | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_toitinerarylocationinput` | toItineraryLocationInput() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_totimestamp` | toTimestamp() | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_trips_u64_max` | U64_MAX | `lib/spacetimedb/trips.ts` | not_tagged |
| `lib_spacetimedb_types_toapptrip` | toAppTrip() | `lib/spacetimedb/types.ts` | not_tagged |
| `lib_spacetimedb_types_toapptripwithlocations` | toAppTripWithLocations() | `lib/spacetimedb/types.ts` | not_tagged |
