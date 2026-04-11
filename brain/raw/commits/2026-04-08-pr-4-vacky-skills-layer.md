# PR #4 Raw Note

Title: [codex] Add Vacky skills layer

PR: https://github.com/GonzaloSecades/vacky/pull/4

Merge date: 2026-04-08

Merge commit: `4c2d901ee9155e1912f33a034a1f0abe08ff8dc0`

Branch: `codex-skills-layer-summary`

Base: `426f95d0e96f541bc7ef6bce3e86f1045203df5f`

Head: `f1335f3d196accc35f56929c7163f25ae400520b`

## Evidence Used

- GitHub PR metadata, body, final diff, and Copilot review summary for PR #4.
- Local merge commit `4c2d901`.
- Existing first-bootstrap raw note, reconciled with GitHub metadata.
- Current repo docs/skills state.

## Problem Or Goal

The PR body says the repo already had strong local guidance in `AGENTS.md` and `.codex/`, but Codex needed a thinner discoverable skill layer to:

- discover repo-local workflows automatically from `.agents/skills/`
- route implementation and review work into existing Vacky docs instead of generic behavior
- selectively use browser and security skills only when useful
- avoid broad generic skills that could add noise or fight the current Next.js 16/server-first architecture

This is workflow infrastructure, not product behavior.

## Final Merged Behavior

This PR did not change the user-facing app. It changed how agents are expected to work in the repo.

Final merged behavior:

- Added repo-local skills under `.agents/skills/`:
  - `vacky-implementation-workflow`
  - `vacky-review-workflow`
- Added curated skill packages under `.agents/skills/`:
  - `playwright`
  - `security-best-practices`
- Added `.codex/skills.md` as a human-facing index for:
  - selected skill strategy
  - installed skills
  - role guidance
  - evaluated options intentionally skipped
- Updated `AGENTS.md` to document `.agents/skills/` as the Codex discovery path and to point work toward the new skills layer.
- Updated `.codex/agents/*` role docs so Lead, Frontend, Backend, and Reviewer know when to use repo-local and curated skills.

Practical effect:

- Non-trivial Vacky implementation work should start with `vacky-implementation-workflow`.
- Review/readiness work should start with `vacky-review-workflow`.
- Playwright should be pulled in for browser automation/manual UI checks when terminal inspection is not enough.
- `security-best-practices` should be used for explicit security-focused work, not as always-on background guidance.

## Main Files Or Areas Touched

- repo-local skills:
  - `.agents/skills/vacky-implementation-workflow/SKILL.md`
  - `.agents/skills/vacky-implementation-workflow/agents/openai.yaml`
  - `.agents/skills/vacky-review-workflow/SKILL.md`
  - `.agents/skills/vacky-review-workflow/agents/openai.yaml`
- curated skills:
  - `.agents/skills/playwright/**`
  - `.agents/skills/security-best-practices/**`
- repo workflow docs:
  - `.codex/skills.md`
  - `AGENTS.md`
  - `.codex/agents/backend.md`
  - `.codex/agents/frontend.md`
  - `.codex/agents/lead.md`
  - `.codex/agents/reviewer.md`

## Important Review-Driven Changes Or Comments

- Copilot review summary says the PR added the initial Codex skills layer by introducing repo-local workflow skills, installing curated skills, and documenting how to use them alongside `.codex/` guidance.
- Copilot reviewed 30 of 32 files and generated 2 comments. The connector did not expose actionable specific comment text that materially changes the final interpretation.
- The PR body says validation was limited to checking that repo-local skills existed and that the skills index and `AGENTS.md` references aligned.
- The PR body explicitly says `npm run lint` and `npm run build` were not run because the change was documentation and skill metadata only.

## Risks, Follow-Ups, Or Unresolved Questions

- Large portions of this PR are vendored curated skill/reference content rather than Vacky-specific knowledge.
- The PR created workflow guidance but did not populate the brain with source-backed project history; that happened later in direct commit `90cbe69`.
- Vercel-specific guidance was intentionally kept out. The PR body says a narrow repo-local Vercel readiness skill could be added later if deployment-specific checks recur.
- Current repo state has subsequent edits to workflow and brain docs, so PR #4 should be treated as the starting point of the skill layer, not the current full workflow state.

## What Should Be Promoted Into The Wiki

- `brain/wiki/agents/workflow.md` should treat PR #4 as the point where repo-local Codex workflows became first-class.
- Workflow docs should preserve the rationale: use discoverable thin skills to route into existing Vacky docs, not to replace them with broad generic best practices.
- The wiki should distinguish repo-local skills from curated general skills.
- Product/architecture pages should not overemphasize this PR because it did not change app behavior.
