# Password Login And Auth Migration

> 13 nodes · cohesion 0.26

## Key Concepts

- **brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md** (17 connections) — `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md`
- **sign-in/route.ts** (13 connections) — `app/api/auth/sign-in/route.ts`
- **password.ts** (11 connections) — `lib/auth/password.ts`
- **getUserAuthByEmail()** (7 connections) — `lib/spacetimedb/auth.ts`
- **POST()** (5 connections) — `app/api/auth/sign-in/route.ts`
- **Historical migration Step04 auth core** (4 connections) — `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md`
- **App-owned vacky_session auth cutover** (3 connections) — `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md`
- **Intermediate auth caveats** (3 connections) — `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md`
- **verifyPassword()** (3 connections) — `lib/auth/password.ts`
- **redirectWithParams()** (2 connections) — `app/api/auth/sign-in/route.ts`
- **Next.js password email and cookie concerns** (2 connections) — `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md`
- **argon2** (2 connections) — `package.json`
- **PASSWORD_HASH_OPTIONS** (1 connections) — `lib/auth/password.ts`

## Relationships

- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (7 shared connections)
- [Signup And Verification Email](Signup_And_Verification_Email.md) (6 shared connections)
- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (5 shared connections)
- [SpacetimeDB Auth Server Helpers](SpacetimeDB_Auth_Server_Helpers.md) (4 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (2 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (2 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (2 shared connections)
- [Local SpacetimeDB Connection Boundary](Local_SpacetimeDB_Connection_Boundary.md) (1 shared connections)
- [Removed Backend Cutover Evidence](Removed_Backend_Cutover_Evidence.md) (1 shared connections)
- [Historical Migration Context](Historical_Migration_Context.md) (1 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (1 shared connections)
- [Application Package Configuration](Application_Package_Configuration.md) (1 shared connections)

## Source Files

- `app/api/auth/sign-in/route.ts`
- `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md`
- `lib/auth/password.ts`
- `lib/spacetimedb/auth.ts`
- `package.json`

## Audit Trail

- EXTRACTED: 51 (96%)
- INFERRED: 2 (4%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `app_api_auth_sign_in_route` | sign-in/route.ts | `app/api/auth/sign-in/route.ts` | not_tagged |
| `app_api_auth_sign_in_route_post` | POST() | `app/api/auth/sign-in/route.ts` | not_tagged |
| `app_api_auth_sign_in_route_redirectwithparams` | redirectWithParams() | `app/api/auth/sign-in/route.ts` | not_tagged |
| `brain_raw_2026_04_25_spacetimedb_migration_step_04_auth_core` | brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md | `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md` | not_tagged |
| `brain_raw_2026_04_25_spacetimedb_migration_step_04_auth_core_auth_cookie_cutover` | App-owned vacky_session auth cutover | `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md` | historical_auth_cutover_hybrid_intermediate |
| `brain_raw_2026_04_25_spacetimedb_migration_step_04_auth_core_auth_intermediate_caveats` | Intermediate auth caveats | `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md` | historical_auth_cutover_hybrid_intermediate |
| `brain_raw_2026_04_25_spacetimedb_migration_step_04_auth_core_auth_next_boundary` | Next.js password email and cookie concerns | `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md` | historical_auth_cutover_hybrid_intermediate |
| `brain_raw_2026_04_25_spacetimedb_migration_step_04_auth_core_document` | Historical migration Step04 auth core | `brain/raw/2026-04-25-spacetimedb-migration/step-04-auth-core.md` | historical_auth_cutover_hybrid_intermediate |
| `lib_auth_password` | password.ts | `lib/auth/password.ts` | not_tagged |
| `lib_auth_password_password_hash_options` | PASSWORD_HASH_OPTIONS | `lib/auth/password.ts` | not_tagged |
| `lib_auth_password_verifypassword` | verifyPassword() | `lib/auth/password.ts` | not_tagged |
| `lib_spacetimedb_auth_getuserauthbyemail` | getUserAuthByEmail() | `lib/spacetimedb/auth.ts` | not_tagged |
| `ref_argon2` | argon2 | `package.json` | not_tagged |
