# Data and auth

Updated: 2026-11-19. SpacetimeDB is legacy but remains operational.

## Current storage

Local SpacetimeDB at `127.0.0.1:3000` stores:

- `user_account`
- `session`
- `email_verification_token`
- `auth_audit_event`
- `trip`
- `location`

The local database is `vacky-spacetimedb-local-dev`.
Generated bindings are in `lib/spacetimedb/module_bindings/` and remain ignored.
Prisma, NextAuth, Neon, and PostgreSQL are absent from the current runtime.

## Current web boundary

Next.js hashes passwords with Argon2id and stores hashed opaque tokens.
The `vacky_session` cookie is HTTP-only, uses SameSite Lax, and is secure in production.
Sessions expire after 30 days. Sign-out attempts session revocation and clears the cookie.
Verification tokens expire after 24 hours. Verification currently logs a URL instead of delivering an email.

Server pages, actions, and UploadThing middleware use `getSession()` or `requireSession()`.
Trip and itinerary functions pass the session's user ID to SpacetimeDB.
Reducers compare that supplied ID with trip ownership.

## Known trust gap

Private tables do not secure exported functions automatically.
The module does not bind supplied user IDs to an authenticated database caller.
`create_session` accepts an existing user ID without checking caller authority.
`get_user_auth_by_email` returns a password hash without a caller authorization check.
Next.js enforces the normal web flow, but direct database calls can bypass it if the endpoint becomes reachable.
Keep the legacy instance local. Do not expose this implementation publicly.
These findings come from source inspection. A hostile-client runtime replay remains outstanding.

## Current data flow

Form actions validate payloads before calling reducers through `lib/spacetimedb/`.
Reducers provide transactional writes. Procedures supply dashboard, trip, session, and globe reads.
Each helper operation currently opens and closes a database connection.
`AppTrip` and `AppLocation` include reusable application contracts mixed with SDK-specific mappings.
Separate those contracts before removing the adapter directory.

`/api/trips` reverse-geocodes each saved location during every globe request.
Google place metadata is client-sourced and structurally validated, rather than server-revalidated.
Theme selection remains a browser cookie. UploadThing and Google integrations are still required.

## Deprecation boundary

The replacement is NestJS with PostgreSQL. It is planned, not implemented.
Keep legacy startup, publish, and generation commands until cutover.
Do not reset or migrate data as part of documentation cleanup.
Remove legacy runtime files only after replacement parity, data verification, and rollback checks.
The [backend plan](../../../docs/nestjs-backend.md) owns those steps.

## Evidence

- `lib/auth/session.ts`, `lib/auth/password.ts`, `lib/auth/email-verification.ts`
- `lib/email/send-verification-email.ts`
- `lib/spacetimedb/server.ts`, `lib/spacetimedb/auth.ts`, `lib/spacetimedb/types.ts`
- `spacetimedb/src/modules/auth/reducers.ts` and `procedures.ts`
- `spacetimedb/src/shared/guards.ts`
- `app/api/trips/route.ts`

Historical migration evidence remains under `brain/raw/2026-04-25-spacetimedb-migration/`.
