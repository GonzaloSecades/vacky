# PR #5 Raw Note

Title: Add avatar menu, settings theme picker, and dark-mode polish

PR: https://github.com/GonzaloSecades/vacky/pull/5

Merge date: 2026-04-08

Merge commit: `543d7b80d4703a9e7e4d002d850061fb07a41896`

Branch: `codex-avatar-settings-theme-foundation`

Base: `4c2d901ee9155e1912f33a034a1f0abe08ff8dc0`

Head: `1a94dca`

## Evidence Used

- GitHub PR metadata and body for PR #5.
- Final merged diff and merge commit `543d7b8`.
- Existing first-bootstrap raw note, reconciled with GitHub metadata.
- Current repo state for checking which constraints still apply.

No PR comments or review discussion were returned by the GitHub connector for this PR.

## Problem Or Goal

The PR body gives explicit rationale:

- the app previously exposed logout directly in the navbar
- there was no protected settings surface
- there was no minimal theme persistence mechanism
- after adding dark mode support, `/trips/[tripId]` and `/globe` still had hard-coded light styles
- globe canvas sizing caused off-center and overflow issues across viewport sizes

The goal was to make account/settings and theme behavior real, while also polishing dark-mode compatibility across existing surfaces.

## Final Merged Behavior

Final merged behavior at `543d7b8`:

- Navbar changed from a plain sign-out button to an avatar-triggered user menu.
- `components/user-menu.tsx` rendered a menu with:
  - signed-in identity summary
  - link to `/settings`
  - logout action
  - portal-backed open/close behavior
- `/settings` shipped as a protected server page:
  - redirects unauthenticated users to `/`
  - queries Prisma `account` records for connected provider labels
  - shows account/profile information
  - shows a theme picker
- Theme preference became cookie-backed:
  - `lib/theme.ts` defines `THEME_COOKIE_NAME`, theme parsing, and max age
  - `lib/actions/set-theme.ts` writes the cookie server-side
  - `app/layout.tsx` reads the cookie and applies `dark` on `<html>` before render
- Existing trip detail, globe, map, and itinerary surfaces were restyled to use theme-aware Tailwind tokens.
- Globe panel responsiveness improved relative to PR #3 so the globe stayed more centered and in bounds on different viewport sizes.
- Local Playwright/debug artifacts under `output/` were ignored.
- GitHub Copilot instruction files were added as process sidecar docs.

## Main Files Or Areas Touched

- settings/theme functionality:
  - `app/settings/page.tsx`
  - `components/user-menu.tsx`
  - `lib/actions/set-theme.ts`
  - `lib/theme.ts`
- app shell/theme application:
  - `app/layout.tsx`
  - `components/navbar.tsx`
  - `app/globals.css`
- theme-token adoption and polish:
  - `app/globe/page.tsx`
  - `components/map.tsx`
  - `components/sortable-itinerary.tsx`
  - `components/tripDetail.tsx`
- repo/process sidecars:
  - `.gitignore`
  - `.github/copilot-instructions.md`
  - `.github/instructions/*`

## Important Review-Driven Changes Or Comments

- No concrete review-driven changes were discoverable through the GitHub connector.
- The PR body records verification:
  - `npm run lint` with Node `22.20.0` passed.
  - `npm run build` was blocked in the sandbox because `next/font` could not fetch `Geist` and `Geist Mono` from Google Fonts without network access.
- The PR body records manual checks:
  - avatar menu opens above content, closes correctly, and routes to Settings/Logout
  - `/settings` redirects unauthenticated users to `/`
  - light/dark selection persists across reloads/navigation
  - trip detail respects the selected theme
  - globe respects theme and responsive bounds

## Risks, Follow-Ups, Or Unresolved Questions

- Settings/account UI depends on Prisma `account` rows, but current auth config only enables GitHub. Provider label code anticipates more than is live.
- User-image fallback still points at `/default-avatar.png`, which is absent in current repo state.
- Theme storage is cookie-only and browser-specific; there is no user-profile persistence for theme preference.
- Build verification was blocked by font network access, so production build evidence was incomplete for this PR.
- PR #6 later touched globe/settings again, so the PR #5 implementation was not the final settled shape for those areas.

## What Should Be Promoted Into The Wiki

- Feature docs should note `/settings`, avatar menu, and cookie-backed theme selection as a distinct feature addition after core trip planning.
- Architecture docs should describe theme as server-applied by `app/layout.tsx`, mutated by a server action, and stored in a cookie.
- Current risks should preserve font-network build limitations and missing avatar fallback asset.
- Workflow docs can note GitHub Copilot instruction files as a secondary process sidecar, not a product feature.
