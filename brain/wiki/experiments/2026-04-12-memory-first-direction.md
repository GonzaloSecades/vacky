# Memory-First Direction

Date: 2026-04-12

Status: open product experiment, not accepted direction

## Goal

Evaluate whether Vacky should become a memory-first travel graph rather than another booking-first or logistics-first travel app.

The candidate first slice is: register a completed trip.

## Method

The exploration compared Vacky's current implemented surface against a competitor/reference scan and then produced two reusable briefs.

Primary source material:

- [competitor feature canon raw reference](../../raw/references/2026-04-11-competitor-feature-canon-memory-first.md)
- [current state and next ideas brief](../../outputs/briefs/2026-04-12-current-state-and-next-ideas.md)
- [memory-first starting point brief](../../outputs/briefs/2026-04-12-memory-first-trip-itinerary-starting-point.md)
- [current product surface](../features/current-surface.md)

## Outcome So Far

The exploration found a plausible wedge:

- current Vacky already has trips, scheduled places, maps, globe, and cover images
- booking, marketplace, public-review, and transport scope would be too large for the current product
- completed-trip memory capture could create user-owned travel history that later AI planning can use

This is not yet an accepted product direction. The implemented app remains planning-first in current repo behavior.

## Lesson

The memory-first idea is stronger than generic "AI trip planner" positioning because it gives Vacky a proprietary personal context layer. But the idea is still vague unless it becomes a small product decision with a defined first slice, data model impact, and non-goals.

## Should It Be Retried Later?

Yes. Retry as a product decision session before building new broad planner features.

The decision should answer:

- is Vacky planning-first, memory-first, or both?
- does completed-trip entry reuse the existing trip/itinerary flow or get a separate mode?
- what memory signals belong on trips, days, and locations?
- what should maps and globe mean for completed trips?
- what is intentionally excluded from the first memory slice?

## Promotion Rule

Do not promote this experiment into accepted product truth until there is an explicit decision record under `wiki/decisions/`.
