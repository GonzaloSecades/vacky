# PR #8 Raw Note

Title: [codex] Add itinerary planner create and edit flow

PR: https://github.com/GonzaloSecades/vacky/pull/8

Merge date: 2026-04-11

Merge commit: `041c74d03a719db8c58c06d0999b3c109e96a760`

Branch: `Feature-ItineraryPlanner`

Base: `97509203784f644188706a14878ec0decf184ec6`

Head: `d6f51e341775db5900a19657187df8001018990a`

## Evidence Used

- GitHub PR metadata, body, final diff, review overview, and inline review comments for PR #8.
- Local merge commit `041c74d`.
- Local final `master` state after the merge, noting that later commit `84f9abd` changes only `brain/.obsidian/workspace.json`.
- Branch raw artifacts under `brain/raw/2026-04-11-itinerary-planner/`.

## Problem Or Goal

Replace the narrow single-location add flow with a scoped itinerary planner for an existing trip.

The merged PR body frames the goal as allowing users to create an itinerary from Google Places autocomplete results, schedule stops on trip days, view selected stops on a planner map, and later edit, add, or delete stops through the same planner surface.

## Final Merged Behavior

Final merged behavior:

- `/trips/[tripId]/itinerary/new` creates the first itinerary for an owned trip with no locations and redirects to edit if locations already exist.
- `/trips/[tripId]/itinerary/edit` edits an owned trip with existing locations and redirects to new if none exist.
- `components/itinerary-planner.tsx` provides the shared create/edit planner with Google Places autocomplete, date selection, add/remove rows, save state, and planner markers.
- `components/itinerary-planner-map.tsx` renders the planner map and fits or centers selected markers.
- Trip detail actions now switch between `Create itinerary` and `Edit itinerary`.
- Saved itineraries are grouped by generated trip-day sections.
- Drag-and-drop ordering is limited to locations within one scheduled day.
- `Location.scheduledDate` stores nullable `YYYY-MM-DD` date keys.
- `lib/itinerary-dates.ts` centralizes date-key parsing, validation, grouping, sorting, and display helpers.
- `lib/actions/itinerary.ts` adds transactional create/save actions with auth, owned-trip scoping, payload validation, date-range validation, retained/deleted ID validation, and selected-place requirements.
- `lib/actions/reorder-itinerary.ts` now validates scheduled day, trip ownership, location IDs, and same-day membership before writing order.
- `lib/google-maps.ts` centralizes Google Maps script ID, Places library loading, and browser key access for the trip map and planner.
- Migration `20260411170000_add_location_scheduled_date` adds `Location.scheduledDate`.
- Migration `20260411052501_cascade_location_trip_fk` adjusts the `Location.tripId` foreign key to cascade deletes.

## Main Files Or Areas Touched

- itinerary routes:
  - `app/trips/[tripId]/itinerary/new/page.tsx`
  - `app/trips/[tripId]/itinerary/edit/page.tsx`
- planner UI and maps:
  - `components/itinerary-planner.tsx`
  - `components/itinerary-planner-map.tsx`
  - `components/tripDetail.tsx`
  - `components/sortable-itinerary.tsx`
  - `components/map.tsx`
- server/data:
  - `lib/actions/itinerary.ts`
  - `lib/actions/reorder-itinerary.ts`
  - `lib/actions/get-trip-by-id.ts`
  - `lib/itinerary-dates.ts`
  - `lib/google-maps.ts`
  - `prisma/schema.prisma`
  - `prisma/migrations/20260411052501_cascade_location_trip_fk/migration.sql`
  - `prisma/migrations/20260411170000_add_location_scheduled_date/migration.sql`
- brain evidence and wiki:
  - `brain/raw/2026-04-11-itinerary-planner/`
  - `brain/raw/sessions/2026-04-11-itinerary-planner-brainstorm.md`
  - `brain/raw/references/2026-04-11-competitor-feature-canon-memory-first.md`
  - `brain/outputs/brainstorms/2026-04-11-itinerary-planner-mvp.md`
  - `brain/wiki/**`

## Verification Evidence

The PR body reports these commands as passed:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```

The branch verification note under `brain/raw/2026-04-11-itinerary-planner/verification.md` records the same passing Prisma generation, lint, and production build evidence, plus a later passing lint run after the migration directory rename.

Manual browser verification remains recommended for itinerary create/edit, Places autocomplete, planner map fitting, same-day ordering persistence, and unauthorized mutation boundaries.

## Review-Driven Changes Or Comments

GitHub review evidence exists for PR #8.

- Copilot review summarized the core implementation as `Location.scheduledDate`, create/save server actions with auth and validation, and a new Places-backed planner UI.
- Copilot flagged that the first cascade-only migration folder name looked like another scheduled-date migration. Final merged state renamed it to `20260411052501_cascade_location_trip_fk`, so this concern appears addressed.
- Copilot flagged `components/itinerary-planner.tsx` map container classes `h-90`, `md:h-105`, and `lg:h-115` as non-default Tailwind spacing utilities that may leave the map without a height. Current merged code still uses those classes, so this remains an unresolved follow-up unless Tailwind v4 generates them in this setup.
- Copilot flagged `brain/.obsidian/workspace.json` and `brain/.obsidian/graph.json` as editor-local metadata noise. Both were included in PR #8's merge diff. A later `84f9abd` commit changes only `brain/.obsidian/workspace.json` and is ignored here as editor-state churn, not product or architecture evidence.

## Additional Raw Reference Added

Commit `d6f51e3` added `brain/raw/references/2026-04-11-competitor-feature-canon-memory-first.md`.

That file is explicitly marked as a raw reference artifact, not yet promoted to wiki. It records a competitor/market analysis that suggests a memory-first Vacky direction, but current product wiki pages should treat it as source material, not as an accepted product decision.

## Risks, Follow-Ups, Or Unresolved Questions

- Planner map visibility may be brittle because `components/itinerary-planner.tsx` still uses non-default-looking Tailwind height utilities on the map container.
- Places autocomplete adds another Google API configuration and billing/rate-limit dependency to the browser key.
- Server saves structurally validate selected-place payloads but do not re-query Google Places; this is an explicit MVP scope tradeoff from the branch raw notes.
- Legacy unscheduled locations remain migration-safe and can appear in the saved itinerary until edited into scheduled rows.
- Review comments about Obsidian metadata noise were not fully acted on before merge.
- Manual browser checks are still needed; command verification alone does not prove Google Maps/Places behavior.

## What Should Be Promoted Into The Wiki

- Current product surface should describe PR #8 as merged, not branch-local.
- Architecture and data pages should treat `Location.scheduledDate` and same-day order semantics as current master behavior.
- Current risks should include the unresolved planner-map height review comment and remaining manual verification need.
- A decision note is justified for the date-only scheduled itinerary key, because branch raw notes explicitly rejected UTC-normalized date handling and current schema stores `scheduledDate` as a nullable string.
