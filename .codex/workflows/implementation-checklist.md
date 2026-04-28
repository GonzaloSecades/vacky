# Implementation Checklist

Use this while making Vacky changes.

## Before Editing

- Confirm `git status --short --branch`.
- Read the relevant files and call sites.
- Preserve unrelated local changes.
- Confirm whether the work touches Next.js boundaries, auth, SpacetimeDB, UploadThing, geocoding, or local runtime setup.
- Identify whether the task should update `brain/wiki/` and whether a raw session or execution note will help preserve context.

## While Editing

- Use `@/` imports for local code.
- Prefer Server Components and server actions for data work.
- Add `'use client'` only when required.
- Keep auth checks in server actions and route handlers.
- Validate user ownership for trip/location IDs.
- Reuse `components/ui/` and existing Tailwind patterns.
- Keep form pending state accurate for async server actions.
- Update `next.config.ts` image hosts if new remote image URLs are introduced.
- Capture durable rationale, failures, or tradeoffs in `brain/raw/` when they would not be obvious from the final diff.

## SpacetimeDB Work

- Update `spacetimedb/src/schema.ts` for table/index changes.
- Update `spacetimedb/src/index.ts` for reducers, procedures, views, and module logic.
- Run `PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:publish:local`.
- Run `PATH=/Users/gonzalo.secades/.local/bin:/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run stdb:generate`.
- Do not manually edit `lib/spacetimedb/module_bindings`.

## Local Runtime Work

- Keep SpacetimeDB on `http://localhost:3000` and Next.js on `http://localhost:3001`.
- Keep the branch local-instance-only unless the user explicitly changes deployment strategy.
- Use committed env examples with placeholder values only; never quote or commit real `.env` values.
- Keep destructive reset commands visibly local-only.
- Avoid Maincloud, Neon, Docker Postgres, hosted Postgres, and anonymous-publish assumptions.

## Verification

- Run `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`.
- Run `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build` for production-sensitive changes.
- Document manual checks when browser behavior matters.
- Before opening or updating a PR for meaningful work, sync the affected `brain/wiki/` pages on the branch.
- Append to `brain/wiki/log.md` and refresh `brain/wiki/now.md` when the project state, risks, or next actions changed.
