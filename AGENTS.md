<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. Before changing routing, rendering, data fetching, config, or server/client boundaries, read the relevant guide in `node_modules/next/dist/docs/`. Start with `node_modules/next/dist/docs/01-app/index.md` for App Router work and follow linked pages as needed. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vacky Agent Guide

## Project Snapshot

- Single Next.js `16.2.1` App Router application.
- React `19.2.4`, TypeScript, Tailwind CSS `v4`, npm with `package-lock.json`.
- Auth uses app-owned email/password routes, email verification, and HTTP-only session cookies.
- Data uses local SpacetimeDB through the generated TypeScript bindings.
- Uploads use UploadThing; maps/geocoding/Places use Google Maps APIs.
- Expected Node version is `22.20.0` from `.nvmrc`.

## Repo Map

- `app/`: App Router pages, layouts, route handlers, and global CSS.
- `app/api/**/route.ts`: Next route handlers for auth, trips data, and UploadThing.
- `components/`: shared UI and feature components; `components/ui/` holds reusable primitives.
- `lib/actions/`: server actions for trips, locations, auth, geocoding, and itinerary ordering.
- `lib/`: utilities, auth/session helpers, SpacetimeDB helpers, constants, and UploadThing client helpers.
- `spacetimedb/`: local SpacetimeDB module schema, reducers, procedures, and build config.
- `lib/spacetimedb/module_bindings/`: generated SpacetimeDB TypeScript bindings; regenerate, do not hand-edit.
- `brain/`: Karpathy-style project brain with raw sources, compiled wiki, generated outputs, and operator docs.
- `.agents/skills/`: repo-scoped Codex skills that Codex discovers for this repository.
- `.codex/`: Phase 1 Codex team prompts and workflow docs.

## Commands

- Install dependencies: `npm install`.
- Dev server: `npm run dev`.
- Start local SpacetimeDB: `npm run stdb:start`.
- Publish local SpacetimeDB module: `npm run stdb:publish:local`.
- Regenerate SpacetimeDB bindings: `npm run stdb:generate`.
- Lint: `npm run lint`.
- Build: `npm run build`.
- Tests: no dedicated test runner or `npm test` script exists yet; use lint/build plus focused manual checks.

The shell may default to old Node/npm. If tooling fails with syntax errors, use:

```bash
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint
PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build
```

`npm run dev` starts Next.js on `http://localhost:3001`. Keep SpacetimeDB on
`http://localhost:3000` for local development. The build may need network access
when the Next font cache is cold.

## Architecture Notes

- Default to Server Components. Add `'use client'` only for hooks, state, browser APIs, or client-only libraries.
- Server actions live in `lib/actions/` and must keep `'use server'`.
- Server pages and server actions should enforce auth at the server boundary with `getSession()` from `lib/auth/session`.
- Client components currently include forms, tabs, maps, drag-and-drop itinerary UI, the navbar, and the globe page.
- SpacetimeDB is local-instance-only on this branch. Do not add Maincloud, Neon, Docker Postgres, or hosted Postgres assumptions.
- Persistent writes should go through SpacetimeDB reducers by default.
- Reads should use safe generated bindings, procedures, or documented projections through `lib/spacetimedb/*`.
- UploadThing server config is in `app/api/uploadthing/core.ts`; client helpers are in `lib/upload-thing.ts`.
- `next.config.ts` image `remotePatterns` must match any new external image hosts.
- Canonical current risks live in `brain/wiki/risks.md`; `futureproblems.md` is supplemental. Before changing trips, auth, maps, geocoding, UploadThing, or itinerary behavior, check the relevant open risk IDs.
- Google Maps/Places work should preserve the modern API path unless deliberately changed: advanced markers, `AutocompleteSuggestion.fetchAutocompleteSuggestions()`, `Place.fetchFields()`, row-scoped autocomplete session tokens, and map-id requirements.

## Coding Conventions

- Use the `@/` import alias for local modules.
- Prefer server-side data access in pages, layouts, route handlers, and server actions over client-side fetching.
- Keep UI primitives in `components/ui/` and reuse them before adding one-off wrappers.
- Preserve the existing Tailwind utility style and simple component structure.
- Use `cn`, `cva`, and Tailwind merge patterns already present in `components/ui/`.
- Keep form pending state accurate when client components call server actions.
- Do not move or manually edit generated SpacetimeDB bindings; regenerate them with `npm run stdb:generate`.
- Preserve Prettier settings: single quotes, semicolons, two spaces, and Tailwind plugin behavior.

## Guardrails

- Run `git status --short --branch` before large edits and do not overwrite unrelated local changes.
- Read the bundled Next.js docs before changing App Router semantics, data fetching, rendering, config, or server/client boundaries.
- Treat auth, SpacetimeDB schema/reducers, UploadThing endpoints, and external API calls as high-risk areas.
- For non-trivial work, decide whether `brain/` must be updated. Meaningful behavior, architecture, rationale, workflow, or risk changes should update the relevant wiki pages on the same branch before PR-ready work is finished.
- If the SpacetimeDB schema, reducers, procedures, or views change, publish locally and regenerate bindings.
- If uploads change, verify the UploadThing route name, client endpoint usage, and Next image host config.
- If map/geocoding behavior changes, account for API keys, rate limits, latency, and server/client environment variable boundaries.

## Phase 1 Team

- Lead / Orchestrator: owns planning, scope control, work splitting, and final integration.
- Frontend agent: owns UI, client components, accessibility, Tailwind, maps/globe UI, forms, and component ergonomics.
- Backend agent: owns server actions, route handlers, auth, SpacetimeDB module/helpers, UploadThing, and external service boundaries.
- Reviewer / QA agent: owns diff review, regression risk, verification commands, and readiness calls.

Use `.codex/agents/*.md` for role-specific instructions and `.codex/workflows/*.md` for reusable checklists.

## Skills Layer

- Repo-scoped skills live in `.agents/skills/`; this is the Codex discovery path for project-local skills.
- `.codex/skills.md` is the human-facing index for the selected skill strategy, installed skills, and rejected options.
- Start with `vacky-implementation-workflow` for non-trivial repo work and `vacky-review-workflow` for review or readiness passes.
- Use `grill-me` when a product, architecture, or implementation plan needs adversarial questioning against current repo and brain evidence before committing to it.
- OpenAI curated skills currently installed: `security-best-practices`.
- GitHub PR-comment and CI-debug workflows remain covered by the GitHub integration and should not be duplicated locally.

## Brain Maintenance

- `brain/` is the maintained project memory, not a duplicate README or a scratchpad.
- Use `brain/raw/` for evidence, `brain/wiki/` for compiled understanding, and `brain/outputs/` for reusable generated artifacts.
- Before adding brain files, classify brain impact:
  - `none`: no brain update
  - `small`: concise log, risk, or single-page update only if useful
  - `material`: update the relevant wiki page, `brain/wiki/log.md`, and `brain/wiki/now.md` if current state changed
  - `decision`: create or update a decision note and link it from the relevant wiki page
- Before opening or updating a PR for meaningful work, sync the affected brain pages on the same branch:
  - update the relevant wiki pages
  - append a concise note to `brain/wiki/log.md`
  - refresh `brain/wiki/now.md` if current state, risks, or next actions changed
- Do not create raw PR notes by default. Use `brain/raw/` only for evidence that future work needs: non-obvious rationale, failed paths, review/manual verification evidence, risky external API behavior, or unresolved tradeoffs.
- Treat `brain/outputs/` as non-canonical. Brainstorms, briefs, and plans become project truth only after the durable parts are promoted into `brain/wiki/`.
- If review iterations materially change the branch after the first wiki update, sync the brain again before final merge.
- After a PR merges to `master`, do a lightweight drift check. A separate post-merge brain PR is a repair path for missed syncs, review-driven drift, direct commits, squash/merge uncertainty, or periodic brain cleanup, not the default flow.
- Keep Obsidian local vault state out of normal changes. Stable vault config may remain committed; workspace and graph state should stay ignored and should not be treated as product evidence.

## Delegation Rules

- The Lead should plan first for non-trivial work and identify frontend, backend, and review slices.
- Keep tasks small and assign specialists only when their scope is meaningfully involved.
- Do not split a change if one person can safely complete it faster with less coordination.
- Avoid parallel edits to the same files unless the Lead has made ownership explicit.
- Backend work should be requested for changes touching `lib/actions/`, `app/api/`, `lib/auth/`, `lib/spacetimedb/`, `spacetimedb/`, UploadThing, or external API behavior.
- Frontend work should be requested for changes touching user flows, `components/`, client pages, Tailwind layout, forms, maps, or accessibility.

## Reviewer Rules

Ask the Reviewer / QA agent for a final pass when a change touches auth, SpacetimeDB schema/reducers, route handlers, UploadThing, map/geocoding behavior, server/client boundaries, or more than one feature area.

Ask for review before merge if lint/build cannot be run, if network access affects verification, or if the change includes behavior that must be manually checked in the browser.

## Definition Of Done

- Scope is clear and matches the request.
- UI changes are accessible, responsive enough for the existing layout, and consistent with current components.
- Server/data changes enforce auth and preserve user ownership boundaries.
- Relevant `brain/` pages were updated for meaningful changes, or the final summary explicitly states why no brain update was needed.
- SpacetimeDB changes include module publish and generated-binding steps where applicable.
- `npm run lint` has passed or the reason it could not run is documented.
- `npm run build` has passed for production-sensitive changes or the reason it could not run is documented.
- Remaining risks, manual checks, and follow-up work are called out clearly.
