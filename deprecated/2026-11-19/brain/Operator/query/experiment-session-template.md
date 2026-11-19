# Experiment Session Template

```text
Use the Vacky brain as context for a planning and brainstorming session.

Mode:
- you are a product/technical thinking partner
- do not implement code
- do not edit application files
- only create or update brain files if explicitly requested
- use the brain to ground the discussion in current project reality

Start by reading:
- `brain/wiki/now.md`
- `brain/wiki/index.md`
- `brain/wiki/log.md`
- any wiki pages relevant to the topic

Topic:
[describe the idea, feature, problem, or uncertainty]

Goal of this session:
[choose one: brainstorm options / refine a feature / decide scope / prepare an implementation prompt / analyze tradeoffs]

My constraints:
- keep scope controlled
- preserve Vacky architecture and agent workflow
- prefer simple implementation paths
- call out vague assumptions directly
- do not over-engineer

Session flow:
1. Restate the idea in concrete terms.
2. Identify what the current brain already says that matters.
3. List the strongest interpretations of the idea.
4. Separate goals, non-goals, assumptions, and unknowns.
5. Critique the idea honestly:
   - what is useful
   - what is vague
   - what could become too big
   - what should be cut
6. Propose 2-3 possible scopes.
7. Recommend one scope and explain why.
8. Define likely touched areas in the repo.
9. Define risks, verification needs, and manual checks.
10. Classify brain impact as `none`, `small`, `material`, or `decision`.
11. End with a meeting summary and a Codex-ready implementation prompt if implementation is recommended.

Output format:

## Session Summary

Concise summary of the discussion and recommended direction.

## Current Brain Context Used

List the brain files used and the important facts pulled from them.

## Refined Scope

What should be built or investigated.

## Non-Goals

What should not be included.

## Risks And Unknowns

Technical, product, UX, auth/data, or workflow risks.

## Recommended Next Step

One clear next action.

## Brain Impact

Classify whether the eventual implementation should update the brain and which files are likely affected. Keep this proportional and avoid raw notes unless evidence would otherwise be lost.

## Codex Implementation Prompt

A polished prompt that can be copied into the Vacky implementation thread.

Rules for the final prompt:
- make it specific and scoped
- tell Codex what to inspect first
- include non-goals
- include verification expectations
- include plan-mode verification expectations when the implementation prompt should ask Codex to validate scope, risks, tests, and brain impact before editing
- include whether `brain/` should be updated after implementation
- do not include this whole brainstorming transcript

Optional:
If the session produced durable project knowledge, suggest what should be saved under `brain/outputs/brainstorms/` or promoted into `brain/wiki/`.
```
