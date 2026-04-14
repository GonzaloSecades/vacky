# PR #7 Raw Note

Title: BrainSidequestInit / recalibrate Vacky brain evidence

PR: https://github.com/GonzaloSecades/vacky/pull/7

Merge date: 2026-04-11

Merge commit: `97509203784f644188706a14878ec0decf184ec6`

Branch: `BrainSidequestInit`

Head commit: `02d877e56744e9b6caefaa54a4c10f0ce04ad881`

## Evidence Used

- Local git merge history showing `Merge pull request #7 from GonzaloSecades/BrainSidequestInit`.
- Local `git show` output for commit `02d877e`.
- Final repository state after later PR #9, used only to understand how this note had been missing from the raw layer.

No GitHub review comments or PR discussion were inspected for this note. Treat review provenance as weak unless a later GitHub-backed pass adds it.

## Problem Or Goal

The branch recalibrated the newly committed Vacky brain against stronger PR evidence.

Before this branch, the brain bootstrap had raw local evidence but weaker GitHub-backed provenance. This PR added or strengthened raw notes for earlier merged PRs and then updated the compiled wiki to reflect that evidence.

## Final Merged Behavior

PR #7 added or updated:

- raw PR notes for PRs #1 through #6 under `brain/raw/commits/`
- raw note for the PR-less direct brain bootstrap commit `90cbe69`
- current-state bootstrap 2.0 raw session note
- stronger wiki coverage for:
  - `wiki/now.md`
  - `wiki/log.md`
  - `wiki/architecture/overview.md`
  - `wiki/architecture/data-and-auth.md`
  - `wiki/features/current-surface.md`
  - `wiki/agents/workflow.md`
- `Operator/ingest/prompt-template.md`

The branch did not change runtime application behavior. It was brain evidence and workflow documentation work.

## Main Files Or Areas Touched

- `brain/raw/commits/2026-03-31-pr-1-init-setup-auth-navbar-db.md`
- `brain/raw/commits/2026-03-31-pr-2-trip-creation-uploadthing.md`
- `brain/raw/commits/2026-04-07-pr-3-trip-dashboard-location-management.md`
- `brain/raw/commits/2026-04-08-pr-4-vacky-skills-layer.md`
- `brain/raw/commits/2026-04-08-pr-5-avatar-menu-settings-theme-foundation.md`
- `brain/raw/commits/2026-04-08-pr-6-globe-loading-three-timer-compat.md`
- `brain/raw/commits/2026-04-10-pr-none-brain-experiment.md`
- `brain/raw/sessions/2026-04-10-current-state-bootstrap-2-github-recalibration.md`
- `brain/wiki/**`
- `brain/Operator/ingest/prompt-template.md`

## Risks, Follow-Ups, Or Unresolved Questions

- This raw note was missing until 2026-04-13 even though the wiki already referenced PR #7. That was a provenance flaw.
- GitHub review-thread evidence for PR #7 is still not captured here.
- Because the branch was docs-only, command/build verification is lower value than link/provenance verification, but no explicit verification output was found in the local commit metadata.

## What Should Be Promoted Into The Wiki

- PR #7 should be treated as a brain recalibration event, not a runtime architecture or product event.
- The wiki should keep PR #7 in history only where it explains evidence quality.
- Future lint passes should flag any PR mentioned in the wiki that lacks a matching raw note.
