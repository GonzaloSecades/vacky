---
name: vacky-review-workflow
description: Use when reviewing Vacky changes or preparing a readiness call so the review follows the repo's findings-first format, verification expectations, and auth/Prisma/UploadThing/geocoding/Next.js risk checks.
---

# Vacky Review Workflow

Use this for Reviewer passes and Lead final QA inside the Vacky repository.

## First Reads

Open:

- `AGENTS.md`
- `.codex/workflows/review-checklist.md`
- `.codex/agents/reviewer.md`

Load `.codex/agents/frontend.md` or `.codex/agents/backend.md` only if the diff crosses those boundaries.

## Review Flow

1. Inspect `git diff --stat` and the relevant diff.
2. Confirm the change matches the requested scope and does not hide unrelated refactors.
3. Report findings first, ordered by severity, with file and line references.
4. Check the repo-specific risks:
   - auth and ownership enforcement in server actions and route handlers
   - Prisma migrations plus `prisma generate` when schema changed
   - UploadThing route names and image host alignment
   - geocoding or API fan-out regressions
   - Next.js 16 boundary changes against bundled docs
   - accessibility and pending-state correctness for UI changes
5. Verify claimed commands against available tooling. Prefer the Node `22.20.0` variants from `AGENTS.md`.
6. Use `security-best-practices` when the review is explicitly security-heavy. Use `playwright` when browser or manual validation matters.
7. End with a readiness call: `ready`, `ready with caveats`, or `not ready`.

## Output Expectations

Include:

- findings
- open questions or assumptions
- verification status
- remaining manual checks
