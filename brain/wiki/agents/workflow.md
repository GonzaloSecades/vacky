# Agent Workflow

Vacky defines its project operating model primarily through `AGENTS.md`, `.codex/`, and the repo-scoped skills added in PR #4.

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
- the operating model became more specific about:
  - Node and Next.js guardrails
  - Prisma and UploadThing safety
  - geocoding risk
  - review expectations
  - brain maintenance expectations

## Role Of The Brain

The brain should not replace agent instructions.

It should preserve:

- why a task was scoped a certain way
- what changed in project understanding
- which prompt patterns worked well
- what decisions should shape future work

## Brain Sync Expectations

- feature branches should update the brain when meaningful behavior, architecture, rationale, workflow, or risk changed
- PR review iterations that materially alter the branch should trigger another brain sync before final merge
- post-merge sync is a repair step for drift; it should not replace the branch-level update while the work is still fresh

## Current Gaps

- the repo has stronger instructions than historical memory
- workflow rationale is better documented than product rationale
- raw bootstrap evidence noted local workflow-file edits after PR #4, so PR #4 should be treated as the start of the workflow layer, not proof of the final workflow state

## Good Candidates For Future Notes

- prompt patterns that consistently produce good implementation runs
- recurring review findings
- architecture questions that surface repeatedly
- handoff notes between planning and implementation
