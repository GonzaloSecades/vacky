# NestJS backend and simpler project memory

Date: 2026-11-19. Status: accepted direction, implementation pending.

## Decision

Replace the legacy backend with NestJS and PostgreSQL. Keep Next.js for the web interface.
Support destination, place/activity, and itinerary recommendations at the relevant flow stages.
Live collaboration is not planned.
Gonzalo will write the backend with incremental explanation, code review, and verification.
Keep one [backend implementation plan](../../../docs/nestjs-backend.md).

Retire mandatory Vacky command prompts, fixed agent teams, Operator ceremonies, and routine graph rebuilds.
Maintain concise current facts, risks, decisions, and useful product context directly.

## Reasons and costs

The user wants a backend with clear service boundaries, durable jobs, flexible data queries, and external integrations.
SpacetimeDB's live subscriptions are not used by the current app, and collaboration is outside the product direction.
The change adds API, database, worker, migration, and deployment responsibilities.
No performance improvement is assumed. Measure actual workloads before claiming one.

## Transition

SpacetimeDB remains operational and local-only until replacement parity, data migration, and rollback checks pass.
Deprecation does not mean completed removal. No backend code or data migration accompanies this decision.
ORM, HTTP adapter, deployment provider, and exact versions remain implementation choices in Step 1.

## Evidence

The user requested brain pruning, SpacetimeDB deprecation, and one NestJS plan on 2026-11-19.
The user explicitly reserved backend implementation for himself with assistance.
Current source still imports SpacetimeDB through `lib/spacetimedb/`.
