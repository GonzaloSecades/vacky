# Vacky

SpacetimeDB is the legacy backend and still runs locally.
The replacement is described in the [guided NestJS backend plan](docs/nestjs-backend.md).
Use the [HTML implementation guide](docs/nestjs-backend-guide.html) to track tasks and verification notes in your browser.
Gonzalo will implement it step by step. The setup below still starts the existing application.

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

Start local development with one command:

```bash
npm run dev:local
```

`npm run dev:local` starts the local SpacetimeDB instance, waits for
`http://127.0.0.1:3000`, publishes the local module, regenerates the generated
TypeScript bindings, and then starts Next.js on `http://localhost:3001`.

If you only want the Next.js app without managing SpacetimeDB, use:

```bash
npm run dev
```

Keep `.env.local` uncommitted. Replace only the UploadThing and Google
placeholder values needed for the flows you are testing.

After any SpacetimeDB schema, reducer, procedure, or shared module change,
republish the module and regenerate bindings:

```bash
npm run stdb:publish:local
npm run stdb:generate
```

If you need to run the database server by itself, use:

```bash
npm run stdb:start
```

## Local Database Commands

Reset the local SpacetimeDB module data:

```bash
npm run stdb:publish:reset
```

The legacy SpacetimeDB runtime remains local-only until cutover.
PostgreSQL setup belongs to the new backend and does not replace these commands yet.

## Verification

Use Node `22.20.0` for project tooling:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:publish:local
PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:generate
```
