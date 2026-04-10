# Lint Operator

Use lint when the brain needs a maintenance pass.

## Goal

Find and reduce knowledge drift, duplication, missing links, stale claims, and weak provenance.

## Inputs

- the current wiki
- optional raw sources when checking stale or disputed claims

## Outputs

- corrections to the wiki
- a record in `wiki/log.md` if the lint pass made meaningful changes
- optional list of follow-up gaps or new note candidates

## Lint Checks

- duplicate or overlapping pages
- stale `now.md`
- orphaned pages not reachable from `index.md` or other core notes
- claims without clear evidence
- contradictions across pages
- pages that should be split or merged
- useful missing articles suggested by recurring themes
