# Ingest Prompt Template

```text
You are maintaining a local Markdown knowledge base for a software project.

Goal:
Promote new source material into the compiled wiki without losing provenance or creating duplicate pages.

Project:
[project name]

Source material to ingest:
[list raw file paths]

Optional diff context:
[branch diff, PR diff, or merged commit if relevant]

Current wiki entry points:
- brain/wiki/now.md
- brain/wiki/index.md
- brain/wiki/log.md

Tasks:
1. Read the listed raw sources.
2. Read the existing wiki pages that are most relevant.
3. Update the wiki to reflect durable knowledge from the sources.
4. Prefer editing existing pages over creating near-duplicate pages.
5. Append a concise dated note to `brain/wiki/log.md`.
6. Update `brain/wiki/now.md` if the current state, risks, or next actions changed.

Rules:
- Keep raw sources unchanged.
- Mark hypotheses clearly.
- Separate observations from conclusions.
- Preserve important rationale, not just outcomes.
- Link related pages when the connection is meaningful.

Deliverable:
- Updated Markdown files in `brain/wiki/`
- Brief summary of what changed and what still needs clarification
```
