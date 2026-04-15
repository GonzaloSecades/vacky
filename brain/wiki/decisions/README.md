# Decisions

Store one page per meaningful decision.

## Current Decisions

- [Itinerary Date Keys](2026-04-11-itinerary-date-keys.md): store scheduled itinerary days as nullable `YYYY-MM-DD` strings on `Location`, with same-day order semantics.

## Decision Candidates

These are not accepted decisions yet. They are candidates because the topic repeats across the brain and would benefit from explicit alternatives, accepted downside, and revisit criteria.

- memory-first before booking-first, tracked in [Product Direction](../product/direction.md) and the [memory-first experiment](../experiments/2026-04-12-memory-first-direction.md)
- geocoding persistence or caching strategy for `/api/trips`, tracked as `RISK-001` in [Risks](../risks.md)
- route-level auth UX policy for protected pages, tracked as `RISK-004` in [Risks](../risks.md)
- whether itinerary saves should continue trusting structurally validated Google Places payloads or re-query Places server-side

Use this folder when the project chooses between alternatives and the rationale is worth preserving.

Each decision page should answer:

- what was decided
- what options existed
- why this option won
- what downside was accepted
- what would cause the decision to be revisited
