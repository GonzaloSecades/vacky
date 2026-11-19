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
- Codex-ready implementation prompts
- experiment plans and future-feature discovery notes

## Planning And Prompting

Use query when the operator wants to command a plan before implementation. The ideal result is often not code; it is a precise implementation prompt that can be handed to Codex in a separate implementation thread.

A good planning query should ask for:

- current brain context used
- goals and non-goals
- assumptions and unknowns
- likely touched repo areas
- frontend/backend/reviewer ownership expectations
- risks and verification requirements
- brain impact classification
- a final implementation prompt

The final implementation prompt should include verification expectations. If the implementation will use planning mode, say that plan-mode verification should be included in the generated prompt so Codex checks scope, risk, tests, and brain impact before editing.

## Experiments And Future Features

Use query for experiments, brainstorming, and future-feature discovery when the goal is to explore options without committing project truth.

Outputs from these sessions usually belong under:

- `brain/outputs/brainstorms/`
- `brain/outputs/briefs/`
- `brain/wiki/experiments/` only after the experiment becomes durable enough to track

Do not promote an experiment into core wiki pages until it is accepted direction or has produced evidence that changes current understanding.

## Reusable Templates

- `prompt-template.md`: general query-to-output workflow
- `implementation-plan-template.md`: plan-mode workflow that ends with a Codex-ready implementation prompt
- `experiment-session-template.md`: brainstorming and planning session that ends with a Codex-ready implementation prompt
