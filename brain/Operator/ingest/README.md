# Ingest Operator

Use ingest when you have new source material and want to update the maintained wiki.

## Inputs

- one or more files from `raw/`
- optionally, direct repo context if the source depends on current code state

## Outputs

- updated pages under `wiki/`
- appended event in `wiki/log.md`
- refreshed `wiki/now.md` when current status changed

## Ingest Rules

- do not treat raw notes as already-trusted truth
- preserve uncertainty where the source is incomplete
- update existing pages before creating duplicates
- connect new knowledge through links, not isolated summaries
- distinguish sourced facts from inferred conclusions

## Typical Ingest Targets

- current state changes
- architecture updates
- new feature understanding
- decisions and rationale
- experiments and lessons

## Common Ingest Modes

### Session Ingest

Promote notes from `raw/sessions/` into the wiki after meaningful development work.

### PR Prep Sync

Before opening or updating a PR, inspect the branch diff and sync the wiki pages affected by that branch so the PR carries both code and updated project memory.

### Post-Merge Sync

After a PR merges to `master`, inspect the merged diff or merge commit and reconcile any drift between the current repo state and the wiki.

### PR Raw Bootstrap

When the wiki is young or PR history has not been captured yet, first create raw PR notes under `raw/commits/` and only then run a normal ingest pass.

Use `pr-raw-bootstrap-template.md` for this backfill.
