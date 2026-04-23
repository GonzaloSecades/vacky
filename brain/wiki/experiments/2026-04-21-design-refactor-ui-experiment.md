# DesignRefactor UI Experiment

## Goal

Test whether Vacky feels more like a polished consumer travel product when the current travel-facing surfaces adopt an Airbnb-led visual direction, with restrained Uber-style influence only on dense map and itinerary-planning UI.

## Method

- Added a repo-root `DESIGN.md` describing the experiment rules for future agents.
- Chose the warm travel palette with coral primary CTA (`#FF5A5F`) and warm off-white background (`#FFFDFC`) as the default experiment palette.
- Kept `Geist` typography and changed the feel through tokens, spacing, radius, shadows, and surface treatment rather than a font swap.
- Retuned shared primitives and global styling first, then applied the new system to:
  - landing page
  - dashboard `/trips`
  - trip creation `/trips/new`
  - trip detail `/trips/[tripId]`
  - itinerary planner create/edit
  - globe `/globe`
  - navbar and shared map/planner chrome
- Left settings, auth flows, and the rest of the app outside the experiment.

## Outcome

- The app now has one warmer light-theme visual system across the main travel surfaces instead of mixing neutral shadcn defaults with older hard-coded gray/blue page styling.
- Landing and browse surfaces are softer, more rounded, and more destination-oriented.
- Dense map/planner surfaces gained stronger black/white utility contrast without turning the whole app into a logistics dashboard.
- The planner map now uses explicit supported arbitrary heights instead of the previously questioned `h-90`, `md:h-105`, and `lg:h-115` classes.
- The stale `TripPlanner` landing CTA copy is gone.
- Node 22 lint/build passed, and final browser/manual coverage was approved by the user on 2026-04-23; Codex did not replay Playwright at user direction.

## Included Surfaces

- `app/page.tsx`
- `app/trips/page.tsx`
- `app/trips/new/page.tsx`
- `components/tripDetail.tsx`
- `components/sortable-itinerary.tsx`
- `components/itinerary-planner.tsx`
- `components/map.tsx`
- `components/itinerary-planner-map.tsx`
- `app/globe/page.tsx`
- navbar and shared UI primitives

## Intentionally Left Out

- `/settings`
- auth flows beyond their existing entry points and labels
- any route, auth, API, Prisma, or UploadThing behavior changes
- a full dark-mode redesign
- a broader design-system or theming engine

## Lessons

- The quickest high-signal UI shift came from shared tokens plus a small set of product pages, not from a global app rewrite.
- Planner and map surfaces benefit from a more utility-first contrast profile, but that treatment should stay selective.
- The branch-level brain should track visual experiments, because current-surface and risk pages can go stale even when only presentation changes.

## Retry Later

Yes.

Second-pass candidates:

- independently replayed browser/accessibility evidence if this direction becomes the durable visual baseline
- stronger trip-image usage once more real image coverage exists in user data
- a focused pass on settings/user-menu/avatar fallback polish
- optional dark-theme parity if the light-theme direction is accepted
