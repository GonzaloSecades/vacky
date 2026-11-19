# Product direction

Updated: 2026-11-19 from the user's current instructions.

## Accepted direction

Vacky will support AI-assisted recommendations at three flow stages:

1. Suggest destinations before the traveler chooses a destination.
2. Suggest places and activities after the destination is known.
3. Assemble an itinerary from preferences, candidates, dates, and practical constraints.

Live collaboration is not planned.
The backend foundation comes before the main recommendation feature.
Gonzalo will implement the NestJS backend with incremental assistance.

## Existing product

The running app supports trips, date-grouped itineraries, Places selection, maps, a globe, uploads, and account sessions.
AI recommendations, traveler-profile derivation, completed-trip capture, and profile corrections are not implemented.

## Useful prior design

The [June 12 profile epic](../../outputs/plans/2026-06-12-travel-memory-traveler-profile-epic.md) remains supporting design evidence.
Its deterministic profile, confidence, sample size, raw notes, and explicit corrections can inform the backend.
Its SpacetimeDB implementation details and old phase gates are not current instructions.
The June 11 snapshot plan is superseded.
The exact memory-capture flow and recommendation contracts remain to be refined during the backend work.

## Deferred scope

Bookings, marketplace inventory, public sharing, reservation import, photo automation, and live collaboration are outside the current backend migration.
Embeddings, a vector database, and specialized geographic search require a concrete retrieval need.
Do not add them simply because the product uses AI.

The [backend plan](../../../docs/nestjs-backend.md) is the only active implementation plan.
