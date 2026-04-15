# Post-Merge Sync Template

```text
PR #[number] was merged to `master`. Run a post-merge brain sync for Vacky.

Goal:
Reconcile final merged state with the brain. This is a drift check, not a mandatory second documentation PR.

Read:
- `brain/wiki/now.md`
- `brain/wiki/index.md`
- `brain/wiki/log.md`
- the wiki pages most likely affected by the merged work

Inspect:
- the merged diff, merge commit, or the final `master` state
- the PR body and review comments when available
- any brain updates that were already included in the implementation PR

Then:
1. Compare the merged changes against the current wiki.
2. If the implementation PR already captured durable truth accurately and review did not change it, report no brain changes are needed.
3. Update stale architecture, feature, decision, workflow, risk, and current-state notes only where drift exists.
4. Append a concise dated note to `brain/wiki/log.md` only when files changed.
5. Refresh `brain/wiki/now.md` only if current state, risks, or next actions changed.
6. Create a raw commit/merge note under `brain/raw/commits/` only if the merge revealed missing evidence, review-driven rationale, or final-state uncertainty that future work should preserve.

Rules:
- Treat this as reconciliation, not a full rewrite.
- Preserve source-backed facts and label inference clearly.
- Prefer fixing drift over restating the whole project.
- Do not create a separate brain PR when the branch-level brain update is already accurate.
- Do not create raw PR notes for routine PRs.
```
