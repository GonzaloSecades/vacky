---
name: spacetimedb-typescript-vacky
description: Use when planning, implementing, or reviewing Vacky's SpacetimeDB TypeScript migration, module code, generated bindings, reducers, views, subscriptions, or auth integration.
---

# SpacetimeDB TypeScript For Vacky

Use this skill for Vacky work that touches the SpacetimeDB module, generated TypeScript bindings, live subscriptions, Next.js integration, or the migration path away from Prisma and NextAuth.

## First Reads

Open these in order:

- `AGENTS.md`
- `.agents/skills/vacky-implementation-workflow/SKILL.md`
- `brain/Operator/query/spacetimedb-vacky-guide.md`
- `docs/superpowers/plans/2026-04-23-spacetimedb-adoption-for-vacky.md`

Then load only the references needed for the task:

- `references/official-source-index.md`
- `references/vacky-migration-context.md`
- `references/upstream/spacetimedb-typescript.mdc`
- `references/upstream/llms.txt`

## Hard Rules

1. Treat `references/upstream/spacetimedb-typescript.mdc` as authoritative before writing any SpacetimeDB TypeScript code.
2. Do not invent SDK packages, connection helpers, hooks, reducer signatures, or query APIs. Verify against generated bindings.
3. Reducers are the default write path. Views or explicitly public safe projections are the default read path.
4. Procedures are beta. Use them only when Next.js cannot own the side effect and document the reason.
5. Keep auth-sensitive tables private by default. Never expose password hashes, token hashes, or session secrets through public tables or public views.
6. Regenerate bindings after schema, reducer, procedure, or view changes.
7. For Vacky, keep email delivery, password hashing, cookie issuance, redirects, and HTTP semantics in Next.js server code unless a later decision says otherwise.
8. If a task changes Next.js routing, rendering, config, or server/client boundaries, read the bundled Next.js 16 docs before editing.

## Workflow

1. Read `references/official-source-index.md` to route yourself to the right official docs.
2. If the task touches auth, read `references/vacky-migration-context.md` before making architecture assumptions.
3. Update SpacetimeDB schema, reducers, views, and indexes before app-side helpers.
4. Regenerate bindings, then verify actual generated names before updating imports or reducer calls.
5. Keep Next.js pages, route handlers, and server helpers thin. Put persistence behavior in reducers and safe projections.
6. Prefer server-rendered initial reads plus client subscriptions for live updates.
7. Browser verification is manual-only for this repo right now unless the user explicitly changes that policy.

## Reference Pack

- `references/official-source-index.md`
  Use this first. It lists the official docs pages that matter for migration work and the reason each one exists.
- `references/vacky-migration-context.md`
  Repo-local constraints, migration goals, and known architecture tensions.
- `references/upstream/spacetimedb-typescript.mdc`
  Raw official AI rules for SpacetimeDB TypeScript.
- `references/upstream/llms.txt`
  Raw official SpacetimeDB LLM summary and doc index.
- `scripts/refresh_sources.sh`
  Refreshes the raw upstream files into `references/upstream/`.
