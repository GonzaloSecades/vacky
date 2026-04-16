# Local Docker Postgres Sidequest Prompt

Status: working
Created: 2026-04-16

## Purpose

Use this prompt to implement a pristine local Docker Postgres setup for Vacky while preserving the current Neon path for later preview and production environments.

## Current Context

- Vacky is pre-alpha and local iteration speed matters more than cloud parity during day-to-day product shaping.
- The current app runtime creates Prisma through `@prisma/adapter-neon` in `app/db.ts`.
- Prisma CLI reads `DATABASE_URL` through `prisma.config.ts`.
- `prisma/schema.prisma` already uses `provider = "postgresql"` and does not contain a schema-level datasource URL.
- The current local `.env` is ignored and contains real Neon credentials; do not quote, copy, or commit secrets from it.
- `RISK-006` already tracks missing clear `DATABASE_URL` fail-fast behavior.
- `RISK-013` tracks the local-development dependency on remote Neon until this sidequest lands.

## Implementation Prompt

```text
Using the Vacky repo, implement the local Docker Postgres sidequest.

Goal:
Make local development use a fast, resettable Docker Postgres database by default, while preserving Neon as the deployment/preview database path.

Start by reading:
- `AGENTS.md`
- `.codex/workflows/task-planning.md`
- `.codex/workflows/implementation-checklist.md`
- `.codex/agents/backend.md`
- `brain/wiki/now.md`
- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/risks.md`
- `brain/wiki/decisions/2026-04-16-local-dev-docker-postgres.md`
- `app/db.ts`
- `prisma.config.ts`
- `prisma/schema.prisma`
- `package.json`
- `.gitignore`

Scope:
- Add a root-level Docker Compose setup for local Postgres.
- Add safe, committed local environment documentation or examples with placeholder values only.
- Update Prisma runtime client creation so the app can connect to both:
  - local Docker Postgres during local development
  - Neon for preview/production or cloud-like testing
- Add a clear `DATABASE_URL` runtime guard with a useful error message.
- Add npm scripts only if they improve repeatable local DB lifecycle commands without hiding destructive behavior.
- Update README or local setup docs so a fresh local run is obvious.
- Update the relevant brain/wiki pages and verification notes after implementation.

Recommended implementation shape:
- Use a `postgres` Docker image with a named volume, explicit database/user/password, healthcheck, and a configurable host port such as `${POSTGRES_PORT:-5432}:5432`.
- Use safe local defaults such as:
  - database: `vacky`
  - user: `vacky`
  - password: `vacky`
  - local URL: `postgresql://vacky:vacky@localhost:5432/vacky?schema=public`
- Prefer a standard Prisma Postgres adapter for local Postgres, likely `@prisma/adapter-pg` plus the required `pg` package. Verify the exact Prisma 7.6-compatible package names before installing.
- Preserve the existing Neon adapter path for Neon URLs or an explicit Neon driver mode. Avoid replacing the current deployment path with an unverified local-only setup.
- Keep the global Prisma client cache behavior in `app/db.ts`.
- Do not change the Prisma schema unless discovery proves it is required.
- Do not add a migration unless the schema changes.
- Do not commit `.env`, `.env.local`, Neon credentials, or any real service keys.

Non-goals:
- Do not seed product demo data unless explicitly requested.
- Do not change auth providers.
- Do not change UploadThing, Google Maps, Places, geocoding, or itinerary behavior.
- Do not introduce a separate database service abstraction beyond what the adapter selection needs.
- Do not remove Neon dependencies unless deployment strategy is explicitly changed.
- Do not run destructive database reset commands against any non-local database.

Likely touched files:
- `docker-compose.yml`
- `.env.example` or another safe env example file
- `package.json`
- `package-lock.json`
- `app/db.ts`
- `README.md` or a concise local setup doc
- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/risks.md`
- `brain/wiki/now.md`
- `brain/wiki/log.md`
- `brain/raw/verification/<date>-local-docker-postgres.md`

Verification:
- Run `docker compose config`.
- Run `docker compose up -d postgres` if Docker is available.
- Confirm the container becomes healthy or document why this could not be run.
- With Node 22.20.0, run:
  - `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate`
  - `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma migrate dev`
  - `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`
  - `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build`
- If package install or build needs network access, request escalation instead of working around it.
- If Docker is not available locally, record the skipped Docker checks and still verify static config and TypeScript/lint/build as far as possible.

Reviewer/QA:
- Ask for a final review pass because this touches Prisma runtime connection strategy and local/deployment assumptions.
- The review should specifically check:
  - local URL cannot accidentally target Neon
  - destructive reset commands are documented as local-only
  - Neon still works when a Neon `DATABASE_URL` is supplied
  - `DATABASE_URL` missing failure is clear
  - no secrets were committed

Brain impact:
- Classification: decision/material.
- Update the local Docker Postgres decision record if the implementation diverges from this plan.
- Update `Data And Auth`, `Risks`, `Now`, and `Log`.
- Add raw verification evidence only for command output summaries, Docker behavior, failed paths, or non-obvious adapter findings.

Final response:
- Summarize the DB lifecycle added.
- List files changed.
- State exactly which verification commands passed or could not run.
- Call out any remaining manual checks, especially Neon parity and Docker availability.
```

## Acceptance Criteria

- A fresh local developer can start Postgres with one documented Docker Compose command.
- Local Prisma migration/generation commands can target the Docker database using safe placeholder credentials.
- App runtime can connect to local Docker Postgres without requiring a remote Neon round trip.
- Neon remains a supported path for preview/production.
- Missing `DATABASE_URL` fails with a clear local error.
- No real credentials or ignored env files are committed.
