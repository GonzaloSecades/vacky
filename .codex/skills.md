# Vacky Skills

Repo-scoped Codex skills live in `.agents/skills/`.
This file is the human-facing index for the skill layer and records why each skill was chosen.

## Chosen Strategy

Strategy `B`: use `autoskills` as discovery only, then manually install selected OpenAI-curated skills.

Why this won:

- `openai/skills` is Codex-native, stable, and directly installable.
- `autoskills --dry-run -a codex` suggested 16 third-party stack skills for this repo, which is too broad for the current Phase 1 setup.
- The autoskills output missed Vacky-specific realities such as NextAuth, UploadThing, geocoding risk, and the existing local guardrails.
- Thin repo-local skills are still needed to route Codex into the existing `.codex` agent and workflow docs without duplicating them.

## Installed Skills

### OpenAI Curated

- `security-best-practices`
  - Location: `.agents/skills/security-best-practices/`
  - Use for: explicit security reviews or secure-by-default changes touching auth, routes, SpacetimeDB, or other sensitive server paths
  - Main users: Backend, Reviewer, Lead
  - Notes: includes Next.js and React security reference files, which match this stack

### Repo-Local

- `vacky-implementation-workflow`
  - Location: `.agents/skills/vacky-implementation-workflow/`
  - Use for: non-trivial planning or implementation work in this repo
  - Main users: Lead, Frontend, Backend
  - Notes: routes Codex to `AGENTS.md` plus the local planning and implementation workflow docs

- `vacky-review-workflow`
  - Location: `.agents/skills/vacky-review-workflow/`
  - Use for: review passes, QA checks, and final readiness calls
  - Main users: Reviewer, Lead
  - Notes: routes Codex to the local review checklist and findings-first output expectations

- `grill-me`
  - Location: `.agents/skills/grill-me/`
  - Use for: pressure-testing Vacky plans, product directions, architecture choices, and implementation prompts against repo code, brain state, risks, and open decisions before committing to a path
  - Main users: Lead, Reviewer, user-driven planning sessions
  - Notes: starts from repo/brain evidence, including relevant `brain/raw/` and `brain/outputs/` artifacts, then asks only the decisions that cannot be answered from the codebase

- `spacetimedb-typescript-vacky`
  - Location: `.agents/skills/spacetimedb-typescript-vacky/`
  - Use for: planning, implementing, or reviewing Vacky's SpacetimeDB migration with the official TypeScript AI rules, official docs routing, and repo-local migration context
  - Main users: Lead, Backend, Reviewer
  - Notes: packages the official SpacetimeDB TypeScript rules, a curated doc index, a refresh script for raw upstream sources, and Vacky-specific migration constraints

## Role Guidance

- Lead
  - Start with `vacky-implementation-workflow` for non-trivial work.
  - Use `grill-me` when a plan, scope, product bet, or implementation prompt needs adversarial questioning before edits.
  - Use `spacetimedb-typescript-vacky` for any SpacetimeDB migration, bindings, reducers/views, or auth-integration work.
  - Pull in `security-best-practices` only when the task is explicitly security-heavy.

- Frontend
  - Use `vacky-implementation-workflow` for repo guardrails.
  - Browser testing is manual-only for now; coordinate with the user for UI verification.

- Backend
  - Use `vacky-implementation-workflow` for repo guardrails.
  - Use `spacetimedb-typescript-vacky` for the SpacetimeDB migration branch and any module/bindings/auth-integration work.
  - Use `security-best-practices` for explicit auth, route-handler, SpacetimeDB, or secure-by-default work.

- Reviewer
  - Start with `vacky-review-workflow`.
  - Use `grill-me` for pre-implementation pressure tests or when a review needs to expose unresolved product/architecture assumptions before code changes continue.
  - Use `spacetimedb-typescript-vacky` when the diff touches SpacetimeDB module code, bindings, subscriptions, or migration architecture.
  - Add `security-best-practices` for security-heavy diffs.
  - Ask for manual browser verification notes when browser behavior or visual verification matters.

## Evaluated And Skipped

- `autoskills` install
  - Dry run only. Useful as a comparison tool, but not as the installer of record for this repo.
  - It recommended 16 generic third-party skills and would have added more noise than signal.

- `frontend-skill`
  - Strong skill, but too art-direction-heavy for this utility-first product UI and likely to fight the current Tailwind and component conventions.

- `gh-address-comments` and `gh-fix-ci`
  - Useful, but already available through the GitHub plugin in this environment.
  - Keeping them global avoids duplicating GitHub workflows locally.

- `doc`, `pdf`, `screenshot`, and the deployment skills
  - Not recurring enough for this repo's day-to-day work right now.

- OpenAI experimental skills
  - The official installer path for `.experimental` did not return a current listing during evaluation, so none were installed blindly.
