# Post-Merge Sync Template

```text
PR #[number] was merged to `master`. Run a post-merge brain sync for Vacky.

Read:
- `brain/wiki/now.md`
- `brain/wiki/index.md`
- `brain/wiki/log.md`
- the wiki pages most likely affected by the merged work

Inspect:
- the merged diff, merge commit, or the final `master` state

Then:
1. Compare the merged changes against the current wiki.
2. Update stale architecture, feature, decision, workflow, and current-state notes.
3. Append a concise dated note to `brain/wiki/log.md`.
4. Refresh `brain/wiki/now.md` if current state, risks, or next actions changed.
5. If the merge revealed missing evidence, create a raw commit/merge note under `brain/raw/commits/`.

Rules:
- Treat this as reconciliation, not a full rewrite.
- Preserve source-backed facts and label inference clearly.
- Prefer fixing drift over restating the whole project.
```
