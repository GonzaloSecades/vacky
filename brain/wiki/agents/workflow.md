# Agent Workflow

Vacky defines its project operating model primarily through `AGENTS.md`, `.codex/`, the repo-scoped skills added in PR #4, and the `brain/` knowledge base committed in direct master commit `90cbe69`.

## Team Shape

- lead / orchestrator
- frontend agent
- backend agent
- reviewer / QA agent

## Existing Workflow Assets

- `AGENTS.md`
  - top-level repo rules, architecture reminders, delegation rules, brain sync expectations, and definition of done
- `.codex/agents/`
  - role-specific prompts
- `.codex/workflows/`
  - reusable planning, implementation, review, and wiki-maintenance checklists
- `.agents/skills/`
  - execution-time skills that steer Codex behavior inside this repo
- `brain/`
  - maintained project memory split into raw evidence, compiled wiki pages, reusable outputs, and operator procedures
- `vacy-prompt-builder-project.md`
  - prompt-design workspace for Codex use

## Repo-Scoped Skills Added So Far

- `vacky-implementation-workflow`
  - start point for non-trivial Vacky changes
- `vacky-review-workflow`
  - review/readiness path for risky changes
- `grill-me`
  - adversarial planning path for stress-testing product, architecture, and implementation ideas against repo and brain evidence before committing to a direction
- `vacky-brain`
  - operational brain command layer for idea capture, implementation planning, raw evidence, PR prep sync, post-merge drift checks, brain linting, and graphify refresh reminders
- curated but installed locally:
  - `security-best-practices`

The presence of curated skills in the repo is a workflow convenience, not evidence that those concerns are always active.

## What Changed In PR #4

PR #4 is the key workflow milestone in current project history:

- repo-scoped skills became first-class
- `AGENTS.md` began explicitly pointing work toward those skills
- `.agents/skills/` became the discoverable execution layer for Codex
- `.codex/skills.md` became the human-facing index of selected and skipped skills
- the operating model became more specific about:
  - Node and Next.js guardrails
  - auth/data and UploadThing safety
  - geocoding risk
  - review expectations
  - brain maintenance expectations

The PR body gives the clearest rationale: keep skills thin, route work into existing Vacky docs instead of generic behavior, use security skills only when they add signal, and avoid broad generic skills that fight the Next.js 16 server-first architecture. Vercel-specific guidance was intentionally deferred until deployment checks become recurring.

## What Changed In Direct Commit `90cbe69`

Commit `90cbe69` from 2026-04-10 is the point where the brain became a committed repository artifact rather than just a workflow expectation.

Source evidence: [direct master commit raw note](../../raw/commits/2026-04-10-pr-none-brain-experiment.md).

Final committed behavior:

- added `brain/` as a structured project memory
  - `raw/` for source evidence
  - `wiki/` for compiled understanding
  - `outputs/` for reusable generated artifacts
  - `Operator/` for ingest, query, and lint procedures
- seeded raw notes for PRs #1 through #6 and bootstrap sessions
- created first wiki pages for current state, architecture, product surface, data/auth, and workflow
- added prompt templates for PR raw bootstrap, PR prep sync, post-merge sync, general ingest, query, experiment sessions, and lint passes
- added `.github/pull_request_template.md` with a Brain Impact checklist
- updated `AGENTS.md`, `.codex/workflows/`, `.codex/agents/`, and repo-scoped skills so brain maintenance is part of implementation and review readiness

No associated PR was found for this commit through local history or GitHub commit-to-PR metadata, so there is no PR discussion or review-thread evidence for the rationale.

## Role Of The Brain

The brain should not replace agent instructions.

It should preserve:

- source evidence that future agents can verify
- why a task was scoped a certain way
- what changed in project understanding
- which prompt patterns worked well
- what decisions should shape future work

## Brain Sync Expectations

- feature branches should update the brain when meaningful behavior, architecture, rationale, workflow, or risk changed
- PRs should state brain impact through the pull request template when the change is meaningful
- review and readiness passes should flag stale or missing brain updates when they affect project understanding
- PR review iterations that materially alter the branch should trigger another brain sync before final merge
- post-merge sync is a repair step for drift; it should not replace the branch-level update while the work is still fresh
- direct commits or otherwise PR-less changes should leave raw provenance notes because review metadata may be unavailable later

The Operator docs now make this more explicit through a brain impact gate:

- `none`: no brain changes
- `small`: at most a concise log, risk, or single-page update
- `material`: update affected wiki pages on the implementation branch
- `decision`: create or update a decision note and link it from the relevant page

The preferred workflow is one implementation PR with proportional brain updates. A second brain-only PR is reserved for missed syncs, review-driven post-merge drift, direct commits, squash/merge uncertainty, or periodic brain cleanup.

For planning work, `brain/Operator/query/implementation-plan-template.md` is the preferred prompt shape when the desired output is a Codex-ready implementation prompt rather than code. It asks the planning session to include scope, non-goals, ownership, risk, verification expectations, and brain impact before implementation begins.

For implementation work that crosses Next.js UI, server actions, and local SpacetimeDB, [Fullstack Feature Guide](../architecture/fullstack-feature-guide.md) is the durable wiki reference. It should be used as base context when a future user asks broad implementation questions such as how to add or delete a feature end to end.

The `grill-me` skill is the pressure-test companion for those planning sessions. It should inspect repo and brain evidence first, then challenge only the assumptions and decisions that remain unresolved. For memory-first or trip-photo planning, it should account for the trip photos brainstorm under `brain/outputs/brainstorms/` without treating that brainstorm as accepted product truth.

The `vacky-brain` skill is the operational companion for normal work. Agents should suggest exact commands during conversations, for example `Run $vacky-brain idea with prompt: "..."` while exploring an idea, `Run $vacky-brain plan with prompt: "..."` before scoped implementation, `Run $vacky-brain raw with prompt: "..."` when evidence should be preserved, and `Run $vacky-brain sync with prompt: "..."` before PR-ready work. After meaningful brain, skill, architecture, or code changes, agents should also suggest `$graphify . --update` so `graphify-out/` stays aligned with canonical brain and repo state.

## Current Gaps

- the repo has stronger instructions than historical memory
- workflow rationale is better documented than product rationale
- raw PR notes #1 through #6 have now been recalibrated with GitHub metadata, and PR #8 plus PR #10 have post-merge GitHub/local merge evidence
- direct commit `90cbe69` bootstrapped the brain without associated PR metadata, so its rationale and review history remain weaker than its final file evidence
- Obsidian vault state can leak into feature PRs; PR #8 review flagged `.obsidian` graph/workspace churn as editor-local noise, a later `84f9abd` commit changed only `brain/.obsidian/workspace.json`, and PR #10 removed tracked graph/workspace state while adding ignore rules

The intended repo hygiene is that stable vault configuration can remain committed, but local graph and workspace state should stay out of normal commits.

## Local Database Sidequests

The old local Docker Postgres sidequest is now historical context only. On the active migration branch, local database workflow is SpacetimeDB-only and future persistence changes should be treated as Backend-owned auth/SpacetimeDB work with Lead coordination.

The [local Docker Postgres sidequest prompt](../../outputs/plans/2026-04-16-local-docker-postgres-sidequest-prompt.md) remains useful only as historical context for the superseded Prisma stack. The current workflow constraints are:

- keep this branch local-instance-only for SpacetimeDB
- avoid Maincloud, Neon, Docker Postgres, hosted Postgres, and anonymous-publish assumptions unless scope changes explicitly
- keep destructive reset commands local-only
- close or update auth/data risks only with verification evidence
- ask Reviewer for a final pass when auth, route handlers, UploadThing, or SpacetimeDB boundaries change

## Good Candidates For Future Notes

- prompt patterns that consistently produce good implementation runs
- recurring review findings
- architecture questions that surface repeatedly
- handoff notes between planning and implementation

## Primary Evidence

- [PR #4 skills layer raw note](../../raw/commits/2026-04-08-pr-4-vacky-skills-layer.md)
- [direct brain bootstrap raw note](../../raw/commits/2026-04-10-pr-none-brain-experiment.md)
- [PR #7 brain recalibration raw note](../../raw/commits/2026-04-11-pr-7-brain-sidequest-init.md)
- [PR #8 itinerary planner raw note](../../raw/commits/2026-04-11-pr-8-itinerary-planner.md)
- [PR #9 brain ingest and briefings raw note](../../raw/commits/2026-04-12-pr-9-brain-ingest-briefings.md)
- [PR #10 itinerary maps and stop metadata raw note](../../raw/commits/2026-04-15-pr-10-improve-itinerary-maps-and-stop-metadata.md)
- [central risk register](../risks.md)
