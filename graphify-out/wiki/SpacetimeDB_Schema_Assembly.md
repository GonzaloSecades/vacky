# SpacetimeDB Schema Assembly

> 11 nodes · cohesion 0.35

## Key Concepts

- **schema/index.ts** (20 connections) — `spacetimedb/src/schema/index.ts`
- **ref_spacetimedb** (16 connections)
- **schema/auth.ts** (7 connections) — `spacetimedb/src/schema/auth.ts`
- **locations.ts** (7 connections) — `spacetimedb/src/schema/locations.ts`
- **schema/trips.ts** (6 connections) — `spacetimedb/src/schema/trips.ts`
- **AuthAuditEvent** (2 connections) — `spacetimedb/src/schema/auth.ts`
- **EmailVerificationToken** (2 connections) — `spacetimedb/src/schema/auth.ts`
- **Session** (2 connections) — `spacetimedb/src/schema/auth.ts`
- **UserAccount** (2 connections) — `spacetimedb/src/schema/auth.ts`
- **Location** (2 connections) — `spacetimedb/src/schema/locations.ts`
- **Trip** (2 connections) — `spacetimedb/src/schema/trips.ts`

## Relationships

- [SpacetimeDB Read Procedures](SpacetimeDB_Read_Procedures.md) (9 shared connections)
- [SpacetimeDB Auth Mutation Module](SpacetimeDB_Auth_Mutation_Module.md) (5 shared connections)
- [Owned Trip Mutation Reducers](Owned_Trip_Mutation_Reducers.md) (5 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (4 shared connections)
- [Traveler Epic Planning Prompt](Traveler_Epic_Planning_Prompt.md) (2 shared connections)
- [SpacetimeDB Auth Server Helpers](SpacetimeDB_Auth_Server_Helpers.md) (1 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (1 shared connections)
- [Planned Traveler Profile Epic](Planned_Traveler_Profile_Epic.md) (1 shared connections)
- [Traveler Profile Design Evidence](Traveler_Profile_Design_Evidence.md) (1 shared connections)
- [Proposed Image Delivery Experiment](Proposed_Image_Delivery_Experiment.md) (1 shared connections)

## Source Files

- `spacetimedb/src/schema/auth.ts`
- `spacetimedb/src/schema/index.ts`
- `spacetimedb/src/schema/locations.ts`
- `spacetimedb/src/schema/trips.ts`

## Audit Trail

- EXTRACTED: 49 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `ref_spacetimedb` | ref_spacetimedb | `` | not_tagged |
| `spacetimedb_src_schema_auth` | schema/auth.ts | `spacetimedb/src/schema/auth.ts` | not_tagged |
| `spacetimedb_src_schema_auth_authauditevent` | AuthAuditEvent | `spacetimedb/src/schema/auth.ts` | not_tagged |
| `spacetimedb_src_schema_auth_emailverificationtoken` | EmailVerificationToken | `spacetimedb/src/schema/auth.ts` | not_tagged |
| `spacetimedb_src_schema_auth_session` | Session | `spacetimedb/src/schema/auth.ts` | not_tagged |
| `spacetimedb_src_schema_auth_useraccount` | UserAccount | `spacetimedb/src/schema/auth.ts` | not_tagged |
| `spacetimedb_src_schema_index` | schema/index.ts | `spacetimedb/src/schema/index.ts` | not_tagged |
| `spacetimedb_src_schema_locations` | locations.ts | `spacetimedb/src/schema/locations.ts` | not_tagged |
| `spacetimedb_src_schema_locations_location` | Location | `spacetimedb/src/schema/locations.ts` | not_tagged |
| `spacetimedb_src_schema_trips` | schema/trips.ts | `spacetimedb/src/schema/trips.ts` | not_tagged |
| `spacetimedb_src_schema_trips_trip` | Trip | `spacetimedb/src/schema/trips.ts` | not_tagged |
