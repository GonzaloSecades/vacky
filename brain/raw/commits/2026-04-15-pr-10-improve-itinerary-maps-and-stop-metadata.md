# PR #10 Raw Merge Note

PR: https://github.com/GonzaloSecades/vacky/pull/10

Title: Improve itinerary maps and stop metadata

Merge date: 2026-04-15 15:16:33 UTC / 2026-04-15 12:16:33 -0300

Merge commit: `cf2516c8bd1385adf75859dd60eaabea7d00ec40`

Source branch: `ItineraryEnhancement`

Final head commit: `6f2752167d3ca1db64196e059d929fb724bf1381`

Base commit: `f67864d298bc98fedacd97209da5b1d9a8debe59`

## Evidence Used

- GitHub PR #10 metadata from the GitHub connector: title, source branch, base branch, merge state, merge timestamp, merge commit, final head SHA, changed-file count, additions, deletions, PR body, and comments.
- GitHub review comments and review summary fetched for PR #10.
- GitHub commit metadata for final head commit `6f2752167d3ca1db64196e059d929fb724bf1381`.
- Local `git pull --ff-only origin master` on 2026-04-15, which reported `Already up to date`.
- Local `git show --quiet --format=fuller cf2516c8bd1385adf75859dd60eaabea7d00ec40`.
- Local `git show --stat --summary --find-renames cf2516c8bd1385adf75859dd60eaabea7d00ec40`.
- Local `git diff --name-status f67864d298bc98fedacd97209da5b1d9a8debe59 6f2752167d3ca1db64196e059d929fb724bf1381`.
- Current merged files on `master`, especially `lib/actions/itinerary.ts`, `components/map.tsx`, `components/canvas-loader.tsx`, `app/layout.tsx`, and the existing branch-level raw/wiki notes added by PR #10.

## Problem Or Goal

PR #10 aimed to make itinerary stops carry richer travel memory metadata and move map/planner integrations onto the modern Google Maps and Places APIs needed for custom marker work.

The PR also carried a branch-level brain sync so the implementation details, verification evidence, generated Google Maps styling artifact, and open risks were available before review.

## Final Merged Behavior

The merged app now supports richer itinerary planner stop cards with collapsed summaries and expanded metadata inputs. New and edited itinerary stops can store:

- Google `placeId`
- Google `placeTypes`
- inferred Vacky `placeCategory`
- optional `appreciation`
- optional `priceSentiment`
- optional `notes`

`Location` gained controlled Prisma enums for place category and cost feel, nullable metadata columns, a default empty `placeTypes` array, and a database check constraint requiring `appreciation` to be null or between 1 and 5.

The itinerary server actions remain the mutation boundary. They validate authentication, trip ownership, date range, retained/deleted location IDs, selected-place requirements for new or changed rows, controlled metadata values, and rating bounds. In the final head commit, `normalizeStringArray()` also trims place types, filters blanks, and de-duplicates repeated values before persistence.

Trip-detail and planner maps now use Google Maps Advanced Markers with Vacky category styling, compact marker popups, Google Maps outbound links, shared fit-bounds helpers, shared accessible canvas loading UI, base-map idle gating before marker render, and reset-to-markers controls.

The itinerary planner now uses newer Google Places JavaScript APIs:

- `AutocompleteSuggestion.fetchAutocompleteSuggestions()`
- row-scoped `AutocompleteSessionToken`
- `PlacePrediction.toPlace()`
- `Place.fetchFields()`

The PR also added a schema-validated Google Cloud-based Map Styling JSON artifact under `brain/outputs/google-maps-vacky-focus-cbms-style.json`, ignored local Obsidian graph/workspace state, and updated the branch-level brain/wiki pages.

## Main Files Or Areas Touched

Runtime and schema areas:

- `prisma/schema.prisma`
- `prisma/migrations/20260413180000_add_location_place_metadata/migration.sql`
- `lib/actions/itinerary.ts`
- `lib/location-metadata.ts`
- `lib/map-bounds.ts`
- `lib/google-maps.ts`
- `components/itinerary-planner.tsx`
- `components/itinerary-planner-map.tsx`
- `components/map.tsx`
- `components/google-map-advanced-marker.tsx`
- `components/itinerary-place-type-icon.tsx`
- `components/canvas-loader.tsx`
- `app/trips/[tripId]/itinerary/edit/page.tsx`
- `app/globe/page.tsx`
- `app/layout.tsx`
- `app/page.tsx`

Brain and workflow areas:

- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/architecture/overview.md`
- `brain/wiki/features/current-surface.md`
- `brain/wiki/now.md`
- `brain/wiki/risks.md`
- `brain/wiki/log.md`
- `brain/wiki/product/direction.md`
- `brain/wiki/experiments/2026-04-12-memory-first-direction.md`
- `brain/raw/sessions/2026-04-14-richer-itinerary-stop-cards.md`
- `brain/raw/sessions/2026-04-14-google-maps-modern-api-migration.md`
- `brain/raw/sessions/2026-04-15-itinerary-planner-stopcard-performance.md`
- `brain/raw/verification/2026-04-14-richer-itinerary-stop-cards.md`
- `brain/raw/verification/2026-04-15-itinerary-enhancement-pr-ready.md`
- `brain/outputs/google-maps-vacky-focus-cbms-style.json`

Diff summary from GitHub/local merge evidence:

- 45 files changed
- 3,642 insertions
- 584 deletions
- tracked Obsidian `graph.json` and `workspace.json` removed
- new Prisma migration and generated branch-level brain evidence added

## Review Comments And Resolution

GitHub Copilot review on 2026-04-15 generated two actionable inline comments.

1. `lib/actions/itinerary.ts`: `normalizeStringArray()` trimmed values but did not filter empty strings, so payloads like `[" "]` could persist as `[""]`.

Resolution: final head commit `6f2752167d3ca1db64196e059d929fb724bf1381` changed the helper to build a normalized list, skip blank trimmed values, and de-duplicate repeated place types. This is reflected in current merged `lib/actions/itinerary.ts`.

2. `components/map.tsx`: the trip-detail map no longer forced `mapTypeId="terrain"`, which changed the base map type unless intentional.

Resolution: no terrain restoration landed. Gonzalo replied that a Google Maps Platform cloud style had been added for the map ID and that styling/behavior was there. The final merged code uses `mapId: getGoogleMapsMapId()` with the advanced-marker map setup. Treat the base-map-type change as intentionally accepted through cloud styling, not as a restored terrain map.

Additional review-driven or late-head changes:

- Final head commit message says `locations action normalization improvement, css tailwind suggestion applied`.
- The same final head commit changed the landing page hero background utility from `bg-gradient-to-b` to Tailwind v4 `bg-linear-to-b`.
- No fetched PR comment explicitly named that Tailwind utility change, so the exact review source for the CSS suggestion is not captured here.

## Verification Evidence

PR body records passing:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
git diff --check
```

Branch-level raw verification note `brain/raw/verification/2026-04-15-itinerary-enhancement-pr-ready.md` records the same command evidence and says the build compiled, completed TypeScript, collected page data, generated 10 static pages, and finalized route output.

Manual browser verification was reported complete by the user before the PR-ready pass. Codex did not replay browser automation or Playwright in that session.

Hostile-client ownership checks were reviewed in code but not exercised against a running app during the PR-ready pass.

This post-merge sync did not rerun product lint/build because it only updates brain markdown files. It should run `git diff --check` before commit.

## Risks, Follow-Ups, And Unresolved Questions

- `/api/trips` still reverse-geocodes every stored location on every globe data request; PR #10 intentionally left that risk unchanged.
- Production advanced markers should use a real `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`; local/test fallback is Google's `DEMO_MAP_ID`.
- Manual browser verification was user-reported but not independently replayed by Codex. Preserve that distinction.
- Hostile-client ownership checks still need an exercised verification note, even though code review found the server action boundary intact.
- If 20+ stop itineraries show editing pressure, the documented future path is to split row cards into memoized `StopCard` children with stable row-specific props and callbacks.
- The trip-detail map no longer forces terrain. Current evidence says cloud styling was the intended resolution, but the exact cloud map style deployed in Google Cloud was not independently inspected during this post-merge sync.
- The landing page metadata now says Vacky, but lower CTA copy still says `TripPlanner`.

## What Should Be Promoted Into The Wiki

- PR #10 is merged current state, not branch-local `ItineraryEnhancement` work.
- Current-surface and architecture pages should cite this raw merge note as the primary PR #10 evidence.
- The richer itinerary metadata, Advanced Markers, modern Places API migration, and shared accessible `CanvasLoader` should remain concise durable architecture/current-surface facts.
- `RISK-007` can be marked resolved because `GlobeCanvasLoader` was replaced by shared `CanvasLoader` with `role="status"` and screen-reader text.
- `RISK-012` should narrow to stale landing CTA/branding copy because app metadata was fixed in PR #10.
- `RISK-002` should remain open until independent browser/manual and hostile-client verification notes exist.
