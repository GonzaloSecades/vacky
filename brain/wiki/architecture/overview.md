# Architecture

Updated: 2026-11-19. This page describes the running application.

## Current implementation

- Next.js App Router serves the web UI and server-rendered reads.
- `app/api/` owns auth, globe data, and UploadThing routes.
- `lib/actions/` owns form mutations and itinerary validation.
- `lib/auth/` owns password hashing, session cookies, and verification tokens.
- `lib/spacetimedb/` adapts generated bindings to application records.
- `spacetimedb/src/` owns private tables, reducers, and procedures.
- UploadThing stores uploaded images.
- Google Maps, Places, and geocoding support location selection and display.

Next.js runs on port 3001. Legacy SpacetimeDB runs locally on port 3000.
No live application subscriptions are implemented.

## Product behavior to preserve

Preserve account registration, verification, sign-in/out, trip create/list/detail/delete, itinerary create/edit, and same-day ordering.
Preserve place metadata, ratings, cost sentiment, notes, uploads, maps, globe reads, and cookie-backed themes.
Trip details do not yet have a general update API. Do not describe the existing backend as complete CRUD.

Calendar days use date-only semantics. Preserve the [itinerary date decision](../decisions/2026-04-11-itinerary-date-keys.md).
Modern Places APIs, autocomplete session tokens, advanced markers, map IDs, and the globe compatibility shim remain relevant.

## Transition

SpacetimeDB is deprecated for new backend development. Existing runtime paths remain necessary until replacement checks pass.
The accepted target is a modular NestJS backend with PostgreSQL and a Next.js web interface.
The target does not exist yet. See the [backend plan](../../../docs/nestjs-backend.md).

Keep runtime truth separate from proposed design. Record completion only after implementation and verification.
See [data and auth](data-and-auth.md) for current boundaries and [risks](../risks.md) for unresolved issues.
