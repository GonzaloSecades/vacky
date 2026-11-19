# Twilight Postcards UI Iteration

## Goal

Test whether Vacky feels more like one coherent travel product when the main travel-facing surfaces move away from the earlier coral Airbnb-adjacent experiment and toward a postcard/editorial direction that can hold both reflective memories and forward planning.

## Method

- Rewrote the repo-root `DESIGN.md` around the `Twilight Postcards` system instead of the earlier coral design brief.
- Swapped the light-theme primitives to a plum/paper palette with quieter lavender surfaces, darker utility chrome, and clearer semantic separation between memory accents and planning accents.
- Swapped the display/body typography pairing to `DM Serif Display` plus `Manrope` through `next/font/google`, while keeping `Geist Mono` as the utility mono face.
- Retuned shared primitives and global styling first, then applied the new system to:
  - landing page
  - dashboard `/trips`
  - trip creation `/trips/new`
  - trip detail `/trips/[tripId]`
  - itinerary planner create/edit
  - globe `/globe`
  - navbar, user menu, and shared map/planner chrome
- Kept settings, auth/data behavior, routes, Prisma, and UploadThing out of scope.
- Aligned Google advanced marker click handling with `gmpClickable` and `gmp-click` while the map chrome was being refreshed.

## Outcome

- The app now has a more specific light-theme identity across the main travel surfaces: plum CTAs, paper-like panels, serif editorial headings, and postcard-like framing rather than the broader coral consumer-travel baseline.
- Landing, dashboard, trip creation, trip detail, and globe now present as memory-and-planning surfaces from the same family instead of feeling like separate styles glued together.
- Planner and map-heavy surfaces still keep the darker, faster utility treatment, but that contrast is now more clearly confined to operational zones instead of setting the tone for the full product.
- Shared primitives, navbar, tabs, cards, and action styles now align with the new design spec rather than the earlier coral token set.
- Google advanced marker popup behavior is aligned to the newer `gmp-click` event path instead of relying on the older click-listener behavior.
- This iteration is branch-level PR-prep work on `codex/design-md-twilight-postcards`; merge/verification history should be updated again after the PR lands.

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
- any route, auth, Prisma, or UploadThing behavior changes
- a full dark-mode redesign
- a broader design-system or theming engine

## Lessons

- The fastest way to materially change the product feel was still shared tokens plus a focused set of product pages, but the typography swap was necessary this time because the earlier `Geist`-only direction stayed too generic.
- Planner and map surfaces still benefit from a more utility-first contrast profile, but that treatment works better when the memory-facing pages are allowed to breathe more distinctly.
- Brain pages for visual experiments need updates even when the runtime model is mostly unchanged, because the earlier coral/`Geist` experiment had already become stale relative to the working branch.

## Retry Later

Yes.

Second-pass candidates:

- independently replayed browser/accessibility evidence if this direction becomes the durable visual baseline
- stronger trip-image usage once more real image coverage exists in user data
- a focused pass on settings/user-menu/avatar fallback polish
- optional dark-theme parity if the light-theme direction is accepted
