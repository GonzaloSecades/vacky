# Operator

`Operator/` contains the reusable procedures for maintaining the brain.

The three core operations are:

- `ingest`: promote raw material into the wiki
- `query`: answer questions and generate useful outputs
- `lint`: audit and clean the knowledge base

These workflows are abstract on purpose. They should remain usable even as Vacky evolves or GraphyBrain becomes more general.

## Recommended Cadence

- run `ingest` after meaningful coding sessions or major discoveries
- run `ingest` before opening or updating a PR when the branch changed project understanding
- run `ingest` again after merge when review-driven edits or squash merges may have left the wiki stale
- run `query` whenever you need a plan, brief, brainstorm, or project explanation
- run `lint` on a regular basis to keep the wiki coherent
