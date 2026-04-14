# Risks

This is the canonical risk, follow-up, and verification status register for the Vacky brain.

Keep `now.md` focused on priorities. Keep recurring risk detail here.

## Status Values

- `open`: known issue or unverified risk
- `verifying`: likely okay, but needs evidence
- `accepted`: known downside intentionally carried for now
- `mitigated`: mechanism exists, but still needs commit/review or follow-up evidence
- `resolved`: source-backed evidence says the risk is closed

## Current Register

| ID | Status | Area | Risk | Next Action | Resolved When | Evidence |
|---|---|---|---|---|---|---|
| RISK-001 | open | Data/API | `/api/trips` reverse-geocodes every stored location on each request, creating latency, cost, and rate-limit exposure. | Decide whether to persist country/address on write, add a cache, or narrow globe data. | `/api/trips` no longer calls Google for every stored location on every read, or a deliberate cost budget/cache decision exists. | [PR #3 raw note](../raw/commits/2026-04-07-pr-3-trip-dashboard-location-management.md), [Data And Auth](architecture/data-and-auth.md) |
| RISK-002 | open | Verification | Manual browser and hostile-client checks are missing for itinerary create/edit, Places autocomplete, planner maps, same-day ordering, globe, settings, trip creation, and unauthorized mutations. | Add verification notes under `raw/verification/` and update this register. | Browser/manual notes exist and close or split each checked behavior. | [itinerary verification note](../raw/2026-04-11-itinerary-planner/verification.md), [verification sources](../raw/verification/README.md) |
| RISK-003 | open | UI/Maps | PR #8 review flagged planner map height classes `h-90`, `md:h-105`, and `lg:h-115` as potentially invalid Tailwind utilities. | Verify generated CSS/browser rendering or replace with explicit supported heights. | Browser/CSS evidence shows the map has stable height, or the classes are replaced. | [PR #8 raw note](../raw/commits/2026-04-11-pr-8-itinerary-planner.md) |
| RISK-004 | open | Auth UX | Protected routes do not have uniform route-level behavior; data boundaries are stronger than page redirect/message consistency. | Decide protected-route UX policy and apply it to `/trips`, `/trips/new`, `/settings`, `/globe`, and itinerary routes. | A decision or implementation makes route-level behavior intentional and documented. | [Data And Auth](architecture/data-and-auth.md), [PR #2 raw note](../raw/commits/2026-03-31-pr-2-trip-creation-uploadthing.md) |
| RISK-005 | open | UI Assets | `/default-avatar.png` is referenced but missing from `public/`. | Add the asset or replace image fallback logic with a generated/initials fallback. | No runtime path references a missing fallback asset. | [PR #1 raw note](../raw/commits/2026-03-31-pr-1-init-setup-auth-navbar-db.md), [Current Surface](features/current-surface.md) |
| RISK-006 | open | Data/Auth | `app/db.ts` uses `process.env.DATABASE_URL!` without a clear fail-fast runtime error. | Add an explicit guard with a useful error message before creating the Neon adapter. | Missing `DATABASE_URL` fails with a clear local error. | [PR #1 raw note](../raw/commits/2026-03-31-pr-1-init-setup-auth-navbar-db.md), [Data And Auth](architecture/data-and-auth.md) |
| RISK-007 | open | Accessibility | `GlobeCanvasLoader` is visual-only and lacks accessible loading status. | Add `role="status"`, `aria-live`, or screen-reader text, then browser/accessibility check. | Loader state is announced accessibly or no longer needed. | [PR #6 raw note](../raw/commits/2026-04-08-pr-6-globe-loading-three-timer-compat.md) |
| RISK-008 | verifying | UI/Tailwind | `app/settings/page.tsx` uses `size-18`; PR review questioned whether it is deterministic in this Tailwind setup. | Verify Tailwind output or replace with explicit supported sizing. | CSS/build evidence proves it works, or class is replaced. | [PR #6 raw note](../raw/commits/2026-04-08-pr-6-globe-loading-three-timer-compat.md) |
| RISK-009 | mitigated | Workflow | Obsidian graph/workspace state leaked into PR #8 and later commits, creating editor-state churn. | Keep workspace/graph ignored and untracked; do not treat them as product or architecture evidence. | Ignore/untracking change is committed and future PRs do not include workspace/graph churn. | [PR #8 raw note](../raw/commits/2026-04-11-pr-8-itinerary-planner.md), [Agent Workflow](agents/workflow.md) |
| RISK-010 | open | Product Direction | Memory-first is promising but not accepted product strategy; current implementation remains planning-first. | Run a product decision session and create a decision record if accepted. | Memory-first is accepted/rejected/deferred in `wiki/decisions/`, with alternatives and accepted downside. | [Product Direction](product/direction.md), [memory-first experiment](experiments/2026-04-12-memory-first-direction.md) |
| RISK-011 | accepted | Data Model | `Trip.images` exists without a user-facing image-management flow. | Leave as known schema surface unless image management becomes active scope. | Field is either surfaced, removed, or documented as reserved. | [Data And Auth](architecture/data-and-auth.md), [Current Surface](features/current-surface.md) |
| RISK-012 | open | Product/Polish | Landing-page metadata and some branding copy are stale relative to the implemented product. | Update metadata/copy as a small polish task. | Landing page and metadata match Vacky naming and current product scope. | [Current Surface](features/current-surface.md), [current-state brief](../outputs/briefs/2026-04-12-current-state-and-next-ideas.md) |

## Maintenance Rules

- Do not duplicate this table across other pages.
- `now.md` should list only the highest-priority risk IDs.
- When a fix lands, add or link verification evidence before marking a risk `resolved`.
- When a risk becomes an accepted tradeoff, link the decision or source that accepts it.
