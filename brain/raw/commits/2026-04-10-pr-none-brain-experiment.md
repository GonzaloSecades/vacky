# Direct Master Commit Raw Note

Title: brain experiment

PR number: none found

Merge date: not applicable; latest `master` commit date is 2026-04-10

Commit: `90cbe69a50cc0380e118516426c1a3cd8eeefd01`

Parent: `fb34bc0e060ae96aeef834b0aaa80a0051423cbc` (`Merge pull request #6 from GonzaloSecades/GlobeDeprecatedError`)

Branch seen locally: `master`

## Evidence Used

- local `origin/master` and `master` both resolve to `90cbe69a50cc0380e118516426c1a3cd8eeefd01`
- GitHub branch metadata confirms remote `master` currently resolves to `90cbe69a50cc0380e118516426c1a3cd8eeefd01`
- local commit metadata:
  - author date: 2026-04-10T17:59:40-03:00
  - committer date: 2026-04-10T17:59:40-03:00
  - message: `brain experiment`
- GitHub commit metadata for `90cbe69a50cc0380e118516426c1a3cd8eeefd01` matches the local commit and shows parent `fb34bc0e060ae96aeef834b0aaa80a0051423cbc`
- GitHub commit-to-PR association endpoint returned an empty list for this commit
- recent closed GitHub PR metadata showed merged PRs #1 through #6 only; no PR was found for `90cbe69a`
- final tree diff from `fb34bc0` to `90cbe69` shows 53 files changed with 2302 insertions and 4 deletions

## Problem Or Goal

Initialize and commit the Vacky brain as a source-backed project memory, then wire brain maintenance into the local agent and PR workflow.

This goal is inferred from the final file set and commit message. No PR description or review discussion was available for this commit.

## Final Merged Behavior

This commit does not change the user-facing Vacky application surface. It changes repository memory, operator workflow, and agent guidance.

Final committed behavior:

- adds `brain/` as the first working project brain
  - `brain/raw/` stores evidence and source notes
  - `brain/wiki/` stores compiled project understanding
  - `brain/outputs/` stores reusable generated artifacts
  - `brain/Operator/` stores ingest, query, and lint operating procedures
- adds Obsidian vault configuration under `brain/.obsidian/`
- seeds raw evidence for prior merged work
  - PR #1 auth / Prisma / navbar / DB setup
  - PR #2 trip creation and UploadThing
  - PR #3 dashboard, trip details, locations, maps, globe, and itinerary management
  - PR #4 repo-scoped skills layer
  - PR #5 avatar menu, settings, and theme foundation
  - PR #6 globe loading and `three` compatibility
- seeds raw session notes for the brain bootstrap and current-state bootstrap
- creates first wiki pages for:
  - current state
  - architecture overview
  - data and auth
  - current product surface
  - agent workflow
  - decisions and experiments placeholders
  - log and now pages
- adds operator prompt templates for:
  - PR raw bootstrap
  - PR prep sync
  - post-merge sync
  - general ingest
  - query output generation
  - experiment sessions
  - lint passes
- updates repo workflow docs so future non-trivial changes consider brain updates
  - `AGENTS.md` adds a Brain Maintenance section and Definition of Done brain-sync line
  - `.codex/workflows/wiki-maintenance.md` defines session ingest, PR prep sync, and post-merge sync
  - implementation, planning, review, lead, reviewer, and repo-scoped skill docs now mention brain update checks
- adds `.github/pull_request_template.md` with a Brain Impact checklist

## Main Files Or Areas Touched

- brain foundation
  - `brain/README.md`
  - `brain/raw/**`
  - `brain/wiki/**`
  - `brain/outputs/**`
  - `brain/Operator/**`
  - `brain/.obsidian/**`
- agent and workflow guidance
  - `AGENTS.md`
  - `.agents/skills/vacky-implementation-workflow/SKILL.md`
  - `.agents/skills/vacky-review-workflow/SKILL.md`
  - `.codex/agents/lead.md`
  - `.codex/agents/reviewer.md`
  - `.codex/workflows/task-planning.md`
  - `.codex/workflows/implementation-checklist.md`
  - `.codex/workflows/review-checklist.md`
  - `.codex/workflows/wiki-maintenance.md`
  - `.codex/config.toml`
- GitHub process
  - `.github/pull_request_template.md`

## Important Review-Driven Changes If Discoverable

No review-driven changes are discoverable.

The latest commit is not a merge commit, has no local PR number in the commit message, and GitHub reported no associated PR for the commit. Recent closed PR metadata also stops at PR #6, whose merge commit is the parent of this direct `master` commit.

## Risks, Follow-Ups, Or Unresolved Questions

- The commit appears to be a direct push to `master` or otherwise not associated with a GitHub PR. That means there is no PR title, PR description, review thread, or review-driven rationale to preserve.
- The seeded PR raw notes for #1 through #6 still state that GitHub PR discussion metadata was unavailable in the original environment. Some of that metadata is now partially queryable through `gh`, but this commit did not revise the old notes with richer PR discussion evidence.
- The brain wiki now contains compiled claims about the product and architecture. Future edits should keep raw evidence and wiki interpretation distinct so the brain does not drift into unsupported narrative.
- The new PR template expects brain impact checks for future PRs, but this commit itself did not go through that PR process.
- No lint or build evidence was found in the commit metadata inspected here. Because the change is docs and workflow only, that is lower risk than an app behavior change, but it is still unverified by command output in the available evidence.

## What Should Be Promoted Into The Wiki

- Treat this commit as the point where `brain/` became a first-class maintained project memory in the repository.
- `brain/wiki/agents/workflow.md` should reflect that brain maintenance is now part of the implementation, review, and PR readiness workflow, not just an optional after-action note.
- `brain/wiki/now.md` should continue tracking that PR-history evidence is incomplete where review discussion metadata is missing or weak.
- `brain/wiki/log.md` should record this as the brain bootstrap / operator workflow commit if it has not already done so.
- Decision pages should not be created from this commit alone unless a future source captures the explicit rationale and alternatives for using this in-repo brain structure.
