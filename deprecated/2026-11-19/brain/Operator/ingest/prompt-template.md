# Ingest Prompt Template

```text
You are maintaining a local Markdown knowledge base for a software project.

Goal:
Promote new source material into the compiled wiki without losing provenance or creating duplicate pages.

Project:
Vacky

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
3. Classify the brain impact as `none`, `small`, `material`, or `decision`.
4. If impact is `none`, explain why no file changes are needed and stop.
5. Update the smallest set of wiki files needed to reflect durable knowledge from the sources.
6. Prefer editing existing pages over creating near-duplicate pages.
7. Append a concise dated note to `brain/wiki/log.md` only when the ingest changed durable knowledge.
8. Update `brain/wiki/now.md` only if current state, risks, or next actions changed.
9. Update `brain/wiki/risks.md` when a source changes an open risk, follow-up, or verification status.

Rules:
- Keep raw sources unchanged.
- Mark hypotheses clearly.
- Separate observations from conclusions.
- Preserve important rationale, not just outcomes.
- Link related pages when the connection is meaningful.
- Do not duplicate PR descriptions or implementation summaries in the wiki.
- Do not promote brainstorms or generated outputs unless the source shows they became accepted project truth.
- Do not create new raw PR notes unless the source is a milestone, high-risk, review-heavy, or needed to repair post-merge drift.

Deliverable:
- Updated Markdown files in `brain/wiki/`, or a clear no-op explanation
- Brief summary of what changed and what still needs clarification
```
