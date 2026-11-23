# Vacky API

NestJS backend for Vacky. It will replace the SpacetimeDB runtime and the
server logic in the Next.js app. The plan and progress are in
[`docs/nestjs-backend.md`](../docs/nestjs-backend.md).

Stack: NestJS 12 (Express, ESM), Zod configuration, pino JSON logs,
Vitest, and oxlint.

## Requirements

- Node 24.22.3 (see [`.nvmrc`](.nvmrc)). Run `nvm use` in this folder.
- npm.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

## Configuration

The app reads `.env` and the process environment at startup and validates
the values with Zod (`src/config/env.schema.ts`). Variables in the process
environment override `.env`. If a value is invalid, the app prints the
variable name and exits with code 1.

| Variable    | Default       | Allowed values                                               |
| ----------- | ------------- | ------------------------------------------------------------ |
| `NODE_ENV`  | `development` | `development`, `test`, `production`                          |
| `HOST`      | `127.0.0.1`   | Any non-empty host                                           |
| `PORT`      | `4000`        | Integer from 1 to 65535                                      |
| `LOG_LEVEL` | `info`        | `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent` |

## Run

```bash
npm run start:dev    # Watch mode on http://127.0.0.1:4000
npm run build        # Compile to dist/
npm run start:prod   # Run dist/ with NODE_ENV=production
```

Logs are JSON, one object per line. For readable local logs:

```bash
npm run start:dev | npx pino-pretty
```

## Endpoints

All routes use the `/api/v1` prefix.

| Route                      | Purpose                                                         |
| -------------------------- | --------------------------------------------------------------- |
| `GET /api/v1/health/live`  | Liveness. Returns `200 {"status":"ok"}` while the process runs. |
| `GET /api/v1/health/ready` | Readiness. Returns `503` when a dependency is not available.    |
| `GET /api/v1/docs`         | Swagger UI. Not available when `NODE_ENV=production`.           |
| `GET /api/v1/openapi.json` | OpenAPI document. Not available when `NODE_ENV=production`.     |

Responses from the Nest routes under `/api/v1` have an `X-Request-Id`
header. The app reuses a safe incoming ID (letters, digits, and `-`, up to
128 characters) or generates a UUID. The Swagger routes (`/docs` and
`/openapi.json`) do not send this header.

## Checks

```bash
npm run lint           # oxlint
npm run format:check   # Prettier
npm test               # Unit tests (src/**/*.spec.ts)
npm run test:e2e       # Builds first, then runs test/**/*.e2e-spec.ts
npm run test:cov       # Unit tests with coverage
```

The e2e suite starts `dist/main.js` as a child process for the shutdown,
production, logging, and configuration tests.

## Shutdown

On `SIGTERM` or `SIGINT`, the app returns `503` to new requests, runs the
Nest shutdown hooks, flushes the logs, and exits with code 0.
