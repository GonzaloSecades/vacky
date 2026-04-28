# Operator

`Operator/` contains the reusable procedures for maintaining the brain.

The three core operations are:

- `ingest`: promote raw material into the wiki
- `query`: answer questions and generate useful outputs
- `lint`: audit and clean the knowledge base

These workflows are abstract on purpose. They should remain usable even as Vacky evolves or GraphyBrain becomes more general.

## Operating Model

Use the brain as a source-backed memory, not as a transcript archive.

- `query` is for thinking before implementation: plans, tradeoffs, experiments, brainstorms, and implementation prompts.
- `ingest` is for promoting durable facts into `wiki/` after there is evidence.
- `lint` is for reducing drift, duplication, weak evidence, stale claims, and bloat.

For the SpacetimeDB migration spike, start query work from `Operator/query/spacetimedb-vacky-guide.md` and the repo-local `.agents/skills/spacetimedb-typescript-vacky/` source pack instead of re-discovering official docs from scratch.

The normal implementation path should not require two pull requests. When a feature materially changes Vacky, update the relevant brain pages in the same implementation PR. A separate post-merge brain PR is a repair path, not the default.

## Brain Impact Gate

Before adding brain files, classify the work:

- `none`: typo, formatting, small cleanup, or implementation detail with no durable project knowledge
- `small`: minor user-visible behavior, risk status, verification result, or workflow note
- `material`: feature behavior, architecture, data model, auth boundary, external API, workflow, or project risk changed
- `decision`: a choice future agents should not re-litigate

Default actions:

- `none`: no brain changes
- `small`: update `wiki/log.md` or one directly affected page only if useful
- `material`: update the relevant wiki page, `wiki/log.md`, and `wiki/now.md` only when current state changed
- `decision`: create or update a decision note, then link it from the relevant wiki page

Use `raw/` only when preserving evidence will help future work: non-obvious rationale, failed paths, review or manual verification evidence, external API behavior, risky auth/data/geocoding/upload behavior, or unresolved tradeoffs.

## Recommended Cadence

- run `query` before implementation when you need a plan, experiment, brainstorm, future-feature discovery, architecture brief, or Codex-ready implementation prompt
- run `ingest` before opening or updating a PR when the branch changed project understanding
- run `ingest` during review only if review materially changed behavior, risk, rationale, or verification truth
- run a post-merge ingest only when the final merged state drifted from the branch-level brain update
- run `lint` periodically, or before/after large brain updates, to keep the wiki coherent and small

## Pull Request Workflow

Preferred path:

1. Start the implementation branch.
2. Classify brain impact with the gate above.
3. Keep raw evidence only when it has future value.
4. Before PR, update the minimal relevant brain files in the same branch.
5. During review, update the same brain files only when review changes durable truth.
6. After merge, do a lightweight drift check.
7. Create a separate brain-sync PR only if the merged state and brain are inconsistent.

Separate brain PRs are appropriate for missed brain syncs, review-driven drift after merge, direct `master` commits, squash/merge uncertainty, or periodic brain cleanup.

## Bloat Controls

- Do not create a raw PR note for every PR by default.
- Do not duplicate a PR description in `raw/`.
- Do not promote brainstorms, outputs, or hypotheses into `wiki/` until they become accepted project truth.
- Prefer editing one existing wiki page over creating a new page.
- A normal feature PR should usually touch one to four brain files.
- If a brain update feels large, run `lint` and cut duplication before merging it.
