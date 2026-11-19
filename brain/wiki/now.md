# Current state

Updated: 2026-11-19.

## Running application

Vacky is a Next.js trip planner with email/password auth, cookie sessions, trips, itineraries, uploads, maps, and a globe.
SpacetimeDB remains the running local persistence layer. NestJS and PostgreSQL are not implemented.
No application behavior changed during the brain cleanup.

## Accepted direction

- Replace the backend with NestJS and PostgreSQL.
- Keep Next.js as the web interface.
- Support destination, place/activity, and itinerary recommendations at the appropriate flow stages.
- Live collaboration is not planned.
- Gonzalo writes the backend with incremental assistance and code review.
- Keep one [backend plan](../../docs/nestjs-backend.md). Do not generate more plans for routine work.

## Next step

Start Step 1 of the backend plan: select compatible tool versions and confirm the API boundary.
Do not scaffold the backend until Gonzalo asks to begin coding.

## Legacy status

SpacetimeDB is deprecated for new backend development, but it is not removed or disconnected.
Current scripts, generated bindings, environment values, and local data remain in place until verified cutover.
The retired brain workflows and SpacetimeDB guides are under [deprecated material](../../deprecated/README.md).
Generated graph artifacts are optional and ignored. The prior snapshot remains available locally as described there.

## Open concerns

See [risks](risks.md), especially database caller authorization, geocoding fan-out, incomplete runtime verification, and migration safety.
