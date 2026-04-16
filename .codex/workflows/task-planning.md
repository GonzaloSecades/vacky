# Task Planning Workflow

Use this before non-trivial Vacky work.

## Steps

1. Check repo state with `git status --short --branch`.
2. Identify touched areas: UI/client, server actions, route handlers, Prisma, local Docker/database setup, UploadThing, config, or docs.
3. Read `AGENTS.md` plus the relevant nearby files.
4. If changing App Router routing, rendering, data fetching, config, or boundaries, read the relevant docs under `node_modules/next/dist/docs/`.
5. Decide whether Lead can implement directly or should involve Frontend, Backend, and Reviewer.
6. Define file ownership before parallel work.
7. Choose verification: usually `npm run lint`; add `npm run build` for production-sensitive, Next config, Prisma, route, local database, or boundary changes.
8. Identify whether the task should update `brain/` and which wiki pages or raw notes are likely to be touched.

## Planning Output

- Goal and non-goals.
- Files or areas expected to change.
- Specialist involvement, if any.
- Risks and guardrails.
- Verification plan.
- Brain update plan, if the task meaningfully changes project understanding.

## Vacky Defaults

- Use npm and Node `22.20.0`.
- Do not invent a test command; no test runner is configured yet.
- Backend means the server/data layer inside the same Next.js app, not a separate service.
- Local database work should preserve Neon for preview/production and keep Docker reset commands clearly local-only.
