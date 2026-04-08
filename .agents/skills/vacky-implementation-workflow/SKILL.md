---
name: vacky-implementation-workflow
description: Use when planning or implementing non-trivial changes in the Vacky repository so Codex follows the repo's local agent docs, Next.js 16 guardrails, Node 22 tooling, and auth/Prisma/UploadThing/geocoding safety checks before editing.
---

# Vacky Implementation Workflow

Use this skill only inside the Vacky repository.

## First Reads

Open these files first:

- `AGENTS.md`
- `.codex/workflows/task-planning.md`
- `.codex/workflows/implementation-checklist.md`

Load role docs only when they matter for the current change:

- `.codex/agents/lead.md`
- `.codex/agents/frontend.md`
- `.codex/agents/backend.md`
- `.codex/agents/reviewer.md`

## Workflow

1. Start with `git status --short --branch`.
2. Classify the task as mainly frontend, backend, review, or mixed.
3. If the change touches routing, rendering, data fetching, config, or server/client boundaries, read `node_modules/next/dist/docs/01-app/index.md` and the linked Next.js 16 docs before editing.
4. Use the Node `22.20.0` command variants from `AGENTS.md` when running npm or Prisma commands.
5. Keep the Phase 1 agent structure intact: Lead owns planning and integration, Frontend owns UI/client work, Backend owns auth/data/server work, and Reviewer owns the final risk pass.
6. Treat auth, Prisma schema or migrations, UploadThing, external APIs, and geocoding as high-risk.
7. Pull in other skills only when they clearly add signal:
   - `playwright` for browser or manual flow verification
   - `security-best-practices` for explicit security or secure-by-default work
   - `vacky-review-workflow` for the final review or readiness pass
8. Default verification is lint. Add build for production-sensitive, Prisma, route, config, or boundary changes.

## Repo Reminders

- Default to Server Components.
- Keep server actions in `lib/actions/` with `'use server'`.
- Enforce `auth()` at server boundaries.
- Use Prisma via `@/app/db` and generated types from `@/app/generated/prisma`.
- Do not edit `app/generated/prisma` by hand.
- Keep `next.config.ts` image hosts aligned with new remote image URLs.
- Keep UploadThing route names and client helpers in sync.

## Output Expectations

Summaries should call out:

- touched areas and file ownership
- verification run or skipped
- remaining risks or manual checks
