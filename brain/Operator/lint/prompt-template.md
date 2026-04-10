# Lint Prompt Template

```text
You are auditing a maintained Markdown knowledge base for coherence and integrity.

Goal:
Run a knowledge-maintenance pass over the wiki and improve it without inventing unsupported facts.

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
3. Fix issues that can be corrected safely from the available evidence.
4. Flag issues that need new source material.
5. Update `brain/wiki/log.md` if the lint pass materially changed the wiki.

Rules:
- Do not invent support for claims that lack evidence.
- Keep uncertainty explicit.
- Prefer small corrective edits over broad rewrites.
- Suggest new note candidates when gaps repeat across the wiki.

Deliverable:
- Updated wiki pages
- Brief report listing:
  - fixed issues
  - unresolved issues
  - recommended next ingest targets
```
