# Local SpacetimeDB Connection Boundary

> 14 nodes · cohesion 0.24

## Key Concepts

- **server.ts** (20 connections) — `lib/spacetimedb/server.ts`
- **errors.ts** (7 connections) — `lib/spacetimedb/errors.ts`
- **config.ts** (6 connections) — `lib/spacetimedb/config.ts`
- **toSpacetimeDbError()** (5 connections) — `lib/spacetimedb/errors.ts`
- **connectToSpacetimeDb()** (5 connections) — `lib/spacetimedb/server.ts`
- **getSpacetimeDbUri()** (4 connections) — `lib/spacetimedb/config.ts`
- **getSpacetimeDbDatabaseName()** (3 connections) — `lib/spacetimedb/config.ts`
- **SpacetimeDbError** (3 connections) — `lib/spacetimedb/errors.ts`
- **normalizeLocalUri()** (2 connections) — `lib/spacetimedb/config.ts`
- **readObjectString()** (2 connections) — `lib/spacetimedb/errors.ts`
- **LOCAL_SPACETIMEDB_HOSTS** (1 connections) — `lib/spacetimedb/config.ts`
- **.constructor()** (1 connections) — `lib/spacetimedb/errors.ts`
- **lib_spacetimedb_module_bindings_index** (1 connections)
- **lib_spacetimedb_module_bindings_index_dbconnection** (1 connections)

## Relationships

- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (3 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (3 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (2 shared connections)
- [Historical Migration Context](Historical_Migration_Context.md) (2 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (2 shared connections)
- [SpacetimeDB Auth Server Helpers](SpacetimeDB_Auth_Server_Helpers.md) (1 shared connections)
- [Proposed Image Delivery Experiment](Proposed_Image_Delivery_Experiment.md) (1 shared connections)
- [Password Login And Auth Migration](Password_Login_And_Auth_Migration.md) (1 shared connections)
- [Traveler Epic Planning Prompt](Traveler_Epic_Planning_Prompt.md) (1 shared connections)
- [Planned Traveler Profile Epic](Planned_Traveler_Profile_Epic.md) (1 shared connections)

## Source Files

- `lib/spacetimedb/config.ts`
- `lib/spacetimedb/errors.ts`
- `lib/spacetimedb/server.ts`

## Audit Trail

- EXTRACTED: 39 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `lib_spacetimedb_config` | config.ts | `lib/spacetimedb/config.ts` | not_tagged |
| `lib_spacetimedb_config_getspacetimedbdatabasename` | getSpacetimeDbDatabaseName() | `lib/spacetimedb/config.ts` | not_tagged |
| `lib_spacetimedb_config_getspacetimedburi` | getSpacetimeDbUri() | `lib/spacetimedb/config.ts` | not_tagged |
| `lib_spacetimedb_config_local_spacetimedb_hosts` | LOCAL_SPACETIMEDB_HOSTS | `lib/spacetimedb/config.ts` | not_tagged |
| `lib_spacetimedb_config_normalizelocaluri` | normalizeLocalUri() | `lib/spacetimedb/config.ts` | not_tagged |
| `lib_spacetimedb_errors` | errors.ts | `lib/spacetimedb/errors.ts` | not_tagged |
| `lib_spacetimedb_errors_readobjectstring` | readObjectString() | `lib/spacetimedb/errors.ts` | not_tagged |
| `lib_spacetimedb_errors_spacetimedberror` | SpacetimeDbError | `lib/spacetimedb/errors.ts` | not_tagged |
| `lib_spacetimedb_errors_spacetimedberror_constructor` | .constructor() | `lib/spacetimedb/errors.ts` | not_tagged |
| `lib_spacetimedb_errors_tospacetimedberror` | toSpacetimeDbError() | `lib/spacetimedb/errors.ts` | not_tagged |
| `lib_spacetimedb_module_bindings_index` | lib_spacetimedb_module_bindings_index | `` | not_tagged |
| `lib_spacetimedb_module_bindings_index_dbconnection` | lib_spacetimedb_module_bindings_index_dbconnection | `` | not_tagged |
| `lib_spacetimedb_server` | server.ts | `lib/spacetimedb/server.ts` | not_tagged |
| `lib_spacetimedb_server_connecttospacetimedb` | connectToSpacetimeDb() | `lib/spacetimedb/server.ts` | not_tagged |
