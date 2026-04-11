# Current State Bootstrap 2.0 GitHub Recalibration

Date: 2026-04-10

## Scope And Evidence Used

- current local repo state on `master`
- `git status --short --branch`
- current `HEAD`: `90cbe69a50cc0380e118516426c1a3cd8eeefd01`
- GitHub merged PR list for `GonzaloSecades/vacky` into `master`
- GitHub PR bodies, comments, reviews, and final merged diffs for PRs #1 to #6 where available
- existing raw notes under `brain/raw/commits/`
- existing current-state bootstrap note under `brain/raw/sessions/`
- current source checks for:
  - `app/db.ts`
  - `app/globe/page.tsx`
  - `app/settings/page.tsx`
  - `next.config.ts`

## Recalibration Summary

The first raw bootstrap was correct about the broad app shape, but it was written before GitHub PR metadata was available. This recalibration strengthens the raw evidence layer with PR bodies, review comments, and final merged diffs.

GitHub confirms the full merged PR list into `master` is:

- PR #1: `feat: add authentication and user management with Prisma`
- PR #2: `Add trip creation flow with UploadThing image uploads`
- PR #3: `Add trip dashboard and location management`
- PR #4: `[codex] Add Vacky skills layer`
- PR #5: `Add avatar menu, settings theme picker, and dark-mode polish`
- PR #6: `[codex] Fix globe loading and Three timer compatibility`

The current `master` state also includes direct commit `90cbe69` (`brain experiment`) after PR #6. Existing evidence says GitHub returned no associated PR for that commit, and recent PR metadata stops at #6. Treat `90cbe69` as PR-less unless future GitHub evidence shows otherwise.

## Current Repo State Differences From First Bootstrap

The older current-state bootstrap described local `master` at `fb34bc0` (PR #6 merge commit) and said GitHub PR context was unavailable.

Current state now differs:

- local `HEAD` is `90cbe69`, not `fb34bc0`
- GitHub PR metadata is available for PRs #1 through #6
- the app surface is effectively unchanged by `90cbe69`
- `90cbe69` adds the committed `brain/` knowledge base and workflow docs, not runtime app behavior
- some wiki pages already incorporated the first bootstrap and the direct brain commit before this recalibration pass

## App As It Exists Today

Vacky remains an early-stage authenticated trip-planning app with a real but narrow feature surface:

- public landing page at `/`
- GitHub-authenticated trip dashboard at `/trips`
- trip creation at `/trips/new`
- trip detail at `/trips/[tripId]`
- add-location itinerary flow at `/trips/[tripId]/itinerary/new`
- globe visualization at `/globe`
- account/theme settings at `/settings`

The app is a personal trip planner, not yet a broad travel platform. There is still no source evidence for collaboration, sharing, bookings, budgets, social features, or production deployment assumptions.

## Stronger Understanding From GitHub Evidence

### PR #1

GitHub metadata confirms the foundation PR was explicitly about authentication and Prisma user management. Review comments add source-backed risks around:

- Prisma 7 datasource URL placement
- `DATABASE_URL` fail-fast handling
- redundant `Session.sessionToken` uniqueness/indexing

Current state shows `DATABASE_URL` still uses a non-null assertion without an explicit runtime check.

### PR #2

The PR body explicitly says route-level auth protection for `/trips/new` was planned as follow-up. This should be preserved as source-backed, not inferred.

The PR also confirms the original trip creation scope was a single cover image through UploadThing.

### PR #3

GitHub review summary confirms PR #3 created the core product surface: dashboard, trip detail, add-location flow, persisted locations, geocoding, itinerary reordering, map, globe, and `/api/trips`.

The PR body confirms validation used Node `22.20.0`, lint, and build. It also confirms the first sandboxed build failed on `next/font` Google font fetch, then passed with network access.

Review comments about dynamic route `params` should stay uncertain because the repo's Next.js 16 guidance warns against assuming older App Router semantics.

### PR #4

The PR body gives explicit workflow rationale missing from the first raw note:

- `.agents/skills/` makes repo-local workflows discoverable
- skills route work into existing Vacky docs instead of generic behavior
- curated browser/security skills should be selective
- broad generic skills were intentionally avoided
- Vercel-specific guidance was intentionally deferred

### PR #5

The PR body gives explicit product rationale:

- direct navbar logout was too crude for the signed-in shell
- the app lacked protected settings
- theme persistence was missing
- dark-mode surfaces still had hard-coded light styling
- globe sizing was off-center/overflow-prone

Verification evidence is partial: lint passed, build was blocked by `next/font` network fetch.

### PR #6

The PR body and issue comment precisely explain the globe runtime root cause:

- `react-globe.gl` pulls `three-render-objects`
- that dependency instantiates deprecated `THREE.Clock()`
- top-level globe import caused `window is not defined` on direct route evaluation

Final state includes both webpack and Turbopack aliasing for bare `three`, so the review concern about Turbopack-only aliasing appears addressed.

Current state still shows:

- `GlobeCanvasLoader` is visual-only and lacks accessible loading announcement
- `app/settings/page.tsx` still uses `size-18` for the avatar image

## Current Known Risks Strengthened By This Pass

- `app/api/trips/route.ts` reverse-geocodes every stored location on every request.
- `app/db.ts` still lacks an explicit `DATABASE_URL` runtime guard.
- `/default-avatar.png` is referenced but absent.
- `size-18` may be a non-deterministic avatar sizing utility unless Tailwind v4/config supports it.
- `GlobeCanvasLoader` needs an accessibility pass.
- Globe rendering depends on a local `three` shim and bundler aliases.
- Build verification has repeatedly been sensitive to cold `next/font` network fetches.
- Route-level auth behavior is not uniform; PR #2 explicitly left `/trips/new` route-level protection as a follow-up.

## Areas Where Evidence Remains Weak

- PR #2 and PR #5 returned no review comments through the connector.
- PR #4 has a review summary, but no material specific review comments were exposed.
- Direct commit `90cbe69` has no PR description or review thread.
- Manual browser checks recommended for PR #5 and PR #6 are documented in PR bodies, but no independent completion evidence was found.
- Product rationale remains thin outside PR #4 and PR #5 bodies.
- Deployment assumptions remain unevidenced.

## Wiki Promotions From This Recalibration

Update only durable wiki understanding:

- `now.md` should no longer say GitHub PR metadata was unavailable for PR history.
- `now.md` should still mark direct commit `90cbe69` as PR-less.
- `architecture/overview.md` should strengthen globe boundary/shim details and unresolved loader/accessibility follow-up.
- `architecture/data-and-auth.md` should strengthen Prisma/`DATABASE_URL` and route-level auth follow-up provenance.
- `features/current-surface.md` should strengthen the route/feature timeline with PR #2/#3/#5/#6 source-backed rationale.
- `agents/workflow.md` should preserve PR #4's reason for a thin discoverable skill layer.
- `log.md` should record this GitHub-metadata recalibration.
