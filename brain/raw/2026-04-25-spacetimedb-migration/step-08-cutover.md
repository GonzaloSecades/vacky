# Step 08: Cutover

## Status

Completed on 2026-04-26.

## What Changed

The old backend was removed from the migration branch.

- Deleted `auth.ts`, `app/db.ts`, `app/api/auth/[...nextAuth]/route.ts`, `prisma/`, `prisma.config.ts`, `docker-compose.yml`, `scripts/pre-dev.mjs`, and generated Prisma output.
- Removed Prisma, Prisma adapters, NextAuth, and the Prisma Prettier plugin from `package.json` and `package-lock.json`.
- Changed `npm run dev` and `npm run start` to use Next.js port `3001`, leaving `localhost:3000` for SpacetimeDB.
- Updated `.env.example`, `README.md`, `AGENTS.md`, `.gitignore`, and ESLint ignores for the SpacetimeDB-only workflow.

## How

- `npm uninstall` removed `@auth/prisma-adapter`, `@prisma/adapter-neon`, `@prisma/adapter-pg`, `@prisma/client`, `next-auth`, `prisma`, and `prettier-plugin-prisma`.
- Local SpacetimeDB scripts now target `vacky-spacetimedb-local-dev` and no longer use `--anonymous`.
- The local CLI was switched to `spacetime login --server-issued-login http://localhost:3000 --no-browser` so publishes use a stable local-server-only identity without Maincloud.

## Why

The migration goal is not a sidecar integration. Once auth, reads, writes, uploads, settings, and supporting APIs were on SpacetimeDB/session helpers, the old backend became dead weight and a source of false assumptions.

## Checkpoints

- [x] C1 remove `auth.ts`, `app/db.ts`, Prisma runtime usage, NextAuth handlers, and GitHub-login-only server actions
- [x] C2 remove Prisma/Postgres/Docker Postgres dependencies, scripts, and environment assumptions from `package.json` and local workflow docs
- [x] C3 retire `prisma/`, generated Prisma client usage, and Docker health-gate logic no longer relevant
- [x] C4 ensure all imports now point at SpacetimeDB or new auth/session helpers
- [x] C5 verify the branch runs without Prisma, NextAuth, Docker Postgres, or Neon assumptions

## Risks Retired

- No live code path depends on Prisma, Postgres, Docker Postgres, Neon, NextAuth, or GitHub OAuth.
- `npm run build` no longer runs Prisma generation.

## Risks Introduced

- The migration branch is intentionally local-instance-only; deployment assumptions must be redesigned before production use.
- Old local SpacetimeDB databases created under transient anonymous identities may remain on the local server but are not used by the branch.

## Verification Evidence

- `npm uninstall ...`: passed after filesystem escalation and removed 114 packages.
- `npm run stdb:publish:local`: passed against `vacky-spacetimedb-local-dev`.
- `npm run stdb:generate`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Live source search found no active imports of `@/app/db`, `@/auth`, `next-auth`, Prisma packages, generated Prisma output, `DATABASE_URL`, `VACKY_DATABASE_DRIVER`, or `--anonymous`.
