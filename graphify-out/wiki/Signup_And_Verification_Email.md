# Signup And Verification Email

> 14 nodes · cohesion 0.25

## Key Concepts

- **sign-up/route.ts** (18 connections) — `app/api/auth/sign-up/route.ts`
- **send-verification-email.ts** (10 connections) — `lib/email/send-verification-email.ts`
- **POST()** (9 connections) — `app/api/auth/sign-up/route.ts`
- **app-url.ts** (4 connections) — `lib/app-url.ts`
- **getAppBaseUrl()** (4 connections) — `lib/app-url.ts`
- **sendVerificationEmail()** (4 connections) — `lib/email/send-verification-email.ts`
- **registerUserAccount()** (4 connections) — `lib/spacetimedb/auth.ts`
- **hashPassword()** (3 connections) — `lib/auth/password.ts`
- **isDuplicateEmailError()** (2 connections) — `app/api/auth/sign-up/route.ts`
- **readString()** (2 connections) — `app/api/auth/sign-up/route.ts`
- **redirectWithParams()** (2 connections) — `app/api/auth/sign-up/route.ts`
- **normalizeUrl()** (2 connections) — `lib/app-url.ts`
- **APP_URL_ENV_KEYS** (1 connections) — `lib/app-url.ts`
- **SendVerificationEmailInput** (1 connections) — `lib/email/send-verification-email.ts`

## Relationships

- [Password Login And Auth Migration](Password_Login_And_Auth_Migration.md) (6 shared connections)
- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (3 shared connections)
- [SpacetimeDB Auth Server Helpers](SpacetimeDB_Auth_Server_Helpers.md) (2 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (2 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (2 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (2 shared connections)
- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (1 shared connections)
- [Historical Migration Context](Historical_Migration_Context.md) (1 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (1 shared connections)

## Source Files

- `app/api/auth/sign-up/route.ts`
- `lib/app-url.ts`
- `lib/auth/password.ts`
- `lib/email/send-verification-email.ts`
- `lib/spacetimedb/auth.ts`

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
| `app_api_auth_sign_up_route` | sign-up/route.ts | `app/api/auth/sign-up/route.ts` | not_tagged |
| `app_api_auth_sign_up_route_isduplicateemailerror` | isDuplicateEmailError() | `app/api/auth/sign-up/route.ts` | not_tagged |
| `app_api_auth_sign_up_route_post` | POST() | `app/api/auth/sign-up/route.ts` | not_tagged |
| `app_api_auth_sign_up_route_readstring` | readString() | `app/api/auth/sign-up/route.ts` | not_tagged |
| `app_api_auth_sign_up_route_redirectwithparams` | redirectWithParams() | `app/api/auth/sign-up/route.ts` | not_tagged |
| `lib_app_url` | app-url.ts | `lib/app-url.ts` | not_tagged |
| `lib_app_url_app_url_env_keys` | APP_URL_ENV_KEYS | `lib/app-url.ts` | not_tagged |
| `lib_app_url_getappbaseurl` | getAppBaseUrl() | `lib/app-url.ts` | not_tagged |
| `lib_app_url_normalizeurl` | normalizeUrl() | `lib/app-url.ts` | not_tagged |
| `lib_auth_password_hashpassword` | hashPassword() | `lib/auth/password.ts` | not_tagged |
| `lib_email_send_verification_email` | send-verification-email.ts | `lib/email/send-verification-email.ts` | not_tagged |
| `lib_email_send_verification_email_sendverificationemail` | sendVerificationEmail() | `lib/email/send-verification-email.ts` | not_tagged |
| `lib_email_send_verification_email_sendverificationemailinput` | SendVerificationEmailInput | `lib/email/send-verification-email.ts` | not_tagged |
| `lib_spacetimedb_auth_registeruseraccount` | registerUserAccount() | `lib/spacetimedb/auth.ts` | not_tagged |
