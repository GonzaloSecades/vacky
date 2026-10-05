# SpacetimeDB Auth Mutation Module

> 9 nodes · cohesion 0.31

## Key Concepts

- **src/index.ts** (17 connections) — `spacetimedb/src/index.ts`
- **auth/reducers.ts** (9 connections) — `spacetimedb/src/modules/auth/reducers.ts`
- **spacetimedb** (9 connections) — `spacetimedb/src/schema/index.ts`
- **normalizeEmail()** (5 connections) — `spacetimedb/src/shared/utils.ts`
- **core/reducers.ts** (4 connections) — `spacetimedb/src/modules/core/reducers.ts`
- **create_user_account** (2 connections) — `spacetimedb/src/modules/auth/reducers.ts`
- **create_session** (1 connections) — `spacetimedb/src/modules/auth/reducers.ts`
- **revoke_session_by_token_hash** (1 connections) — `spacetimedb/src/modules/auth/reducers.ts`
- **init** (1 connections) — `spacetimedb/src/modules/core/reducers.ts`

## Relationships

- [SpacetimeDB Read Procedures](SpacetimeDB_Read_Procedures.md) (10 shared connections)
- [SpacetimeDB Schema Assembly](SpacetimeDB_Schema_Assembly.md) (5 shared connections)
- [Owned Trip Mutation Reducers](Owned_Trip_Mutation_Reducers.md) (4 shared connections)
- [SpacetimeDB Module Tooling](SpacetimeDB_Module_Tooling.md) (1 shared connections)
- [Vacky Team Implementation Workflow](Vacky_Team_Implementation_Workflow.md) (1 shared connections)
- [Brain Log And Synchronization](Brain_Log_And_Synchronization.md) (1 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (1 shared connections)
- [Migration Readiness Evidence](Migration_Readiness_Evidence.md) (1 shared connections)
- [Historical Migration Context](Historical_Migration_Context.md) (1 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (1 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (1 shared connections)

## Source Files

- `spacetimedb/src/index.ts`
- `spacetimedb/src/modules/auth/reducers.ts`
- `spacetimedb/src/modules/core/reducers.ts`
- `spacetimedb/src/schema/index.ts`
- `spacetimedb/src/shared/utils.ts`

## Audit Trail

- EXTRACTED: 38 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `spacetimedb_src_index` | src/index.ts | `spacetimedb/src/index.ts` | not_tagged |
| `spacetimedb_src_modules_auth_reducers` | auth/reducers.ts | `spacetimedb/src/modules/auth/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_auth_reducers_create_session` | create_session | `spacetimedb/src/modules/auth/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_auth_reducers_create_user_account` | create_user_account | `spacetimedb/src/modules/auth/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_auth_reducers_revoke_session_by_token_hash` | revoke_session_by_token_hash | `spacetimedb/src/modules/auth/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_core_reducers` | core/reducers.ts | `spacetimedb/src/modules/core/reducers.ts` | not_tagged |
| `spacetimedb_src_modules_core_reducers_init` | init | `spacetimedb/src/modules/core/reducers.ts` | not_tagged |
| `spacetimedb_src_schema_index_spacetimedb` | spacetimedb | `spacetimedb/src/schema/index.ts` | not_tagged |
| `spacetimedb_src_shared_utils_normalizeemail` | normalizeEmail() | `spacetimedb/src/shared/utils.ts` | not_tagged |
