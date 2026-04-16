# Local Docker Postgres Verification

Date: 2026-04-16

## Scope

Verification for the local Docker Postgres sidequest: Docker Compose config,
Prisma adapter installation, runtime adapter selection, pre-dev health gate,
local migration command, lint, and production build.

## Adapter Finding

`npm view @prisma/adapter-pg@7.6.0 version peerDependencies dependencies`
confirmed `@prisma/adapter-pg` version `7.6.0` exists and depends on `pg`,
`@types/pg`, `postgres-array`, and `@prisma/driver-adapter-utils@7.6.0`.

`npm install @prisma/adapter-pg@7.6.0` completed and updated
`package.json`/`package-lock.json`.

## Command Results

- `git diff --check`: passed.
- `docker compose config --quiet`: passed.
- `docker compose up -d postgres`: initially blocked by sandbox access to the
  Docker socket, then passed with Docker access.
- `docker compose ps postgres`: passed; `vacky-postgres-1` was `Up` and
  `healthy` on `0.0.0.0:5432->5432/tcp`.
- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH node --check scripts/pre-dev.mjs`: passed.
- `DATABASE_URL="postgresql://vacky:vacky@localhost:5432/vacky?schema=public" VACKY_DATABASE_DRIVER="postgres" PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH node scripts/pre-dev.mjs`: passed with the running Docker Postgres service healthy.
- `DATABASE_URL="postgresql://user:pass@ep-test.us-east-1.aws.neon.tech/vacky?sslmode=require" VACKY_DATABASE_DRIVER="neon" PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH node scripts/pre-dev.mjs`: passed by skipping Docker for explicit Neon mode.
- `DATABASE_URL="postgresql://user:pass@ep-test.us-east-1.aws.neon.tech/vacky?sslmode=require" PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH node scripts/pre-dev.mjs`: failed as intended because local dev refuses accidental Neon usage without explicit driver mode.
- `DATABASE_URL="postgresql://vacky:vacky@localhost:5432/vacky?schema=public" VACKY_DATABASE_DRIVER="postgres" PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate`: passed and generated Prisma Client `v7.6.0`.
- `DATABASE_URL="postgresql://vacky:vacky@localhost:5432/vacky?schema=public" VACKY_DATABASE_DRIVER="postgres" PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma migrate dev`: the sandboxed run reached Postgres but ended with a blank `Schema engine error`; rerunning outside the sandbox passed and reported the database already in sync with no pending migrations.
- `DATABASE_URL="postgresql://vacky:vacky@localhost:5432/vacky?schema=public" VACKY_DATABASE_DRIVER="postgres" PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`: passed.
- `DATABASE_URL="postgresql://vacky:vacky@localhost:5432/vacky?schema=public" VACKY_DATABASE_DRIVER="postgres" PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build`: first failed because sandboxed network access blocked Google Fonts; rerun with network access passed.

## Remaining Verification

- Do a deployment-like smoke check with a real Neon `DATABASE_URL` and
  `VACKY_DATABASE_DRIVER="neon"` before relying on the Neon path for preview.
