# PR Prep Sync Template

```text
Before I open or update a PR for this branch, inspect the diff against `master` and sync the Vacky brain.

Goal:
Keep the implementation PR self-contained so a second brain-only PR is not needed unless review or merge creates drift.

Read:
- `brain/wiki/now.md`
- `brain/wiki/index.md`
- `brain/wiki/log.md`
- the wiki pages most relevant to this branch

Then:
1. Inspect the branch diff against `master`.
2. Classify brain impact as `none`, `small`, `material`, or `decision`.
3. If impact is `none`, do not edit brain files; report why no brain sync is needed.
4. Update only the brain pages materially affected by this branch.
5. Append a concise dated note to `brain/wiki/log.md` only when durable knowledge changed.
6. Refresh `brain/wiki/now.md` only if current state, risks, or next actions changed.
7. Update `brain/wiki/risks.md` only if risk status, verification status, or follow-ups changed.
8. If useful, write a reusable brief under `brain/outputs/briefs/`.

Rules:
- Keep the update proportional to the branch.
- Prefer editing existing pages over creating duplicates.
- Preserve uncertainty when the diff does not fully explain intent.
- If a raw session note is needed for provenance, add it under `brain/raw/sessions/` or `brain/raw/verification/`.
- Do not create a raw PR note by default before merge.
- Do not copy the PR body into the brain.
- Treat the PR body as temporary packaging; treat the wiki as durable memory.

PR body brain section:
At the end, provide a short `Brain impact` section that says:
- brain impact classification
- brain files changed
- raw evidence added, if any
- whether a post-merge brain PR is expected
```
