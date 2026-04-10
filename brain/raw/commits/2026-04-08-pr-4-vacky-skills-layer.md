# PR #4 Raw Note

Title: [codex] Add Vacky skills layer

Merge date: 2026-04-08

Merge commit: `4c2d901ee9155e1912f33a034a1f0abe08ff8dc0`

Branch seen locally: `codex-skills-layer-summary`

## Evidence Used

- local merge commit `4c2d901`
- branch commit visible locally:
  - `f1335f3` add vacky skills layer
- final merged tree at commit `4c2d901`
- no GitHub PR description, inline review context, or thread state available through connector for this repo

## Problem Or Goal

Add durable repo-local guidance so Codex work in Vacky uses project-specific workflows instead of generic behavior.

## Final Merged Behavior

This PR did not materially change end-user product behavior. It changed the repository's agent/workflow layer.

Final merged behavior:

- added repo-scoped skills under `.agents/skills/`
  - `vacky-implementation-workflow`
  - `vacky-review-workflow`
  - curated `playwright`
  - curated `security-best-practices`
- added `.codex/skills.md` as a human-facing index of selected skills
- updated `AGENTS.md` to point Codex work toward the skills layer
- lightly touched `.codex/agents/*` role docs to acknowledge the new layer

The practical effect is that later agent work in this repository is expected to:

- start with repo-specific planning
- respect Node/Next.js/Prisma/UploadThing/geocoding guardrails
- use explicit review workflows for risky changes

## Main Files Or Areas Touched

- repo-scoped skills
  - `.agents/skills/vacky-implementation-workflow/**`
  - `.agents/skills/vacky-review-workflow/**`
- curated skills vendored into repo
  - `.agents/skills/playwright/**`
  - `.agents/skills/security-best-practices/**`
- repo docs
  - `.codex/skills.md`
  - `AGENTS.md`
  - `.codex/agents/backend.md`
  - `.codex/agents/frontend.md`
  - `.codex/agents/lead.md`
  - `.codex/agents/reviewer.md`

## Important Review-Driven Changes If Discoverable

No review-driven changes are discoverable from local git alone. Only one branch commit was visible locally.

## Risks, Follow-Ups, Or Unresolved Questions

- large portions of this PR are vendored skill/reference content rather than Vacky-specific knowledge
- this PR created workflow guidance, but it did not itself populate the brain with source-backed project history
- current local worktree shows further edits in these same skill/workflow files, so the merge is only the starting point for that documentation layer

## What Should Be Promoted Into The Wiki

- `brain/wiki/agents/workflow.md` should treat PR #4 as the point where repo-local Codex workflow became first-class
- architecture/product pages probably do not need deep detail from this PR
- workflow pages should distinguish:
  - Vacky-specific skills
  - curated general-purpose skills
  - `.codex/` role docs versus `.agents/skills/` execution guidance
