# Step 04: Auth Core

## What changed

- Replaced the live session boundary with app-owned cookie sessions backed by SpacetimeDB auth tables.
- Added first-party sign-up, sign-in, sign-out, and verify-email routes/pages.
- Rewired landing, navbar, account menu, and settings away from GitHub-only auth assumptions.

## How

- Added app-owned server helpers:
  - `lib/auth/password.ts`
  - `lib/auth/email-verification.ts`
  - `lib/auth/session.ts`
  - `lib/email/send-verification-email.ts`
  - `lib/spacetimedb/auth.ts`
  - `lib/spacetimedb/server.ts`
- Added auth routes:
  - `app/api/auth/sign-up/route.ts`
  - `app/api/auth/sign-in/route.ts`
  - `app/api/auth/sign-out/route.ts`
  - `app/api/auth/verify-email/route.ts`
- Added auth pages:
  - `app/(auth)/sign-up/page.tsx`
  - `app/(auth)/sign-in/page.tsx`
  - `app/(auth)/verify-email/page.tsx`
- Replaced `getSession()` internals so server pages/actions now resolve the `vacky_session` cookie instead of calling `auth()` from `next-auth`.

## Why

- The migration branch needs a real auth path before trips and locations can fully cut over.
- Password hashing, verification-link generation, cookie issuance, and HTTP redirects belong in Next.js even when SpacetimeDB owns the persisted auth tables.
- Local-only development needs a predictable flow that works over plain `http://localhost`, so session cookies stay `Secure` only in production.

## Checkpoints

- [x] C1 add password hashing, token hashing, cookie session helpers, and auth error mapping
- [x] C2 implement sign-up, sign-in, sign-out, and verify-email routes using Next.js plus SpacetimeDB-backed auth tables
- [x] C3 define how Next.js session identity maps to reducer/view authorization checks
- [x] C4 replace `auth()`-style server boundary calls with the new session helpers in layouts/pages/routes
- [ ] C5 verify full auth flows end-to-end without removing the old trip backend yet

## Risks

- The legacy `next-auth` route and package dependencies still exist in the branch even though they are no longer the live session path.
- Verification email delivery is currently local-dev logging, not real provider delivery.
- Trip and location mutations still use Prisma, so this is a hybrid branch state rather than the final cutover.

## Verification

- `npm run lint`
- `npm run build`
- Local SpacetimeDB publish and binding generation passed after the auth reducers/procedures landed.
