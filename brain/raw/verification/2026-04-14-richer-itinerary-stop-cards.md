# Richer Itinerary Stop Cards Verification

Date: 2026-04-14

## Environment

- Branch: `ItineraryEnhancement`
- Node command prefix: `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH`
- App stack: Next.js 16.2.1, Prisma 7.6.0

## Commands Run

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate
```

Result: passed. Prisma Client generated to `app/generated/prisma`.

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
```

Result: passed.

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```

Result: passed. Build compiled successfully, TypeScript completed, and static page generation completed.

## Browser And Manual Checks

Not run by Codex in this session. The user explicitly asked to skip Playwright and will perform manual verification.

Pending manual checklist:

- create itinerary with one selected Google place
- selected place stores and displays category icon/label
- selected place displays a Google-place-type-specific Maki icon in the stop card
- broad Google admin/address types such as `locality`, `neighborhood`, `town_square`, and named piazza/square `route` results do not fall back to `Place`
- expanded card can set `Your rating`, `Cost feel`, and notes
- save persists after refresh
- edit route loads existing category/rating/cost/notes
- changed location still requires autocomplete
- unchanged existing location can still save
- deleting a stop still works
- date validation still works
- planner map remains visible
- trip-detail and planner maps render markers through advanced markers
- trip-detail and planner maps render Vacky category-level pastel custom markers instead of the default red Google marker
- map markers use the broad Vacky category, while itinerary card icons can remain more specific to Google place types
- planner and trip-detail maps can be scroll-zoomed directly without the Cmd/Ctrl-scroll prompt
- planner and trip-detail maps expose a layered `Reset` control that refits the viewport to current markers
- browser console no longer logs legacy `google.maps.Marker`, `google.maps.places.PlacesService`, or `google.maps.places.AutocompleteService` warnings
- short-list top `+ Add` works as before
- long-list add scrolls and focuses the newly added stop card's location input
- desktop secondary `+ Add` appears below the sticky map when the `Locations` heading block is out of view
- desktop secondary `+ Add` creates and focuses a new stop
- tablet/iPad layouts keep the side map sticky and show the secondary `+ Add` below it
- secondary `+ Add` remains hidden on mobile layouts
- mobile bottom `+ Add` appears near the final save action
- planner map and save controls keep right-side viewport spacing on mobile
- unauthorized users cannot mutate another user's trip locations

## Result

Command verification is complete. Manual browser, Google Places, persistence-after-refresh, and hostile-client ownership checks remain open.

## Related Risks

- Keeps `RISK-002` open because browser/manual and hostile-client verification remains incomplete.
- Keeps `RISK-003` open because planner map visibility was not browser-verified in this session.
