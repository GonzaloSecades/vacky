# Owned Trip Mutation Reducers

> 15 nodes · cohesion 0.24

## Key Concepts

- **itinerary/reducers.ts** (17 connections) — `spacetimedb/src/modules/itinerary/reducers.ts`
- **trips/reducers.ts** (10 connections) — `spacetimedb/src/modules/trips/reducers.ts`
- **requireOwnedTrip()** (8 connections) — `spacetimedb/src/shared/guards.ts`
- **guards.ts** (6 connections) — `spacetimedb/src/shared/guards.ts`
- **helpers.ts** (5 connections) — `spacetimedb/src/modules/itinerary/helpers.ts`
- **insertLocation()** (5 connections) — `spacetimedb/src/modules/itinerary/helpers.ts`
- **add_location** (3 connections) — `spacetimedb/src/modules/itinerary/reducers.ts`
- **create_itinerary** (3 connections) — `spacetimedb/src/modules/itinerary/reducers.ts`
- **save_itinerary** (3 connections) — `spacetimedb/src/modules/itinerary/reducers.ts`
- **reorder_itinerary_day** (2 connections) — `spacetimedb/src/modules/itinerary/reducers.ts`
- **delete_trip** (2 connections) — `spacetimedb/src/modules/trips/reducers.ts`
- **LocationInsertContext** (1 connections) — `spacetimedb/src/modules/itinerary/helpers.ts`
- **LocationInsertRow** (1 connections) — `spacetimedb/src/modules/itinerary/helpers.ts`
- **create_trip** (1 connections) — `spacetimedb/src/modules/trips/reducers.ts`
- **TripLookupDb** (1 connections) — `spacetimedb/src/shared/guards.ts`

## Relationships

- [SpacetimeDB Schema Assembly](SpacetimeDB_Schema_Assembly.md) (5 shared connections)
- [SpacetimeDB Auth Mutation Module](SpacetimeDB_Auth_Mutation_Module.md) (4 shared connections)
- [Traveler Epic Planning Prompt](Traveler_Epic_Planning_Prompt.md) (3 shared connections)
- [SpacetimeDB Read Procedures](SpacetimeDB_Read_Procedures.md) (2 shared connections)
- [Planned Traveler Profile Epic](Planned_Traveler_Profile_Epic.md) (2 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (1 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (1 shared connections)

## Source Files

- `spacetimedb/src/modules/itinerary/helpers.ts`
- `spacetimedb/src/modules/itinerary/reducers.ts`
- `spacetimedb/src/modules/trips/reducers.ts`
- `spacetimedb/src/shared/guards.ts`

## Audit Trail

- EXTRACTED: 43 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `spacetimedb_src_modules_itinerary_helpers` | helpers.ts | `spacetimedb/src/modules/itinerary/helpers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_helpers_insertlocation` | insertLocation() | `spacetimedb/src/modules/itinerary/helpers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_helpers_locationinsertcontext` | LocationInsertContext | `spacetimedb/src/modules/itinerary/helpers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_helpers_locationinsertrow` | LocationInsertRow | `spacetimedb/src/modules/itinerary/helpers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_reducers` | itinerary/reducers.ts | `spacetimedb/src/modules/itinerary/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_reducers_add_location` | add_location | `spacetimedb/src/modules/itinerary/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_reducers_create_itinerary` | create_itinerary | `spacetimedb/src/modules/itinerary/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_reducers_reorder_itinerary_day` | reorder_itinerary_day | `spacetimedb/src/modules/itinerary/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_itinerary_reducers_save_itinerary` | save_itinerary | `spacetimedb/src/modules/itinerary/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_trips_reducers` | trips/reducers.ts | `spacetimedb/src/modules/trips/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_trips_reducers_create_trip` | create_trip | `spacetimedb/src/modules/trips/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_trips_reducers_delete_trip` | delete_trip | `spacetimedb/src/modules/trips/reducers.ts` | not_tagged |
| `spacetimedb_src_shared_guards` | guards.ts | `spacetimedb/src/shared/guards.ts` | not_tagged |
| `spacetimedb_src_shared_guards_requireownedtrip` | requireOwnedTrip() | `spacetimedb/src/shared/guards.ts` | not_tagged |
| `spacetimedb_src_shared_guards_triplookupdb` | TripLookupDb | `spacetimedb/src/shared/guards.ts` | not_tagged |
