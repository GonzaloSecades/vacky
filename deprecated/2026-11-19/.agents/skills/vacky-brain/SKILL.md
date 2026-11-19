---
name: vacky-brain
description: Operate Vacky's project brain and graphify knowledge loop. Use when a Vacky conversation produces ideas, plans, decisions, feature-completion context, PR-prep brain sync needs, post-merge drift checks, raw evidence, canonical wiki updates, brain linting, or graphify refresh suggestions; also use when an agent should suggest an exact brain command during an ongoing conversation.
---

# Vacky Brain

## Overview

Use this skill to keep `brain/` and `graphify-out/` aligned with real Vacky work. The skill gives agents explicit commands to suggest at the right moment instead of relying on memory.

## Command Picker

Use the smallest command that matches the moment:

- `idea`: capture an ongoing product, UX, architecture, or implementation idea as a non-canonical output.
- `plan`: create a brain-grounded implementation plan and a Codex-ready implementation prompt.
- `raw`: preserve evidence that future work needs, such as failed paths, manual verification, risky external API behavior, or unresolved tradeoffs.
- `sync`: before PR or after a meaningful feature is done, update the smallest canonical wiki set.
- `post-merge`: after merge, check whether final `master` drifted from branch-level brain updates.
- `lint`: audit the brain for stale claims, duplication, weak provenance, bloat, and missing links.
- `graph`: refresh or query graphify so generated graph knowledge reflects current code, brain, and skills.

## Suggested Invocations

During ideation, suggest:

```text
Run $vacky-brain idea with prompt: "[summarize the idea, open questions, and desired artifact]"
```

Before implementation when scope is not obvious, suggest:

```text
Run $vacky-brain plan with prompt: "[requested change, constraints, non-goals, and verification expectations]"
```

When a feature or meaningful task is done before PR, suggest:

```text
Run $vacky-brain sync with prompt: "Feature/task completed: [what changed]. Inspect the branch diff against master, classify brain impact, update only affected brain/wiki pages, append brain/wiki/log.md, refresh brain/wiki/now.md if current state changed, and say whether graphify should be refreshed."
```

When evidence should be preserved but not promoted yet, suggest:

```text
Run $vacky-brain raw with prompt: "[evidence to preserve, why future agents need it, and whether it is verification, session context, external behavior, or an unresolved tradeoff]"
```

After a merge, suggest:

```text
Run $vacky-brain post-merge with prompt: "PR #[number] merged. Compare final master state with brain/wiki and repair only drift."
```

After brain, skill, architecture, or workflow files change, suggest:

```text
Run $vacky-brain graph with prompt: "Refresh graphify after the latest brain/skill/code changes, then query whether brain and graphify agree on the affected concepts."
```

## Execution Rules

1. Start from `AGENTS.md`, `brain/README.md`, `brain/wiki/now.md`, `brain/wiki/index.md`, and `brain/wiki/risks.md`.
2. For `idea` and `plan`, use `brain/Operator/query/README.md` and the matching template under `brain/Operator/query/`.
3. For `sync`, use `brain/Operator/ingest/README.md` and `brain/Operator/ingest/pr-sync-template.md`.
4. For `post-merge`, use `brain/Operator/ingest/merge-sync-template.md`.
5. For `lint`, use `brain/Operator/lint/README.md` and `brain/Operator/lint/prompt-template.md`.
6. For `graph`, use `$graphify . --update` for ordinary refreshes, `$graphify . --mode deep --wiki` for a deeper rebuild, and `graphify query "..."` when `graphify-out/graph.json` already exists and the user asks a knowledge question.
7. Keep `brain/raw/` for evidence, `brain/wiki/` for canonical truth, and `brain/outputs/` for generated artifacts that are useful but not automatically canonical.
8. Do not create raw PR notes by default. Prefer the smallest useful wiki update plus `brain/wiki/log.md`.
9. Do not promote brainstorms, generated outputs, or hypotheses into canonical wiki pages until they become accepted project truth.

## Helper Script

Use the helper to print copy-ready prompts:

```bash
python3 .agents/skills/vacky-brain/scripts/vacky_brain_prompt.py idea --prompt "Explore a trip memories timeline."
python3 .agents/skills/vacky-brain/scripts/vacky_brain_prompt.py sync --prompt "Trip deletion feature is complete."
python3 .agents/skills/vacky-brain/scripts/vacky_brain_prompt.py graph --prompt "Brain workflow docs changed."
```

The script does not edit files. It only prints the recommended skill invocation and operating checklist.
