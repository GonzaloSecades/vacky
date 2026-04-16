# Local Docker Postgres Architecture Question

Date: 2026-04-16
Type: architecture rationale

## Question

The user asked whether, at the current pre-alpha development stage, Vacky should use a local Docker Postgres instance instead of a Neon database hosted in AWS Brazil while the user is developing from Argentina.

## Context

- Vacky currently uses Postgres through Prisma 7.6.0 and `@prisma/adapter-neon`.
- `app/db.ts` creates `PrismaNeon` directly from `process.env.DATABASE_URL!`.
- `prisma.config.ts` also reads `DATABASE_URL` for CLI operations.
- `prisma/schema.prisma` already targets PostgreSQL and keeps the datasource URL out of the schema.
- The project is not near first pre-alpha deployment.
- The user is working locally from home and wants faster feedback during product shaping.

## Recommendation

Use local Docker Postgres as the default local development path for this stage, while keeping Neon as the future preview/staging/production path.

The local Docker path should optimize for:

- fast local query round trips
- easy reset and migration experiments
- offline-friendly development
- no cloud latency while developing from Argentina against a Brazil-hosted Neon database
- no risk of accidentally damaging shared cloud development data

Neon should remain available for:

- deployment parity once preview/staging starts
- cloud-like testing
- later production hosting near the app runtime
- database branching if it becomes useful for feature work

## Implementation Implications

- The current `app/db.ts` runtime path is Neon-specific and needs an adapter selection strategy before plain Docker Postgres can be first-class.
- The implementation should likely add a standard Postgres Prisma adapter for local Docker Postgres while preserving the Neon adapter for Neon URLs.
- The implementation should also close the existing `DATABASE_URL` fail-fast gap.
- Env examples must use placeholders only; the ignored local `.env` contains real service credentials and should not be quoted or committed.
- Docker lifecycle commands should be explicit about local-only destructive resets.

## Durable Decision

This rationale is promoted into [Local Development Uses Docker Postgres](../../wiki/decisions/2026-04-16-local-dev-docker-postgres.md).

## Follow-Up Prompt

The implementation handoff lives in [Local Docker Postgres Sidequest Prompt](../../outputs/plans/2026-04-16-local-docker-postgres-sidequest-prompt.md).
