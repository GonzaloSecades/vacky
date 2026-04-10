# Query Operator

Use query when you want the brain to produce an answer or artifact from the maintained knowledge base.

## Inputs

- a question, objective, or requested artifact
- the relevant wiki pages
- raw sources only when the wiki is insufficient or verification is needed

## Outputs

- a Markdown artifact under `outputs/`
- optionally, wiki updates if the result creates durable knowledge

## Query Rules

- start from the wiki, not from raw sources by default
- read raw sources only when the wiki is missing evidence or needs verification
- generate artifacts that are reusable, not disposable chat answers
- if the result creates durable knowledge, ingest it back into the wiki

## Good Query Outputs

- implementation plans
- roadmap options
- session resume briefs
- architecture explainers
- brainstorming notes
- feature gap analysis

## Reusable Templates

- `prompt-template.md`: general query-to-output workflow
- `experiment-session-template.md`: brainstorming and planning session that ends with a Codex-ready implementation prompt
