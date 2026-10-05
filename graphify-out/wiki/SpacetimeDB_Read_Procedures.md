# SpacetimeDB Read Procedures

> 28 nodes · cohesion 0.15

## Key Concepts

- **auth/procedures.ts** (17 connections) — `spacetimedb/src/modules/auth/procedures.ts`
- **itinerary/procedures.ts** (14 connections) — `spacetimedb/src/modules/itinerary/procedures.ts`
- **shared/types.ts** (13 connections) — `spacetimedb/src/shared/types.ts`
- **trips/procedures.ts** (11 connections) — `spacetimedb/src/modules/trips/procedures.ts`
- **shared/utils.ts** (10 connections) — `spacetimedb/src/shared/utils.ts`
- **mappers.ts** (8 connections) — `spacetimedb/src/shared/mappers.ts`
- **toTripRecord()** (5 connections) — `spacetimedb/src/shared/mappers.ts`
- **get_trip_with_locations** (4 connections) — `spacetimedb/src/modules/itinerary/procedures.ts`
- **isExpired()** (4 connections) — `spacetimedb/src/shared/utils.ts`
- **sortLocations()** (4 connections) — `spacetimedb/src/shared/utils.ts`
- **get_session_user_by_token_hash** (3 connections) — `spacetimedb/src/modules/auth/procedures.ts`
- **get_user_auth_by_email** (3 connections) — `spacetimedb/src/modules/auth/procedures.ts`
- **list_trips_by_user** (3 connections) — `spacetimedb/src/modules/trips/procedures.ts`
- **toLocationRecord()** (3 connections) — `spacetimedb/src/shared/mappers.ts`
- **toSessionUserRecord()** (3 connections) — `spacetimedb/src/shared/mappers.ts`
- **toUserAuthRecord()** (3 connections) — `spacetimedb/src/shared/mappers.ts`
- **sortTrips()** (3 connections) — `spacetimedb/src/shared/utils.ts`
- **verify_email_token** (2 connections) — `spacetimedb/src/modules/auth/procedures.ts`
- **GlobeLocationRecord** (2 connections) — `spacetimedb/src/shared/types.ts`
- **ItineraryLocationInput** (2 connections) — `spacetimedb/src/shared/types.ts`
- **SessionUserRecord** (2 connections) — `spacetimedb/src/shared/types.ts`
- **TripRecord** (2 connections) — `spacetimedb/src/shared/types.ts`
- **TripWithLocationsRecord** (2 connections) — `spacetimedb/src/shared/types.ts`
- **UserAuthRecord** (2 connections) — `spacetimedb/src/shared/types.ts`
- **VerifyEmailResult** (2 connections) — `spacetimedb/src/shared/types.ts`
- *... and 3 more nodes in this community*

## Relationships

- [SpacetimeDB Auth Mutation Module](SpacetimeDB_Auth_Mutation_Module.md) (10 shared connections)
- [SpacetimeDB Schema Assembly](SpacetimeDB_Schema_Assembly.md) (9 shared connections)
- [Owned Trip Mutation Reducers](Owned_Trip_Mutation_Reducers.md) (2 shared connections)

## Source Files

- `spacetimedb/src/modules/auth/procedures.ts`
- `spacetimedb/src/modules/itinerary/procedures.ts`
- `spacetimedb/src/modules/trips/procedures.ts`
- `spacetimedb/src/shared/mappers.ts`
- `spacetimedb/src/shared/types.ts`
- `spacetimedb/src/shared/utils.ts`

## Audit Trail

- EXTRACTED: 74 (97%)
- INFERRED: 2 (3%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `spacetimedb_src_modules_auth_procedures` | auth/procedures.ts | `spacetimedb/src/modules/auth/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_auth_procedures_get_session_user_by_token_hash` | get_session_user_by_token_hash | `spacetimedb/src/modules/auth/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_auth_procedures_get_user_auth_by_email` | get_user_auth_by_email | `spacetimedb/src/modules/auth/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_auth_procedures_verify_email_token` | verify_email_token | `spacetimedb/src/modules/auth/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_procedures` | itinerary/procedures.ts | `spacetimedb/src/modules/itinerary/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_procedures_get_trip_with_locations` | get_trip_with_locations | `spacetimedb/src/modules/itinerary/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_procedures_list_globe_locations_by_user` | list_globe_locations_by_user | `spacetimedb/src/modules/itinerary/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_trips_procedures` | trips/procedures.ts | `spacetimedb/src/modules/trips/procedures.ts` | not_tagged |
| `spacetimedb_src_modules_trips_procedures_list_trips_by_user` | list_trips_by_user | `spacetimedb/src/modules/trips/procedures.ts` | not_tagged |
| `spacetimedb_src_shared_mappers` | mappers.ts | `spacetimedb/src/shared/mappers.ts` | not_tagged |
| `spacetimedb_src_shared_mappers_tolocationrecord` | toLocationRecord() | `spacetimedb/src/shared/mappers.ts` | not_tagged |
| `spacetimedb_src_shared_mappers_tosessionuserrecord` | toSessionUserRecord() | `spacetimedb/src/shared/mappers.ts` | not_tagged |
| `spacetimedb_src_shared_mappers_totriprecord` | toTripRecord() | `spacetimedb/src/shared/mappers.ts` | not_tagged |
| `spacetimedb_src_shared_mappers_touserauthrecord` | toUserAuthRecord() | `spacetimedb/src/shared/mappers.ts` | not_tagged |
| `spacetimedb_src_shared_types` | shared/types.ts | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_globelocationrecord` | GlobeLocationRecord | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_itinerarylocationinput` | ItineraryLocationInput | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_locationrecord` | LocationRecord | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_sessionuserrecord` | SessionUserRecord | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_triprecord` | TripRecord | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_tripwithlocationsrecord` | TripWithLocationsRecord | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_userauthrecord` | UserAuthRecord | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_types_verifyemailresult` | VerifyEmailResult | `spacetimedb/src/shared/types.ts` | not_tagged |
| `spacetimedb_src_shared_utils` | shared/utils.ts | `spacetimedb/src/shared/utils.ts` | not_tagged |
| `spacetimedb_src_shared_utils_comparemaybestrings` | compareMaybeStrings() | `spacetimedb/src/shared/utils.ts` | not_tagged |
| `spacetimedb_src_shared_utils_isexpired` | isExpired() | `spacetimedb/src/shared/utils.ts` | not_tagged |
| `spacetimedb_src_shared_utils_sortlocations` | sortLocations() | `spacetimedb/src/shared/utils.ts` | not_tagged |
| `spacetimedb_src_shared_utils_sorttrips` | sortTrips() | `spacetimedb/src/shared/utils.ts` | not_tagged |
