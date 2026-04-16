---
name: grill-me
description: Use when the user wants to be challenged, interrogated, or stress-tested about a plan, design, architecture, product direction, or implementation approach before committing to it. Trigger when the user says "grill me", asks for relentless questioning, or asks Codex to pressure-test Vacky plans against the repo and brain.
---

# Grill Me

Stress-test the user's plan until assumptions, risks, decisions, and evidence gaps are clear.

## Workflow

1. If the topic is Vacky, inspect the repo and brain before questioning:
   - `AGENTS.md`
   - `brain/wiki/now.md`
   - `brain/wiki/risks.md`
   - the relevant feature, architecture, product, or decision pages
   - any directly relevant `brain/raw/` evidence or `brain/outputs/` artifacts
2. If the topic is the trip photos or memory-first direction, read:
   - `brain/wiki/product/direction.md`
   - `brain/outputs/brainstorms/2026-04-15-trip-photos-tab-future-implementation.md`
3. Answer codebase-discoverable questions by inspecting files instead of asking the user.
4. Walk down the decision tree one branch at a time. Resolve dependencies before moving on.
5. Keep pressure on the highest-risk assumptions: ownership, data model, auth boundaries, privacy, UploadThing, Prisma migrations, Google APIs, verification, and brain impact.
6. Separate blockers from preferences. Make the user decide only where evidence or product judgment is actually needed.

## Output Style

- Ask concise, pointed questions.
- Group related questions when it reduces back-and-forth, but do not dump an exhaustive checklist.
- When the repo or brain contradicts the plan, state the contradiction directly and cite the relevant file.
- End each round with the next unresolved decision or the weakest remaining assumption.
