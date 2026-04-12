# Current State And Next Ideas Brief

Date: 2026-04-12
Project: Vacky
Status: reusable output, not canonical wiki

## Source Basis

Primary wiki context read first:

- `wiki/now.md`
- `wiki/features/current-surface.md`
- `wiki/architecture/overview.md`
- `wiki/architecture/data-and-auth.md`
- `wiki/decisions/README.md`
- `wiki/decisions/2026-04-11-itinerary-date-keys.md`
- `wiki/log.md`

Additional non-wiki source consulted because the wiki only summarizes the new-ideas thread:

- `raw/references/2026-04-11-competitor-feature-canon-memory-first.md`
- `outputs/brainstorms/2026-04-11-itinerary-planner-mvp.md`

## 1. Current State

### Facts

Vacky is an early-stage authenticated trip-planning app built with Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Prisma/Postgres via Neon, NextAuth GitHub auth, UploadThing, and Google Maps/Places/geocoding.

The current implemented product surface is coherent but still narrow:

- authenticated trip creation with optional cover image upload
- trip dashboard and trip detail pages
- date-grouped itinerary creation and editing
- Google Places autocomplete for itinerary locations
- same-day manual itinerary ordering
- trip map and global travel globe
- settings page with browser-local light/dark theme

The itinerary planner from PR #8 is now merged behavior. It treats an itinerary as a trip's `Location[]`, not as a separate `Itinerary` model. Scheduled days are stored as nullable `YYYY-MM-DD` strings on `Location.scheduledDate`, and ordering is scoped to locations within the same scheduled day.

### Interpretation

The app has moved beyond scaffold status into a real planning MVP. Its strongest current area is authenticated personal trip planning: create a trip, add scheduled places, view them by day, reorder same-day stops, and visualize them on maps/globe.

The product is not yet a broad travel platform. There is no current evidence for collaboration, sharing, bookings, budgeting, reservation import, route optimization, offline support, or post-trip journaling.

### Current Risks And Gaps

- Manual browser verification is still missing or weak for itinerary flows, Places autocomplete, planner map sizing, globe, settings, and unauthorized mutation boundaries.
- `/api/trips` reverse-geocodes every stored location on each request, creating latency and Google API cost risk.
- Planner map height classes were flagged in PR #8 review and still need verification or cleanup.
- Auth UX is not uniform across protected routes, even though data and mutation boundaries are stronger.
- Some polish and correctness gaps remain: stale landing metadata/copy, missing `/default-avatar.png`, visual-only globe loader, and unclear `DATABASE_URL` fail-fast handling.
- Product rationale is weaker than implementation evidence; the wiki mostly knows what exists, not why Vacky should become one thing over another.

## 2. New Ideas And Possible Next Steps

### New Ideas

The strongest emerging idea is a memory-first direction: Vacky could become a personal travel memory graph rather than another booking-first or logistics-first travel app.

Core concept:

- let users register completed trips
- capture places visited, dates, notes, photos, favorites, dislikes, travel style, pace, budget signals, transport, accommodation type, and return/skip signals
- turn maps, globe, and trip history into a reusable personal travel knowledge source
- later use that memory graph to make AI planning personalized from the user's own history instead of generic destination content

High-fit feature ideas from the raw competitor/reference analysis:

- completed-trip registration
- past trip routes and places as a visual story
- visited, favorite, avoid, and want-to-return place signals
- lightweight personal travel statistics
- optional notes or journal entries per day/place
- future AI planning grounded in user-owned memories

Ideas that should stay later-scope for now:

- booking, payments, and inventory
- public reviews or marketplace features
- route optimization and transport planning
- reservation/email import
- collaboration and sharing
- full offline mode
- AI plan generation before useful memory capture exists

### Recommendations

1. Finish hardening the current planning MVP before expanding scope.
   Prioritize manual browser checks, planner map height verification, auth-boundary checks, `/api/trips` geocoding cost, default avatar fallback, globe loader accessibility, and stale landing metadata/copy.

2. Decide whether Vacky is planning-first, memory-first, or both.
   The current app is planning-first in implementation, but the raw market analysis suggests memory-first may be a stronger wedge.

3. If memory-first is accepted, define the first small product slice as `Register a completed trip`.
   Keep it single-player and manual at first. Minimum useful data: title, date range, cities/countries, day-by-day places, optional notes/photos, simple rating or sentiment, travel-style tags, and return/skip signals.

4. Reuse the current itinerary/location model carefully.
   The existing trip, date-grouped locations, maps, globe, and UploadThing cover-image support already point toward memory capture, but the data model may need explicit memory fields before it can support preference extraction well.

5. Keep AI as a later outcome, not the next feature.
   The near-term asset should be clean, structured memory capture. AI becomes useful after Vacky has enough personal travel history to retrieve from.

## Uncertainty And Missing Evidence

- The memory-first direction is raw reference material, not an accepted product decision.
- No user research or usage evidence was found in the wiki to prove whether users want planning, completed-trip memory, or both.
- The current wiki has strong implementation history but limited product-rationale history.
- Live deployment, live database state, and real Google API behavior were not inspected for this brief.

## Wiki Promotion Note

Do not promote this whole brief into the wiki as-is. The current-state section mostly restates existing wiki knowledge.

Promote only if decisions are made:

- If memory-first becomes accepted direction, add a concise product-rationale section to `wiki/features/current-surface.md`.
- If the tradeoff is explicit, add a decision record under `wiki/decisions/` for memory-first before booking-first.
- If manual browser checks are run, ingest those results into raw notes and refresh `wiki/now.md` risks and next actions.
