# Wiki Maintenance Workflow

Use this when Vacky's project memory needs to stay aligned with real work.

## Goal

Keep `brain/` as a maintained, source-backed project memory instead of letting implementation context stay trapped in ephemeral chats, diffs, or review threads.

## When To Use It

- after a meaningful coding session
- before opening or updating a PR for non-trivial work
- after PR review changed the branch in a material way
- after a PR merged to `master` and the final merged state may have drifted from the wiki

## What Counts As A Meaningful Change

- user-visible behavior changed
- architecture or boundaries changed
- a rationale or tradeoff became important
- a workflow or prompt pattern changed
- the project's risks, current state, or next actions changed

## Minimum Sync Set

When the change matters, update:

- the relevant pages under `brain/wiki/`
- `brain/wiki/log.md`
- `brain/wiki/now.md` if current state, risks, or next actions changed

Update `brain/raw/` when preserving evidence, reasoning, or failed paths will help future work.

## Modes

### 1. Session Ingest

- start from raw notes, repo observations, or meaningful commits
- promote durable understanding into the wiki
- keep the raw evidence intact

### 2. PR Prep Sync

- inspect the branch diff against `master`
- update the wiki pages affected by the branch
- make sure the branch carries its own knowledge updates before review
- if useful, generate a reusable brief under `brain/outputs/briefs/`

### 3. Post-Merge Sync

- inspect the merged diff, merge commit, or final `master` state
- reconcile drift introduced by review edits, squash merges, or external follow-up changes
- repair stale wiki pages rather than rewriting the entire brain

## Practical Rule

Branch-level brain updates are the default.

Post-merge sync is the safety net when the final merged state no longer matches what the branch-level wiki captured.

## Operational Skill Commands

When conversation context suggests brain work, tell the user exactly what to run instead of giving a vague reminder:

- Ideation: `Run $vacky-brain idea with prompt: "[idea, questions, desired artifact]"`.
- Planning: `Run $vacky-brain plan with prompt: "[change, constraints, non-goals, verification]"`.
- Evidence: `Run $vacky-brain raw with prompt: "[evidence and why future agents need it]"`.
- PR prep or feature done: `Run $vacky-brain sync with prompt: "[what changed and what should be synced]"`.
- Post-merge drift: `Run $vacky-brain post-merge with prompt: "PR #[number] merged; compare final master with brain/wiki"`.
- Cleanup: `Run $vacky-brain lint with prompt: "[scope to audit]"`.
- Graph refresh: `Run $vacky-brain graph with prompt: "[brain/skill/code changes to refresh]"`.

After meaningful changes to `brain/`, `.agents/skills/`, `.codex/`, architecture notes, or code, suggest `$graphify . --update` so `graphify-out/` stays aligned. Use `$graphify . --mode deep --wiki` when the knowledge structure changed materially.

## Prompt Starters

PR prep sync:

```text
Before I open or update a PR for this branch, inspect the diff against master and sync the Vacky brain.

Update only the relevant files under `brain/wiki/`, append a concise note to `brain/wiki/log.md`, and refresh `brain/wiki/now.md` if the current state changed.
```

Post-merge sync:

```text
PR #[number] was merged to master. Run a post-merge brain sync for Vacky.

Inspect the merged diff or merge commit, compare it against the current `brain/wiki/`, and update any stale architecture, feature, decision, workflow, or current-state notes.
```
