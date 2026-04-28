# Step 07: Side Systems

## Status

Completed on 2026-04-26.

## What Changed

Secondary app surfaces now use the first-party session model and SpacetimeDB-backed account data.

- Navbar and auth CTAs use app-owned sign-in/sign-up/sign-out routes.
- Settings uses the current `vacky_session` user and no longer reads provider/account rows.
- UploadThing middleware authenticates with `getSession()` from `lib/auth/session`.
- `/api/trips` uses SpacetimeDB globe-location reads.

## How

- `components/navbar.tsx`, `components/auth-button.tsx`, `app/settings/page.tsx`, and landing CTAs were rewired away from GitHub-only auth assumptions.
- `app/api/uploadthing/core.ts` now uses the same session boundary as pages and actions.
- Settings keeps the existing theme cookie behavior while changing account display to first-party account fields.

## Why

Deleting NextAuth would break uploads, account UI, and nav state unless every side surface was moved to the new session helper first.

## Checkpoints

- [x] C1 rework navbar, landing-page auth CTAs, and account/session UI around the new auth model
- [x] C2 adapt settings so it reflects first-party account data plus existing theme behavior
- [x] C3 rewire UploadThing auth middleware to the new session helper
- [x] C4 review `/api/trips`, globe-supporting reads, and remaining route handlers for hidden Prisma/auth coupling
- [x] C5 verify parity compiles for settings, uploads, auth UX, and supporting APIs

## Risks Retired

- Upload authorization no longer depends on `next-auth`.
- Settings no longer assumes GitHub provider rows exist.

## Risks Introduced

- UploadThing and settings still need manual browser checks with a signed-in first-party user.
- Email verification delivery currently logs local verification links when no email provider is configured.

## Verification Evidence

- `npm run lint`: passed.
- `npm run build`: passed.
- Source search found no active `next-auth` or Prisma imports in `app/`, `components/`, or `lib/`.
