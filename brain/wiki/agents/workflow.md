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
- curated but installed locally:
  - `playwright`
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
  - Prisma and UploadThing safety
  - geocoding risk
  - review expectations
  - brain maintenance expectations

The PR body gives the clearest rationale: keep skills thin, route work into existing Vacky docs instead of generic behavior, use browser/security skills only when they add signal, and avoid broad generic skills that fight the Next.js 16 server-first architecture. Vercel-specific guidance was intentionally deferred until deployment checks become recurring.

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

## Current Gaps

- the repo has stronger instructions than historical memory
- workflow rationale is better documented than product rationale
- raw PR notes #1 through #6 have now been recalibrated with GitHub metadata, and PR #8 has post-merge GitHub/local merge evidence
- direct commit `90cbe69` bootstrapped the brain without associated PR metadata, so its rationale and review history remain weaker than its final file evidence
- Obsidian vault state can leak into feature PRs; PR #8 review flagged `.obsidian` graph/workspace churn as editor-local noise, and a later `84f9abd` commit changed only `brain/.obsidian/workspace.json`

The intended repo hygiene is that stable vault configuration can remain committed, but local graph and workspace state should stay out of normal commits.

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
- [central risk register](../risks.md)
