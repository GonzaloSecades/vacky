# Vacky Brain

This `brain/` directory is the first working instance of the GraphyBrain idea.

It follows a simple split:

- `raw/`: immutable source material gathered from the project
- `wiki/`: the compiled knowledge base maintained over time
- `outputs/`: generated plans, brainstorms, briefs, and session artifacts
- `Operator/`: reusable operating procedures for ingest, query, and lint

The goal is not to mirror the repo file-by-file. The goal is to preserve the parts that are expensive to reconstruct:

- current state
- rationale
- architecture
- feature history
- open questions
- next steps

## Starting From Zero

1. Open this `brain/` folder as an Obsidian vault.
2. Read `wiki/now.md`, `wiki/index.md`, and the latest entries in `wiki/log.md`.
3. If you have new raw material from the coding session, place it under `raw/`.
4. Run the `Operator/ingest` workflow to promote durable knowledge into `wiki/`.
5. Use `Operator/query` to produce plans, brainstorms, or status summaries in `outputs/`.
6. Run `Operator/lint` regularly to keep the knowledge base coherent.

## PR And Merge Cadence

- Treat meaningful wiki updates as part of the same feature branch as the code change.
- Before opening or updating a PR, sync the affected `wiki/` pages and append to `wiki/log.md`.
- If PR review materially changes the branch, sync the brain again before the branch is considered final.
- After a PR merges to `master`, run a post-merge sync if the final merged state may have drifted from the wiki.

## Operating Loop

For each meaningful development session:

1. Start from `wiki/now.md`.
2. Work in the codebase.
3. Capture raw evidence in `raw/`.
4. Update the wiki through an ingest pass.
5. Save any substantial plan, brief, or brainstorm under `outputs/`.
6. End by refreshing `wiki/now.md` and appending to `wiki/log.md`.

## Folder Guide

- `raw/README.md`: how to capture source material
- `wiki/index.md`: top-level map of the brain
- `wiki/now.md`: current project state and next actions
- `wiki/log.md`: append-only activity log
- `Operator/README.md`: operator overview

## Rules

- Raw sources are append-only. Do not rewrite them casually.
- The wiki is the maintained interpretation layer.
- Every durable claim should be traceable to repo state, raw notes, or an explicit inference.
- Hypotheses should be labeled as hypotheses.
- Avoid duplicate pages. Update existing pages when the concept already exists.
