# Sessions And Email Verification

> 23 nodes · cohesion 0.18

## Key Concepts

- **session.ts** (47 connections) — `lib/auth/session.ts`
- **verify-email/route.ts** (13 connections) — `app/api/auth/verify-email/route.ts`
- **email-verification.ts** (12 connections) — `lib/auth/email-verification.ts`
- **createAppSession()** (10 connections) — `lib/auth/session.ts`
- **destroyAppSession()** (9 connections) — `lib/auth/session.ts`
- **sign-out/route.ts** (8 connections) — `app/api/auth/sign-out/route.ts`
- **hashOpaqueToken()** (8 connections) — `lib/auth/email-verification.ts`
- **GET()** (5 connections) — `app/api/auth/verify-email/route.ts`
- **createEmailVerificationToken()** (5 connections) — `lib/auth/email-verification.ts`
- **createOpaqueToken()** (4 connections) — `lib/auth/email-verification.ts`
- **createSessionRecord()** (4 connections) — `lib/spacetimedb/auth.ts`
- **revokeSessionByTokenHash()** (4 connections) — `lib/spacetimedb/auth.ts`
- **verifyEmailToken()** (4 connections) — `lib/spacetimedb/auth.ts`
- **clearSessionCookie()** (3 connections) — `lib/auth/session.ts`
- **getSessionCookieOptions()** (3 connections) — `lib/auth/session.ts`
- **readSessionCookieValue()** (3 connections) — `lib/auth/session.ts`
- **writeSessionCookie()** (3 connections) — `lib/auth/session.ts`
- **POST()** (2 connections) — `app/api/auth/sign-out/route.ts`
- **redirectWithParams()** (2 connections) — `app/api/auth/verify-email/route.ts`
- **AppSession** (2 connections) — `lib/auth/session.ts`
- **getSessionExpiryDate()** (2 connections) — `lib/auth/session.ts`
- **AppSessionUser** (1 connections) — `lib/auth/session.ts`
- **ref_node_crypto** (1 connections)

## Relationships

- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (14 shared connections)
- [Password Login And Auth Migration](Password_Login_And_Auth_Migration.md) (7 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (6 shared connections)
- [SpacetimeDB Auth Server Helpers](SpacetimeDB_Auth_Server_Helpers.md) (6 shared connections)
- [Authenticated Trip Dashboard](Authenticated_Trip_Dashboard.md) (6 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (5 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (4 shared connections)
- [Signup And Verification Email](Signup_And_Verification_Email.md) (3 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (3 shared connections)
- [Historical Migration Context](Historical_Migration_Context.md) (2 shared connections)
- [Authenticated Trip Create Actions](Authenticated_Trip_Create_Actions.md) (2 shared connections)
- [UploadThing Cover Image Flow](UploadThing_Cover_Image_Flow.md) (1 shared connections)

## Source Files

- `app/api/auth/sign-out/route.ts`
- `app/api/auth/verify-email/route.ts`
- `lib/auth/email-verification.ts`
- `lib/auth/session.ts`
- `lib/spacetimedb/auth.ts`

## Audit Trail

- EXTRACTED: 109 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `app_api_auth_sign_out_route` | sign-out/route.ts | `app/api/auth/sign-out/route.ts` | not_tagged |
| `app_api_auth_sign_out_route_post` | POST() | `app/api/auth/sign-out/route.ts` | not_tagged |
| `app_api_auth_verify_email_route` | verify-email/route.ts | `app/api/auth/verify-email/route.ts` | not_tagged |
| `app_api_auth_verify_email_route_get` | GET() | `app/api/auth/verify-email/route.ts` | not_tagged |
| `app_api_auth_verify_email_route_redirectwithparams` | redirectWithParams() | `app/api/auth/verify-email/route.ts` | not_tagged |
| `lib_auth_email_verification` | email-verification.ts | `lib/auth/email-verification.ts` | not_tagged |
| `lib_auth_email_verification_createemailverificationtoken` | createEmailVerificationToken() | `lib/auth/email-verification.ts` | not_tagged |
| `lib_auth_email_verification_createopaquetoken` | createOpaqueToken() | `lib/auth/email-verification.ts` | not_tagged |
| `lib_auth_email_verification_hashopaquetoken` | hashOpaqueToken() | `lib/auth/email-verification.ts` | not_tagged |
| `lib_auth_session` | session.ts | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_appsession` | AppSession | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_appsessionuser` | AppSessionUser | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_clearsessioncookie` | clearSessionCookie() | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_createappsession` | createAppSession() | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_destroyappsession` | destroyAppSession() | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_getsessioncookieoptions` | getSessionCookieOptions() | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_getsessionexpirydate` | getSessionExpiryDate() | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_readsessioncookievalue` | readSessionCookieValue() | `lib/auth/session.ts` | not_tagged |
| `lib_auth_session_writesessioncookie` | writeSessionCookie() | `lib/auth/session.ts` | not_tagged |
| `lib_spacetimedb_auth_createsessionrecord` | createSessionRecord() | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_revokesessionbytokenhash` | revokeSessionByTokenHash() | `lib/spacetimedb/auth.ts` | not_tagged |
| `lib_spacetimedb_auth_verifyemailtoken` | verifyEmailToken() | `lib/spacetimedb/auth.ts` | not_tagged |
| `ref_node_crypto` | ref_node_crypto | `` | not_tagged |
