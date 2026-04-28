# Vacky

Vacky is a Next.js 16 App Router trip-planning app with first-party auth,
SpacetimeDB, UploadThing, and Google Maps/Places integrations.

## Requirements

- Node `22.20.0` from `.nvmrc`
- npm
- SpacetimeDB CLI `2.1.x`

## Local Setup

Install dependencies:

```bash
npm install
```

Create local environment values from the committed placeholder example:

```bash
cp .env.example .env.local
```

Start the local SpacetimeDB instance:

```bash
npm run stdb:start
```

In another terminal, publish the local module and regenerate bindings after
schema or reducer changes:

```bash
npm run stdb:publish:local
npm run stdb:generate
```

Keep `.env.local` uncommitted. Replace only the UploadThing and Google
placeholder values needed for the flows you are testing.

Start local development:

```bash
npm run dev
```

`npm run dev` starts Next.js on `http://localhost:3001` so SpacetimeDB can keep
`http://localhost:3000`.

## Local Database Commands

Reset the local SpacetimeDB module data:

```bash
npm run stdb:publish:reset
```

This branch is local-instance-only for SpacetimeDB. Do not add Maincloud, Neon,
Docker Postgres, or hosted Postgres assumptions to the migration workflow.

## Verification

Use Node `22.20.0` for project tooling:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:publish:local
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:generate
```
