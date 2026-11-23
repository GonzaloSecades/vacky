# NestJS backend: guided implementation

Updated: 2026-11-19. Status: design and checklist only. No backend code exists yet.

Use the [HTML guide](nestjs-backend-guide.html) for a browser checklist, notes, and progress backups.
This Markdown file remains the source plan. The guide does not update it automatically.
Regenerate the guide after plan changes with `node scripts/build-backend-guide.mjs` from the repository root.

## How we will work

Gonzalo writes the backend. Assistance covers explanation, review, debugging, and verification.
Work on one numbered step at a time. Complete its checks before advancing.
Ask for code generation only when you want it. Do not scaffold the application automatically.
Use this checklist throughout implementation. Do not create a separate plan for every step.

At each step:

1. Explain the goal and the relevant NestJS concept.
2. Identify the smallest change Gonzalo can implement.
3. Review the diff and run the step's checks.
4. Record the result here. Update current architecture only when runtime behavior changes.

## Target and boundaries

Build one modular NestJS application with PostgreSQL.
Keep the Next.js frontend at the repository root during migration.
Use a separate worker process from the same backend codebase when durable jobs become necessary.
Keep UploadThing and Google integrations until their replacement paths pass verification.

Destination, place/activity, and itinerary recommendations share this backend.
Live collaboration is not planned.
AI model calls and recommendation algorithms are outside the first backend parity milestone.
Microservices, Kubernetes, event sourcing, a graph database, and automatic vector storage are deferred.

Proposed layout, to be created by Gonzalo in Step 1:

```text
backend/
  src/
    main.ts
    app.module.ts
    config/
    database/
    auth/
    users/
    trips/
    locations/
    integrations/
    health/
    traveler-profile/   # later step
    recommendations/   # later boundary, no AI implementation yet
    jobs/              # added when the first durable job exists
  test/
```

Keep controllers thin. Services own use cases and transactions.
Keep database access inside the owning module or a focused database provider.
Do not create generic repositories, abstract base services, or empty modules for hypothetical features.

## Working defaults

These are proposed implementation defaults. Confirm them in Step 1 before installing packages.

- REST under `/api/v1`, with OpenAPI as the external contract.
- PostgreSQL with Prisma for typed persistence and versioned migrations.
- Opaque, server-stored sessions with HTTP-only cookies and Argon2id password hashes.
- One bounded database pool per process. Account for API replicas and workers in its connection budget.
- Runtime DTO validation. Reject unexpected fields and invalid enum, date, coordinate, and length values.
- DTOs are Zod 4 schemas. One schema supplies runtime validation, `z.infer` types, and the OpenAPI schema through `@nestjs/swagger`.
- Parse every response through its response schema so unknown fields, such as hashes, are stripped at runtime.
- Explicit response DTOs. Never expose persistence models, password hashes, or token hashes.
- Structured logs, request IDs, health checks, and graceful shutdown from the first running slice.
- PostgreSQL integration tests plus HTTP tests for auth, ownership, and transactions.
- Redis with BullMQ when the first persistent background job is implemented.

Choose an HTTP adapter supported by the pinned Nest version and required middleware.
Current Nest documentation recommends NodeAdapter from v12.3. Confirm compatibility before adopting it.
Fastify remains an alternative when a required integration needs its plugin system.
Do not choose an adapter from a hello-world benchmark alone.

Frontend and backend both run Node 24.22.3. The frontend moved from 22.20.0 on 2026-11-19 and passed lint and build.
Pin exact Node, Nest, CLI, Prisma, and PostgreSQL versions. Do not run `latest` generators without checking their requirements.

## Existing behavior inventory

Preserve these behaviors before cutover:

- Registration, verification, sign-in, session lookup, sign-out, and expiry.
- Trip create, list, detail, and deletion with associated locations.
- Itinerary create, edit, stop deletion, and same-day ordering.
- Place IDs/types/categories, coordinates, ratings, cost sentiment, and notes.
- UploadThing authorization, cover images, maps, and globe data.
- Cookie-backed theme and authenticated page behavior.

General trip-details editing, password recovery, and MFA are not current parity requirements.
Add them deliberately later. Do not describe them as existing functionality.
The current verification-email function only logs a link. Real email delivery is a new production requirement.

## Step 1: foundation and first HTTP slice

- [x] Confirm tool versions and record exact versions below.
- [x] Create `backend/` as its own npm package and lockfile. Keep the existing web layout intact.
- [x] Exclude backend source from the frontend TypeScript project and frontend ESLint scope when adding it.
- [x] Give the backend its own TypeScript, lint, build, and test configuration.
- [x] Check listener ownership before choosing a backend port. Keep the legacy ports unchanged.
- [x] Implement startup configuration validation, request IDs, structured logs, and graceful shutdown.
- [x] Implement liveness and readiness endpoints with distinct meanings.
- [x] Establish `/api/v1` and generate OpenAPI for the first endpoint.

**Done when:** the isolated backend builds and starts with valid configuration.
Invalid configuration fails clearly. Liveness works independently of database readiness.
One HTTP test checks the endpoint and error behavior. The current web application still runs.

**First coding task:** explain module, controller, and provider responsibilities, then implement liveness.
Do not generate auth, trips, or recommendations in this step.

## Step 2: PostgreSQL and migration discipline

- [ ] Select a local PostgreSQL setup without restoring old Neon or Prisma-era deployment assumptions.
- [ ] Configure a shared database provider and bounded connection pool.
- [ ] Define account, session, verification token, trip, location, and audit storage from current behavior.
- [ ] Preserve normalized unique emails, ownership foreign keys, timestamps, and required field constraints.
- [ ] Preserve date-only itinerary days. Use UTC instants for events and expiry times.
- [ ] Define ID conversion explicitly. Keep IDs as strings across HTTP and avoid unsafe JavaScript number conversions.
- [ ] Define deletion behavior and transaction boundaries before writing migrations.
- [ ] Add indexes for demonstrated ownership, session, trip-list, and itinerary query patterns.
- [ ] Keep development migration generation separate from deployment migration execution.
- [ ] Add an isolated test database and a documented migration reset procedure for that database only.

**Done when:** migrations apply to an empty database and the next schema change preserves existing fixtures.
Constraints reject invalid ownership and duplicate emails. Readiness reflects database availability.
Check representative queries and pool behavior. Restore a test backup before trusting migration tooling.

## Step 3: authentication and authorization

- [ ] Implement registration and password verification with bounded input and auth rate limits.
- [ ] Implement expiring, single-use verification tokens and revocable sessions using stored hashes.
- [ ] Derive the authenticated principal server-side. Do not authorize from a supplied `userId` header or body field.
- [ ] Define cookie lifetime, secure flags, SameSite policy, CSRF protection, and allowed origins.
- [ ] Add an email delivery adapter. Keep the local test transport explicit and secret-safe.
- [ ] Implement sign-in/out, session lookup, expiry, revocation, and minimal audit events.
- [ ] Return safe account DTOs. Exclude secrets from responses, logs, and OpenAPI examples.
- [ ] Test the HTTP API directly, including attempts to bypass the frontend.

**Done when:** two-account tests prove isolation, rejected impersonation, token replay rejection, and session expiry.
Sign-out revokes the session. Verification works through the test email transport.
Concurrent registration cannot bypass email uniqueness.

Develop and test this against isolated PostgreSQL fixtures. The frontend can continue using legacy auth until coordinated cutover.

## Step 4: trips, locations, and transactional itineraries

- [ ] Implement owner-scoped trip create/list/detail/delete and bounded list pagination.
- [ ] Implement itinerary create/edit/delete-stop and same-day ordering.
- [ ] Validate coordinate ranges, date ranges, controlled metadata, payload sizes, and referenced IDs.
- [ ] Apply each itinerary save and trip deletion in one transaction.
- [ ] Add an itinerary revision or equivalent concurrency check. Reject stale writes instead of silently losing edits.
- [ ] Handle retried create requests without duplicate trips or stops.
- [ ] Keep application DTOs independent of database-generated types.
- [ ] Use explicit selected fields and indexed queries. Avoid per-row external calls.

**Done when:** direct HTTP tests cover happy paths, cross-user reads/writes, invalid payloads, rollback, and stale-save conflicts.
Dates retain their calendar day across supported time zones. Pagination returns stable results.

## Step 5: external integrations and bounded work

- [ ] Preserve Google Places IDs, modern autocomplete behavior, map IDs, and browser/server key boundaries.
- [ ] Move server geocoding behind a provider adapter with deadlines, concurrency limits, and failure handling.
- [ ] Replace globe read-time geocoding fan-out with an intentional enrichment or retrieval strategy.
- [ ] Define permitted storage and retention for provider data before caching or building a recommendation catalogue.
- [ ] Preserve UploadThing callback verification, endpoint names, authenticated uploads, and image host configuration.
- [ ] Decide where upload authorization lives during transition. Avoid duplicate auth authorities.
- [ ] Add durable jobs only for actual email, enrichment, or generation work that needs recovery.
- [ ] Give jobs persisted state, idempotent effects, bounded retries, failure visibility, and safe reprocessing.
- [ ] If database commits create jobs, close the commit/enqueue failure gap with an outbox or equivalent durable handoff.

**Done when:** provider failure cannot hang an API request indefinitely.
Globe reads do not schedule one geocoding call per saved location.
Upload authorization rejects another user's operation. Worker restart and duplicate delivery tests preserve correct results.

## Step 6: Next.js integration and data rehearsal

- [ ] Generate or maintain a typed API client from the external contract.
- [ ] Keep server-rendered reads in Next.js where appropriate. Next.js must not query the new database directly.
- [ ] Expose the browser API through an intentional same-origin `/api/v1` route or production reverse proxy.
- [ ] Define cookie forwarding for server reads and Set-Cookie propagation for auth responses.
- [ ] Remove Next.js session creation as an independent authority when Nest auth becomes active.
- [ ] Test legacy and replacement stacks independently. Avoid requests that mix legacy sessions with new data ownership.
- [ ] Map legacy rows to the new schema. Preserve references, verification state, dates, and metadata.
- [ ] Decide whether existing sessions must survive. Prefer deliberate reauthentication if session migration adds risk.
- [ ] Export a protected source snapshot. Import it into a disposable target database first.
- [ ] Verify row counts, ownership joins, field samples, ID sequences, and repeated-import behavior.

**Done when:** the frontend passes account, trip, itinerary, upload, map, and globe flows against the replacement.
Migration dry runs preserve data. Keep sensitive exports outside version control.
Do not delete or reset the source database during rehearsal.

## Step 7: reliability, performance, and cutover

- [ ] Define expected data volume, concurrent users, p95 latency, error rate, and recovery requirements.
- [ ] Seed representative small and large accounts. Measure full routes, database time, and provider time separately.
- [ ] Check query plans, pool wait time, query counts, and memory under load.
- [ ] Test database loss, provider timeouts, worker restarts, and graceful deployment shutdown.
- [ ] Run lint, type checks, build, integration tests, and HTTP tests in CI.
- [ ] Verify backup restoration, secrets handling, migrations, and health probes in the intended deployment environment.
- [ ] Freeze legacy writes for the final export. Reconcile the target before switching traffic.
- [ ] Define rollback before the switch, including how to preserve writes accepted by the new backend.
- [ ] Observe parity after cutover before retiring the old stack.

**Done when:** agreed latency and recovery requirements pass on the stated workload.
Document measurements and limits. No framework choice counts as performance proof.

Then archive necessary legacy source and rationale.
Remove SpacetimeDB adapters, bindings, dependency, commands, and obsolete environment settings only after their consumers are gone.
Preserve exported data and a recoverable source snapshot under the agreed retention policy.
Update the current architecture and README to describe the backend that actually runs.

## Step 8: recommendation-ready foundation

- [ ] Refine the traveler-profile contract from the retained June 12 design reference.
- [ ] Distinguish completed visits from planned intentions before deriving preferences.
- [ ] Keep derivation deterministic, with confidence, sample size, and explicit user corrections.
- [ ] Define one recommendation request/result contract with destination, activity, and itinerary stages.
- [ ] Define candidate provenance, practical constraints, feedback events, and user-data deletion behavior.
- [ ] Add the first asynchronous recommendation boundary with persisted status and provider-independent interfaces.
- [ ] Define cost limits, deadlines, cancellation behavior, deduplication, and failure recovery before paid calls.
- [ ] Test this boundary with a fake provider and a small evaluation dataset.

**Done when:** the AI feature can consume stable inputs without redesigning auth, persistence, jobs, or ownership.
Add vector similarity or PostGIS only when candidate retrieval requires them.
This step does not authorize implementing the full AI engine automatically.

## Progress

- Current step: 1, in progress. Versions confirmed on 2026-11-19.
- Confirmed tool versions (2026-11-19):
  - Node 24.22.3 LTS for the backend, pinned in `backend/.nvmrc`.
  - Nest 12.5.1 (`@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`). Nest CLI 12.0.13.
  - HTTP adapter: Express.
  - ORM: Prisma 7.10.1 stable. Do not use the `latest` tag, which points to an 8.0 release candidate.
  - Database: PostgreSQL 18 in Docker (`postgres:18`), bound to `127.0.0.1`. Use `pgvector/pgvector:pg18` when vectors are needed.
  - API contract: OpenAPI from Zod DTO schemas through `@nestjs/swagger` 12.1.2. Prisma types stay inside the backend.
  - Configuration: `@nestjs/config` 12.1.1 with a Zod 4.6.7 environment schema.
  - Backend port: 4000. Legacy ports 3000 (SpacetimeDB) and 3001 (Next.js) stay unchanged.
- Scaffold: Nest 12 ESM app in `backend/` with Vitest and oxlint. `@nestjs/mau` and the `deploy` script removed. Generated `AppController` and `AppService` remain as sample code.
- Implemented (2026-11-20): `HealthModule` with `GET /api/v1/health/live`. `configureApp()` in `src/app.setup.ts` is shared by `main.ts` and e2e tests.
- Configuration: `@nestjs/config` validates `NODE_ENV`, `HOST` (default `127.0.0.1`), and `PORT` (default 4000) with Zod. Invalid values stop startup with exit code 1.
- OpenAPI: UI at `/api/v1/docs`, JSON at `/api/v1/openapi.json`, disabled when `NODE_ENV=production`. Responses use `@ApiOkResponse({ standardSchema })`.
- Graceful shutdown (2026-11-23): `enableShutdownHooks(['SIGTERM', 'SIGINT'])` and `return503OnClosing` in `main.ts`. `AppModule` logs `Stopped after <signal>`. `test/shutdown.e2e-spec.ts` runs the built app and checks both signals.
- Logging (2026-11-23): `nestjs-pino` 5.3.2, `pino` 10.4.0, `pino-http` 11.0.0. JSON on stdout, `LOG_LEVEL` in config, `X-Request-Id` reused when safe (`[A-Za-z0-9-]{1,128}`) or generated, cookies and auth headers redacted. `useProcessExit: true` is required so pino flushes on shutdown; a clean shutdown exits with code 0.
- Readiness: `GET /api/v1/health/ready` uses `HealthService.checkReadiness()`; liveness stays dependency-free. Step 2 adds the database check (503 on failure). Unit 9, e2e 10.
- Invalid configuration (2026-11-23): `src/config/env.schema.spec.ts` calls `validateEnv()` directly. It checks defaults, `PORT` coercion, a non-numeric and an out-of-range `PORT`, an unknown `LOG_LEVEL`, and that the error message names the bad key.
- Step 1 is complete.
- Runtime migration or data deletion: none.
- Next collaboration: foundation explanation and the smallest HTTP slice.

## References

Official documentation checked on 2026-11-19. Recheck version requirements when installing.

- [Nest first steps and Node requirements](https://docs.nestjs.com/first-steps)
- [HTTP adapters and benchmark limits](https://docs.nestjs.com/http/performance)
- [Prisma integration](https://docs.nestjs.com/recipes/prisma)
- [Validation](https://docs.nestjs.com/techniques/validation)
- [OpenAPI](https://docs.nestjs.com/openapi/introduction)
- [Testing](https://docs.nestjs.com/fundamentals/testing)
- [Queues](https://docs.nestjs.com/techniques/queues)
- [Google Places data policies](https://developers.google.com/maps/documentation/places/web-service/policies)
- [Current architecture](../brain/wiki/architecture/overview.md)
- [Current risks](../brain/wiki/risks.md)
- [Traveler-profile design reference](../brain/outputs/plans/2026-06-12-travel-memory-traveler-profile-epic.md)
