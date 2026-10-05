# SpacetimeDB Auth Server Helpers

> 10 nodes · cohesion 0.27

## Key Concepts

- **spacetimedb/auth.ts** (27 connections) — `lib/spacetimedb/auth.ts`
- **getSessionUserByTokenHash()** (5 connections) — `lib/spacetimedb/auth.ts`
- **mapAuthUser()** (3 connections) — `lib/spacetimedb/auth.ts`
- **mapSessionUser()** (3 connections) — `lib/spacetimedb/auth.ts`
- **toDate()** (3 connections) — `lib/spacetimedb/auth.ts`
- **CreateSessionInput** (1 connections) — `lib/spacetimedb/auth.ts`
- **RegisterUserInput** (1 connections) — `lib/spacetimedb/auth.ts`
- **SpacetimeDbAuthUser** (1 connections) — `lib/spacetimedb/auth.ts`
- **SpacetimeDbSessionUser** (1 connections) — `lib/spacetimedb/auth.ts`
- **VerifyEmailTokenResult** (1 connections) — `lib/spacetimedb/auth.ts`

## Relationships

- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (6 shared connections)
- [Password Login And Auth Migration](Password_Login_And_Auth_Migration.md) (4 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (2 shared connections)
- [Signup And Verification Email](Signup_And_Verification_Email.md) (2 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (2 shared connections)
- [SpacetimeDB Schema Assembly](SpacetimeDB_Schema_Assembly.md) (1 shared connections)
- [Local SpacetimeDB Connection Boundary](Local_SpacetimeDB_Connection_Boundary.md) (1 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (1 shared connections)
- [Historical Migration Context](Historical_Migration_Context.md) (1 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (1 shared connections)
- [Authenticated Trip Dashboard](Authenticated_Trip_Dashboard.md) (1 shared connections)

## Source Files

- `lib/spacetimedb/auth.ts`

## Audit Trail

- EXTRACTED: 34 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `lib_spacetimedb_auth` | spacetimedb/auth.ts | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_createsessioninput` | CreateSessionInput | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_getsessionuserbytokenhash` | getSessionUserByTokenHash() | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_mapauthuser` | mapAuthUser() | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_mapsessionuser` | mapSessionUser() | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_registeruserinput` | RegisterUserInput | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_spacetimedbauthuser` | SpacetimeDbAuthUser | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_spacetimedbsessionuser` | SpacetimeDbSessionUser | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_todate` | toDate() | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_verifyemailtokenresult` | VerifyEmailTokenResult | `lib/spacetimedb/auth.ts` | not_tagged |
