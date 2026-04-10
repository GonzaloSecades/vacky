# Review Checklist

Use this for Reviewer / QA passes and Lead final checks.

## Diff Review

- Review `git diff --stat` and relevant `git diff`.
- Confirm the change matches the requested scope.
- Check for unrelated refactors, broad abstractions, or hidden behavior changes.
- Verify new client/server boundaries are intentional.
- Check whether the diff materially changes behavior, architecture, rationale, or workflow enough that `brain/` should have been updated.

## Repo-Specific Risks

- Auth: server actions and route handlers must call `auth()` and enforce ownership.
- Prisma: schema changes need migrations and generation; generated output should not be hand-edited.
- UploadThing: route names, client helpers, and image remote patterns must stay aligned.
- Geocoding: avoid per-request fan-out regressions and leaking server-only API keys.
- Next.js: App Router boundary changes should be checked against bundled Next `16.2.1` docs.
- UI: forms need labels, pending state, usable focus behavior, and reasonable responsive layout.

## Verification Review

- Prefer Node `22.20.0` command variants from `AGENTS.md`.
- `npm run lint` should pass for most changes.
- `npm run build` should pass for config, Prisma, route, rendering, or production-sensitive changes.
- If commands were skipped, the final response must say why and what remains unverified.

## Output

- Findings first, ordered by severity.
- Open questions or assumptions.
- Verification status.
- Call out missing or stale `brain/` updates when they matter to readiness.
- Readiness call: ready, ready with caveats, or not ready.
