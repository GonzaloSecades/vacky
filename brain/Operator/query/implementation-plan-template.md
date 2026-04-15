# Implementation Plan Template

```text
Use the Vacky brain to create an implementation plan and a Codex-ready implementation prompt.

Mode:
- plan only
- do not implement code
- do not edit application files
- create or update a brain output only if explicitly requested
- use the brain to ground the plan in current project reality

Start by reading:
- `brain/wiki/now.md`
- `brain/wiki/index.md`
- `brain/wiki/risks.md`
- `brain/wiki/log.md`
- any wiki pages relevant to the requested change

Requested change:
[describe the implementation goal]

Constraints:
- keep scope controlled
- preserve Vacky architecture and agent workflow
- default to server components unless client behavior is required
- treat auth, Prisma, UploadThing, maps, geocoding, route handlers, and server/client boundaries as high-risk
- avoid creating a second brain-only PR unless post-merge drift makes it necessary
- avoid brain bloat

Plan tasks:
1. Restate the requested change in concrete terms.
2. Summarize the current brain context that matters.
3. Define goals and non-goals.
4. Identify likely touched files or repo areas.
5. Identify frontend, backend, and reviewer ownership needs.
6. Identify risks, unknowns, and manual checks.
7. Classify brain impact as `none`, `small`, `material`, or `decision`.
8. Define the minimum brain update expected for the implementation PR.
9. Define verification expectations:
   - required command checks
   - when `npm run build` is needed
   - when Prisma generate is needed
   - when browser or Playwright checks are needed
   - when reviewer/QA pass is needed
10. Produce a final implementation prompt.

Output format:

## Plan Summary

Brief explanation of the recommended implementation shape.

## Current Brain Context Used

List the brain files used and the facts that mattered.

## Scope

What should be implemented.

## Non-Goals

What should stay out of scope.

## Likely Touched Areas

Files, folders, or boundaries likely involved.

## Risks And Verification

Risk areas and the verification expected before PR-ready work.

## Brain Impact

Impact classification and the minimum brain files likely needed. Say explicitly when no brain update is expected.

## Codex Implementation Prompt

Write a prompt that can be copied into an implementation thread.

The prompt must tell Codex to:
- inspect relevant files before editing
- use plan-mode verification before implementation when scope, risk, tests, or brain impact are uncertain
- keep edits scoped
- update brain files only according to the impact classification
- avoid creating raw notes unless evidence would otherwise be lost
- run the specified verification
- summarize remaining risks and manual checks

Rules:
- Do not over-plan beyond the requested change.
- Do not promote speculative ideas into wiki truth.
- Keep the final prompt specific enough that implementation can start without another discovery session.
```
