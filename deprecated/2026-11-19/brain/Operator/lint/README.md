# Lint Operator

Use lint when the brain needs a maintenance pass.

## Goal

Find and reduce knowledge drift, duplication, missing links, stale claims, and weak provenance.

Lint is also the de-bloating operator. Use it when the brain starts mirroring PR descriptions, raw notes, brainstorms, or outputs instead of preserving durable project memory.

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
- recurring risks duplicated across pages instead of centralized in `wiki/risks.md`
- core wiki pages that make durable claims without direct primary-evidence links
- raw notes that are being treated as accepted truth without an ingest step
- generated outputs that should either be indexed, promoted, or explicitly left as non-canonical
- PR-by-PR timeline detail that belongs in raw provenance instead of core wiki pages
- repeated current-state claims that should collapse into `wiki/now.md` or one feature/architecture page

## Bloat Review

Ask these questions before keeping a brain file or paragraph:

- Will this help a future implementation or review?
- Is this already clear from code, git history, or the PR body?
- Is this durable truth, or just progress narration?
- Should this be one sentence in `wiki/log.md` instead of a new page?
- Should this remain in `raw/` instead of being promoted?
- Can this be linked from one canonical page instead of repeated?

Prefer deletion, consolidation, or stronger links over adding more pages.
