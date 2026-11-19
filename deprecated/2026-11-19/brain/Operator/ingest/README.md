# Ingest Operator

Use ingest when you have new source material and want to update the maintained wiki.

Ingest is a promotion step. It turns evidence into durable project knowledge. It should not turn every implementation detail, PR summary, or brainstorming note into wiki content.

## Inputs

- one or more files from `raw/`
- optionally, direct repo context if the source depends on current code state

## Outputs

- updated pages under `wiki/`
- appended event in `wiki/log.md`
- refreshed `wiki/now.md` when current status changed
- optional new raw evidence only when provenance would otherwise be lost

## Brain Impact Gate

Classify the source before editing:

- `none`: no durable project knowledge; do not update the brain
- `small`: one concise wiki/log/risk update may be enough
- `material`: update affected wiki pages, `wiki/log.md`, and `wiki/now.md` when current state changed
- `decision`: create or update a decision note and link it from the relevant wiki page

Use this gate to avoid the two-PR habit. Meaningful branch-level brain updates should travel with the implementation PR. Post-merge ingest is only for drift, missed evidence, direct commits, or final-state reconciliation.

## Ingest Rules

- do not treat raw notes as already-trusted truth
- preserve uncertainty where the source is incomplete
- update existing pages before creating duplicates
- connect new knowledge through links, not isolated summaries
- distinguish sourced facts from inferred conclusions
- keep the update proportional to the source
- prefer final code and verified behavior over intent stated in a prompt or PR body
- avoid creating raw PR notes unless the PR is a milestone, high-risk, review-heavy, or needed for post-merge repair

## Typical Ingest Targets

- current state changes
- architecture updates
- new feature understanding
- decisions and rationale
- experiments and lessons
- risk status and verification evidence

## What Not To Ingest

- ordinary implementation summaries already clear from code and PR body
- speculative ideas that are not accepted direction
- raw brainstorms that have not become decisions
- repeated risk descriptions that belong in `wiki/risks.md`
- full transcripts or long copied PR descriptions
- generated outputs that have not been promoted to durable truth

## Common Ingest Modes

### Session Ingest

Promote notes from `raw/sessions/` into the wiki after meaningful development work.

Use when a session produced durable understanding, not just task progress.

### PR Prep Sync

Before opening or updating a PR, inspect the branch diff and sync the wiki pages affected by that branch so the PR carries both code and updated project memory.

This is the default place to keep the brain current. Keep the diff small: one relevant wiki page plus `wiki/log.md`, and `wiki/now.md` only when current state changed, is often enough.

### Post-Merge Sync

After a PR merges to `master`, inspect the merged diff or merge commit and reconcile any drift between the current repo state and the wiki.

If the implementation PR already carried accurate brain updates and review did not change durable truth, post-merge sync can be a no-op.

### PR Raw Bootstrap

When the wiki is young or PR history has not been captured yet, first create raw PR notes under `raw/commits/` and only then run a normal ingest pass.

Use `pr-raw-bootstrap-template.md` for this backfill.

Do not use PR raw bootstrap as a default for every future PR.
