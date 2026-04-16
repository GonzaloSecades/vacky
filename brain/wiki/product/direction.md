# Product Direction

This page separates durable product direction from the current implemented surface.

The current product surface is tracked in [Current Surface](../features/current-surface.md). This page tracks what Vacky may become and which product choices are still open.

## Current Product Truth

Vacky is currently planning-first in implementation:

- create trips
- create and edit date-grouped itineraries
- select places through Google Places autocomplete
- view trips on maps and globe
- manage a browser-local theme

There is no accepted current product truth for collaboration, bookings, budgeting, public sharing, marketplace inventory, broad trip editing/deletion, reservation import, or AI plan generation.

## Strongest Open Direction

The strongest emerging product thesis is memory-first travel software:

- let users register completed trips
- capture places visited, dates, notes, photos, favorites, dislikes, style, pace, budget signals, transport, accommodation type, and return/skip signals
- turn maps, globe, and trip history into a personal travel knowledge source
- later use that memory graph for personalized AI planning

This direction is not accepted yet. It is an open product experiment and should not be described as shipped behavior or committed strategy.

## Why It Is Plausible

The current app already has useful foundations:

- `Trip`
- date-grouped `Location` rows
- Google Places-backed place selection
- maps
- globe
- cover image upload

The competitor/reference scan suggests booking-first and logistics-first travel software is crowded, while user-owned travel memory could be a sharper wedge.

## Why It Is Still Weak

The brain has no user research, usage data, or explicit founder decision proving that memory-first is the right direction.

The idea also has unresolved product questions:

- whether completed trips are a trip status, a separate flow, or a separate mode
- how memory signals attach to trips, days, and locations
- whether exact dates are required for old trips
- how much manual reconstruction friction users will tolerate
- whether photos are central or optional
- when AI becomes visible to users

The trip-level Photos tab brainstorm is the clearest current implementation-shaped memory-first candidate. It argues for a trip photo inbox before photo-to-location automation: upload/display trip photos first, optionally link them to existing locations, and keep EXIF/GPS handling explicit because photo metadata can expose sensitive location and timestamp data. This is still a promote candidate, not accepted product strategy.

## Current Recommendation

Do not build broad AI planning, booking, marketplace, public review, or collaboration scope next.

First either:

1. harden the current planning MVP, or
2. make an explicit decision to test the small memory-first slice: register a completed trip.

If memory-first is accepted, add a decision note under `wiki/decisions/` before implementation.

## Evidence

- [competitor feature canon raw reference](../../raw/references/2026-04-11-competitor-feature-canon-memory-first.md)
- [current state and next ideas brief](../../outputs/briefs/2026-04-12-current-state-and-next-ideas.md)
- [memory-first starting point brief](../../outputs/briefs/2026-04-12-memory-first-trip-itinerary-starting-point.md)
- [trip photos tab brainstorm](../../outputs/brainstorms/2026-04-15-trip-photos-tab-future-implementation.md)
- [memory-first experiment note](../experiments/2026-04-12-memory-first-direction.md)
- [current product surface](../features/current-surface.md)
- [PR #9 brain ingest and briefings raw note](../../raw/commits/2026-04-12-pr-9-brain-ingest-briefings.md)
