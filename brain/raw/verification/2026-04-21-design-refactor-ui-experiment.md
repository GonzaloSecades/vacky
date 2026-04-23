# DesignRefactor UI Experiment Verification

Date: 2026-04-21
Final PR-ready replay: 2026-04-23
Branch: `DesignRefactor`

## Commands

### Lint

Command:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
```

Result:

- passed
- exited with code `0`
- replayed on 2026-04-23 with Node `22.20.0`

### Build

Command:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```

Result:

- passed
- exited with code `0`
- Prisma client generation completed
- Next.js production build compiled successfully
- static page generation completed for the current route set
- replayed on 2026-04-23 with Node `22.20.0`

## Browser / Manual Coverage

Status: approved by user on 2026-04-23.

Covered surfaces:

- `/`
- `/trips`
- `/trips/new`
- `/trips/[tripId]`
- itinerary create/edit planner
- `/globe`

Reported check areas:

- responsive layout
- keyboard/focus behavior
- obvious contrast issues
- upload/pending states where feasible
- map/planner controls
- obvious visual regressions

Codex did not replay Playwright/browser automation during the final PR-ready pass because the user explicitly directed Codex to skip Playwright and continue with PR creation.

## Notes

- The UI experiment stayed inside styling, layout, and product-surface presentation work. No auth, Prisma schema, UploadThing route, or API contract changes were introduced.
- The planner map container no longer uses the previously questioned `h-90`, `md:h-105`, and `lg:h-115` classes; it now uses explicit supported arbitrary heights.
- The landing page no longer contains the stale `TripPlanner` CTA copy.
- `npm run dev` could not be used directly during final wrap-up because the pre-dev local Postgres guard detected port `5432` already in use outside the compose service. The existing local Next dev server was reachable at `http://localhost:3000` with escalation for localhost access.
