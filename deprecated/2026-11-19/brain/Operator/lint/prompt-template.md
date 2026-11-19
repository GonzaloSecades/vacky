# Lint Prompt Template

```text
You are auditing a maintained Markdown knowledge base for coherence and integrity.

Goal:
Run a knowledge-maintenance pass over the wiki and improve it without inventing unsupported facts.

Secondary goal:
Reduce brain bloat by consolidating duplicated status, pruning over-detailed progress narration, and keeping raw evidence separate from durable wiki truth.

Project:
Vacky

Scope:
[folders or files to audit]

Core pages:
- brain/wiki/index.md
- brain/wiki/now.md
- brain/wiki/log.md

Tasks:
1. Read the relevant wiki pages.
2. Find duplication, contradictions, stale claims, weak provenance, and missing links.
3. Find bloat: repeated PR summaries, speculative notes promoted as truth, duplicated risk status, and pages that should be links or raw evidence instead.
4. Fix issues that can be corrected safely from the available evidence.
5. Consolidate or shorten content when one canonical page can carry the durable claim.
6. Flag issues that need new source material.
7. Update `brain/wiki/log.md` if the lint pass materially changed the wiki.

Rules:
- Do not invent support for claims that lack evidence.
- Keep uncertainty explicit.
- Prefer small corrective edits over broad rewrites.
- Suggest new note candidates when gaps repeat across the wiki.
- Prefer removing duplication over adding new files.
- Do not delete raw evidence just because it is not promoted.
- Do not turn lint into a feature-planning session; produce follow-up candidates separately.

Deliverable:
- Updated wiki pages
- Brief report listing:
  - fixed issues
  - unresolved issues
  - bloat reduced or intentionally left
  - recommended next ingest targets
```
