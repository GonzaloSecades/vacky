# Vacky

Vacky is a Next.js 16 App Router trip-planning app with GitHub auth, Prisma,
Postgres, UploadThing, and Google Maps/Places integrations.

## Requirements

- Node `22.20.0` from `.nvmrc`
- npm
- Docker Desktop or another Docker engine with Compose support

## Local Setup

Install dependencies:

```bash
npm install
```

Create local environment values from the committed placeholder example:

```bash
cp .env.example .env.local
```

The default local database URL is:

```text
postgresql://vacky:vacky@localhost:5432/vacky?schema=public
```

Keep `.env.local` uncommitted. Replace only the auth, UploadThing, and Google
placeholder values needed for the flows you are testing.

Start local development:

```bash
npm run dev
```

`npm run dev` runs `npm run pre-dev` first. The pre-dev check validates
`docker-compose.yml`, starts the `postgres` service when needed, pulls the
official image if it is missing, fails with manual instructions when the
configured local Postgres port is already in use outside this Compose service,
and waits until the container healthcheck passes.

## Local Database Commands

Start Postgres without the app:

```bash
npm run db:up
```

View database logs:

```bash
npm run db:logs
```

Stop the local database while keeping data:

```bash
npm run db:down
```

Reset the local database volume:

```bash
npm run db:reset:local
```

`db:reset:local` runs `docker compose down -v`. It deletes only the local Docker
Compose volume for this project. Do not use this as a pattern for Neon or any
shared database.

After creating a fresh local database, apply migrations:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma migrate dev
```

## Neon / Cloud-Like Testing

Local development defaults to Docker Postgres. To intentionally test against
Neon from a local machine, set a Neon `DATABASE_URL` and add:

```bash
VACKY_DATABASE_DRIVER="neon"
```

With that explicit driver mode, `npm run pre-dev` skips Docker Postgres and the
runtime Prisma client uses the Neon adapter. Preview and production environments
can continue using Neon `DATABASE_URL` values.

## Verification

Use Node `22.20.0` for project tooling:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```
