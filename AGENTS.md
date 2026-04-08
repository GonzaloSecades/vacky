<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. Before changing routing, rendering, data fetching, config, or server/client boundaries, read the relevant guide in `node_modules/next/dist/docs/`. Start with `node_modules/next/dist/docs/01-app/index.md` for App Router work and follow linked pages as needed. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vacky Agent Guide

## Project Snapshot

- Single Next.js `16.2.1` App Router application.
- React `19.2.4`, TypeScript, Tailwind CSS `v4`, npm with `package-lock.json`.
- Auth uses `next-auth` v5 beta with GitHub and the Prisma adapter.
- Data uses Postgres through Prisma `7.6.0` and `@prisma/adapter-neon`.
- Uploads use UploadThing; maps/geocoding use Google Maps APIs.
- Expected Node version is `22.20.0` from `.nvmrc`.

## Repo Map

- `app/`: App Router pages, layouts, route handlers, global CSS, DB client setup, and local generated Prisma output.
- `app/api/**/route.ts`: Next route handlers for auth, trips data, and UploadThing.
- `components/`: shared UI and feature components; `components/ui/` holds reusable primitives.
- `lib/actions/`: server actions for trips, locations, auth, geocoding, and itinerary ordering.
- `lib/`: utilities, constants, and UploadThing client helpers.
- `prisma/`: Prisma schema and SQL migrations.
- `auth.ts`: central NextAuth setup.
- `.codex/`: Phase 1 Codex team prompts and workflow docs.

## Commands

- Install dependencies: `npm install`.
- Dev server: `npm run dev`.
- Lint: `npm run lint`.
- Build: `npm run build`.
- Prisma client generate: `npx prisma generate`.
- Tests: no dedicated test runner or `npm test` script exists yet; use lint/build plus focused manual checks.

The shell may default to old Node/npm. If tooling fails with syntax errors, use:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate
```

`npm run build` runs `prisma generate && next build`. The build may need network access when the Next font cache is cold.

## Architecture Notes

- Default to Server Components. Add `'use client'` only for hooks, state, browser APIs, or client-only libraries.
- Server actions live in `lib/actions/` and must keep `'use server'`.
- Server pages and server actions should enforce auth at the server boundary with `auth()`.
- Client components currently include forms, tabs, maps, drag-and-drop itinerary UI, the navbar, and the globe page.
- `app/db.ts` owns Prisma client creation with the Neon adapter; do not change connection strategy casually.
- Prisma imports should come from `@/app/generated/prisma` or `@/app/generated/prisma/client`, not direct generated paths elsewhere.
- `prisma/schema.prisma` outputs the generated client to `app/generated/prisma`; that directory is ignored by `.gitignore` in the current repo state.
- UploadThing server config is in `app/api/uploadthing/core.ts`; client helpers are in `lib/upload-thing.ts`.
- `next.config.ts` image `remotePatterns` must match any new external image hosts.
- Known risk: `app/api/trips/route.ts` geocodes every stored location on each request; see `futureproblems.md` before expanding globe/location features.

## Coding Conventions

- Use the `@/` import alias for local modules.
- Prefer server-side data access in pages, layouts, route handlers, and server actions over client-side fetching.
- Keep UI primitives in `components/ui/` and reuse them before adding one-off wrappers.
- Preserve the existing Tailwind utility style and simple component structure.
- Use `cn`, `cva`, and Tailwind merge patterns already present in `components/ui/`.
- Keep form pending state accurate when client components call server actions.
- Do not move or manually edit generated Prisma files; regenerate them with Prisma.
- Preserve Prettier settings: single quotes, semicolons, two spaces, Tailwind and Prisma plugins.

## Guardrails

- Run `git status --short --branch` before large edits and do not overwrite unrelated local changes.
- Read the bundled Next.js docs before changing App Router semantics, data fetching, rendering, config, or server/client boundaries.
- Treat auth, Prisma schema/migrations, UploadThing endpoints, and external API calls as high-risk areas.
- If the Prisma schema changes, add or update a migration and run `npx prisma generate`.
- If uploads change, verify the UploadThing route name, client endpoint usage, and Next image host config.
- If map/geocoding behavior changes, account for API keys, rate limits, latency, and server/client environment variable boundaries.

## Phase 1 Team

- Lead / Orchestrator: owns planning, scope control, work splitting, and final integration.
- Frontend agent: owns UI, client components, accessibility, Tailwind, maps/globe UI, forms, and component ergonomics.
- Backend agent: owns server actions, route handlers, auth, Prisma, migrations, UploadThing, and external service boundaries.
- Reviewer / QA agent: owns diff review, regression risk, verification commands, and readiness calls.

Use `.codex/agents/*.md` for role-specific instructions and `.codex/workflows/*.md` for reusable checklists.

## Delegation Rules

- The Lead should plan first for non-trivial work and identify frontend, backend, and review slices.
- Keep tasks small and assign specialists only when their scope is meaningfully involved.
- Do not split a change if one person can safely complete it faster with less coordination.
- Avoid parallel edits to the same files unless the Lead has made ownership explicit.
- Backend work should be requested for changes touching `lib/actions/`, `app/api/`, `auth.ts`, `app/db.ts`, `prisma/`, UploadThing, or external API behavior.
- Frontend work should be requested for changes touching user flows, `components/`, client pages, Tailwind layout, forms, maps, or accessibility.

## Reviewer Rules

Ask the Reviewer / QA agent for a final pass when a change touches auth, Prisma schema/migrations, route handlers, UploadThing, map/geocoding behavior, server/client boundaries, or more than one feature area.

Ask for review before merge if lint/build cannot be run, if network access affects verification, or if the change includes behavior that must be manually checked in the browser.

## Definition Of Done

- Scope is clear and matches the request.
- UI changes are accessible, responsive enough for the existing layout, and consistent with current components.
- Server/data changes enforce auth and preserve user ownership boundaries.
- Prisma changes include schema, migration, and generated-client steps where applicable.
- `npm run lint` has passed or the reason it could not run is documented.
- `npm run build` has passed for production-sensitive changes or the reason it could not run is documented.
- Remaining risks, manual checks, and follow-up work are called out clearly.
