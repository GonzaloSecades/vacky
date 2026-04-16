# Local Development Uses Docker Postgres

Date: 2026-04-16
Status: implemented and locally verified

## Decision

For the current pre-alpha stage, Vacky should use a local Docker Postgres database as the default local development database, while preserving Neon as the preview/staging/production path.

## Options Considered

- Continue using Neon for all development.
- Use local Docker Postgres for day-to-day local development and keep Neon for deployment-like environments.
- Move fully to local Postgres and remove Neon-specific setup.

## Why This Option Won

The project is still before first pre-alpha deployment, so local iteration speed and safe experimentation matter more than cloud parity on every local run.

A Docker Postgres instance gives fast local round trips, repeatable resets, migration testing, and offline-friendly development. It also avoids every Prisma query paying the developer-machine-to-Brazil network round trip while the app is running locally from Argentina.

Neon still matters later because it is the likely managed Postgres path for preview/staging/production and should remain available for deployment parity.

## Accepted Downsides

- Local Docker Postgres is not exactly the same operational environment as Neon.
- The runtime Prisma adapter setup becomes slightly more complex because Vacky must support both local Postgres and Neon.
- Local setup needs clear documentation so resets cannot be confused with shared or cloud databases.

## Revisit If

- Vacky reaches preview/staging and Neon parity becomes more important than local speed.
- The local Docker setup diverges from production behavior in a way that hides real bugs.
- The team chooses a different production database provider.
- Prisma adapter behavior changes enough that a single adapter can safely cover both local and Neon without losing deployment expectations.

## Implementation Notes

- Preserve the Neon path for remote environments.
- Runtime Prisma client creation now selects `@prisma/adapter-pg` for local
  Postgres URLs and keeps `@prisma/adapter-neon` for Neon URLs.
- Local `next dev` runs a pre-dev Docker check by default. An explicit
  `VACKY_DATABASE_DRIVER="neon"` skips Docker for cloud-like local testing.
- Keep `prisma/schema.prisma` provider as PostgreSQL.
- Add a clear `DATABASE_URL` runtime guard.
- Never commit real `.env` values or Neon credentials.
- Docker Compose uses the official `postgres:16-alpine` image, a named volume,
  safe local defaults, configurable `POSTGRES_PORT`, and a `pg_isready`
  healthcheck.
- Destructive volume reset is exposed only as `npm run db:reset:local` and is
  documented as local-only.

## Evidence

- [Local Docker Postgres architecture question](../../raw/sessions/2026-04-16-local-docker-postgres-architecture-question.md)
- [Local Docker Postgres sidequest prompt](../../outputs/plans/2026-04-16-local-docker-postgres-sidequest-prompt.md)
- [Local Docker Postgres verification](../../raw/verification/2026-04-16-local-docker-postgres.md)
