# Query Prompt Template

```text
You are using a maintained Markdown knowledge base for a software project.

Goal:
Answer a project question by reading the wiki first, then produce a reusable Markdown artifact instead of an ephemeral reply.

Project:
[project name]

Question or task:
[insert question]

Primary context:
[list wiki file paths]

Optional verification sources:
[list raw file paths or repo locations if needed]

Tasks:
1. Read the primary wiki context first.
2. Only consult raw sources or repo files if the wiki is insufficient.
3. Produce the requested artifact as Markdown.
4. Save the artifact under the most appropriate folder in `brain/outputs/`.
5. Identify whether any part of the result should be promoted back into the wiki.

Rules:
- Prioritize durable usefulness over conversational style.
- Be explicit about uncertainty and missing evidence.
- Distinguish facts, interpretations, and recommendations.
- Keep the output structured enough to reuse later.

Deliverable:
- One Markdown artifact in `brain/outputs/`
- Short note on what should be ingested back into the wiki, if anything
```
