# Step 03: Schema

## What changed

- Landed the first canonical SpacetimeDB schema for the migration branch.
- Defined private auth, trip, location, and audit tables under a stable local-only module.
- Added field-level unique/index accessors needed for auth lookups without raw SQL.

## How

- `spacetimedb/src/schema.ts` now defines:
  - `user_account`
  - `session`
  - `email_verification_token`
  - `trip`
  - `location`
  - `auth_audit_event`
- Auth-critical lookups use typed accessors:
  - `userAccount.email`
  - `session.tokenHash`
  - `session.userId`
  - `emailVerificationToken.tokenHash`
  - `emailVerificationToken.userId`
- The schema object keys were normalized to camelCase so reducer/procedure code uses predictable `ctx.db.userAccount`-style accessors.

## Why

- The auth core needs indexed email and token lookups before Next.js can stop depending on `next-auth`.
- Private-by-default tables keep password hashes, token hashes, and session state off the public read path.
- Stable schema keys reduce future churn in reducers, procedures, and generated bindings.

## Checkpoints

- [x] C1 map Prisma models and current product behavior into SpacetimeDB tables, indexes, and views
- [x] C2 define `user_account`, `session`, `email_verification_token`, `trip`, `location`, and supporting audit/reference tables
- [x] C3 encode privacy defaults, ownership rules, and safe read projections
- [x] C4 decide field mappings for current trip/location metadata and current settings/account display needs
- [x] C5 regenerate bindings and verify schema assumptions against generated names and types

## Risks

- Trip and location tables are defined but still not the live read/write path in the Next app.
- Some richer trip/location fields remain JSON strings in the schema scaffold to keep the module simple during the auth cutover.

## Verification

- Local publish and codegen succeeded. The final branch default is `vacky-spacetimedb-local-dev`.
- Generated bindings now include:
  - `createUserAccount`
  - `createSession`
  - `revokeSessionByTokenHash`
  - `getUserAuthByEmail`
  - `getSessionUserByTokenHash`
  - `verifyEmailToken`
