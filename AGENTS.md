<!-- BEGIN:nextjs-agent-rules -->
# Next.js version guard

Before changing routing, rendering, data fetching, configuration, or server/client boundaries, read the relevant bundled Next.js docs.
Start with `node_modules/next/dist/docs/01-app/index.md`.
<!-- END:nextjs-agent-rules -->

# Vacky

## Current state

- Next.js 16.2.1, React 19.2.4, TypeScript, Tailwind v4, npm.
- Node 22.20.0 is the current frontend runtime from `.nvmrc`.
- Next.js currently owns HTTP routes, cookie sessions, password hashing, and external calls.
- Local SpacetimeDB still stores accounts, sessions, trips, and locations.
- SpacetimeDB is deprecated for new backend development. Its replacement does not exist yet.
- UploadThing and Google Maps/Places remain active integrations.

## Working agreement

- Gonzalo writes the NestJS backend. Help with one small step at a time.
- Explain the current step, review his code, and check its behavior before advancing.
- Do not generate the whole backend, scaffold it, or install its dependencies unless asked.
- Keep one backend plan: `docs/nestjs-backend.md`. Update its checklist instead of creating more plans.
- Do not require or suggest Vacky skill commands, brain ceremonies, or graphify refreshes.
- Do not delegate by default. Ask for specialist work only when the user requests it.
- Read the relevant brain page when it supplies useful context. Source code determines current behavior.
- Update durable facts or decisions directly. Small changes need no documentation ritual.
- `deprecated/`, `brain/raw/`, and old `brain/outputs/` are historical references, not current instructions.
- Use `asd-ste100` silently to check English answers. Use STE-flavored explanations and strict procedures.

## Repo and commands

- `app/`, `components/`, `lib/`: current web application.
- `spacetimedb/`, `lib/spacetimedb/`: legacy runtime, still required until cutover.
- `brain/wiki/now.md`: current state and next step.
- `brain/wiki/architecture/`: current implementation.
- `brain/wiki/risks.md`: unresolved risks and verification gaps.
- `docs/nestjs-backend.md`: the only active implementation plan.
- `deprecated/`: retired workflow documents and historical guidance.
- Install: `npm install`. Web dev: `npm run dev` on port 3001.
- Legacy full dev: `npm run dev:local`. SpacetimeDB listens on `127.0.0.1:3000`.
- Legacy module commands: `npm run stdb:start`, `npm run stdb:publish:local`, `npm run stdb:generate`.
- Checks: `npm run lint`, `npm run build`. No application test runner exists yet.
- Use Node from `.nvmrc` if the shell selects an older version. Do not copy machine-specific paths.

## Safety and conventions

- Check `git status --short --branch` before edits. Preserve unrelated changes and running services.
- Keep SpacetimeDB local-only until removal. Do not expose it publicly or delete local data during deprecation.
- Keep legacy runtime code, scripts, dependencies, and bindings until replacement parity and migration checks pass.
- If legacy schema or functions change, publish locally and regenerate bindings. Never hand-edit generated bindings.
- Preserve auth and ownership checks. A supplied `userId` alone does not authenticate a caller.
- Read relevant open risks before changing auth, trips, itineraries, maps, geocoding, or uploads.
- Default to Server Components. Keep server actions in `lib/actions/` with `'use server'`.
- Use `@/` imports, existing UI primitives, theme tokens, and accurate pending states.
- Keep modern Google Places APIs, row-scoped autocomplete tokens, advanced markers, and map-ID requirements.
- Keep UploadThing endpoints, client helpers, and image-host configuration aligned.
- Keep secrets on the server. Bound external requests and avoid per-row API calls during list reads.
- Preserve single quotes, semicolons, two-space indentation, and current Tailwind conventions in code.
- Run checks appropriate to the change. Report skipped checks and unresolved verification honestly.
- Exclude archived material from compilation, lint, and normal knowledge extraction.
- Standalone `brain/experiments/` artifacts are outside application lint. Preserve them unless the user requests experiment work.
