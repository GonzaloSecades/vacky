# PR #13 Raw Merge Note

PR: https://github.com/GonzaloSecades/vacky/pull/13

Title: add local Docker Postgres development setup

Merge date: 2026-04-16 01:06:38 -0300

Merge commit: `0dd56efd00062bc97f429af8d9467c8e6e33737c`

Source branch: `codex/local-docker-postgres-brain`

Final head commit: `e1ccb6fdd6fdb4a791c74e6df929dfb838e3aec1`

Base commit: `0a00ae4`

## Evidence Used

- Local `git show --quiet --format=fuller 0dd56ef`.
- Local `git show --quiet --format=fuller e1ccb6f`.
- Local `git diff --name-status 0a00ae4 e1ccb6f`.
- Local `git diff --stat e1ccb6f 0dd56ef`, which showed no tree drift between the PR head and merge commit.
- Current merged files on `master`, especially `app/db.ts`, `scripts/pre-dev.mjs`, `docker-compose.yml`, `package.json`, `.env.example`, `README.md`, and the branch-level brain files.
- Post-merge local checks on 2026-04-16: `docker compose ps postgres` reported `vacky-postgres-1` healthy, and local `npx prisma migrate dev` reported the database already in sync.

## Problem Or Goal

PR #13 made local Docker Postgres the default pre-alpha local development database while preserving Neon for preview/production and explicit cloud-like local testing.

The branch also carried brain updates so the architecture rationale, local database decision, and verification notes were available with the implementation.

## Final Merged Behavior

The merged app now includes:

- `docker-compose.yml` with a `postgres:16-alpine` service, safe local defaults, configurable `POSTGRES_PORT`, a named volume, and a `pg_isready` healthcheck.
- `scripts/pre-dev.mjs`, run by `npm run dev`, to validate Docker Compose, start local Postgres when needed, detect port conflicts, and wait for the healthcheck.
- Local database lifecycle scripts in `package.json`: `db:up`, `db:down`, `db:logs`, and `db:reset:local`.
- A committed placeholder `.env.example` with local-safe values and no real secrets.
- Runtime Prisma adapter selection in `app/db.ts`: local Postgres URLs use `@prisma/adapter-pg`; Neon URLs use `@prisma/adapter-neon`.
- Guardrails that refuse accidental local Neon usage unless `VACKY_DATABASE_DRIVER="neon"` is set intentionally and refuse mismatched explicit driver/URL combinations.

## Main Files Or Areas Touched

- `.env.example`
- `docker-compose.yml`
- `package.json`
- `package-lock.json`
- `scripts/pre-dev.mjs`
- `app/db.ts`
- `README.md`
- `AGENTS.md`
- `.codex/agents/`
- `.codex/workflows/`
- `.agents/skills/vacky-implementation-workflow/SKILL.md`
- `brain/wiki/architecture/data-and-auth.md`
- `brain/wiki/decisions/2026-04-16-local-dev-docker-postgres.md`
- `brain/wiki/risks.md`
- `brain/wiki/now.md`
- `brain/wiki/log.md`
- `brain/raw/sessions/2026-04-16-local-docker-postgres-architecture-question.md`
- `brain/raw/verification/2026-04-16-local-docker-postgres.md`
- `brain/outputs/plans/2026-04-16-local-docker-postgres-sidequest-prompt.md`

## Verification Evidence

Branch-level verification note records:

- `git diff --check`: passed.
- `docker compose config --quiet`: passed.
- Docker startup and healthy Postgres container status: passed outside the sandbox.
- `node --check scripts/pre-dev.mjs`: passed.
- local Postgres pre-dev health gate: passed.
- explicit Neon pre-dev skip path: passed.
- accidental local Neon usage without explicit driver: failed as intended.
- `npx prisma generate` with the local URL and Postgres driver: passed.
- `npx prisma migrate dev` with the local URL and Postgres driver: passed outside the sandbox and reported the database already in sync.
- `npm run lint`: passed.
- `npm run build`: passed outside the sandbox after Google Fonts network access was allowed.

Post-merge drift check on 2026-04-16 confirmed:

- Merge commit `0dd56ef` and PR head `e1ccb6f` had identical trees.
- Docker Postgres was healthy after merge.
- Local `npx prisma migrate dev` passed after merge and reported no pending migrations.

## Risks, Follow-Ups, And Unresolved Questions

- Neon remains supported but still needs a deployment-like smoke check with a real Neon URL before first preview/staging use after the adapter-selection change.
- Default local development now depends on Docker daemon availability.
- Destructive reset remains intentionally local-only through `npm run db:reset:local`.
- Future database connection changes should preserve both local Postgres and Neon paths unless deployment strategy changes explicitly.

## What Should Be Promoted Into The Wiki

- Local Docker Postgres is the accepted default local development path.
- Neon remains preview/production and explicit cloud-like local testing path.
- `RISK-013` can stay resolved because post-merge Docker health and local `migrate dev` were verified.
- `RISK-006` can stay resolved because `app/db.ts` now has an explicit `DATABASE_URL` guard.
- Architecture overview and data/auth pages should avoid stale Neon-only wording.
