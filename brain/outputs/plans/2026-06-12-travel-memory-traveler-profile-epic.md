# Epic: Travel Memory & Traveler Profile

- **Status:** accepted-direction, pending decision record (Phase 0 closes RISK-010)
- **Created:** 2026-06-12
- **Supersedes:** `brain/outputs/plans/2026-06-11-completed-past-trips-memories-module-plan.xml`
- **Downstream consumer:** AI-assisted future trip planning (separate epic; builds on this epic's frozen profile contract)

## Purpose

Turn completed trips into a clean, structured behavioral dataset and a deterministic,
correctable traveler profile — the foundation the AI planning feature will consume.
This epic ends when a planner spec could be written against the profile contract
without reopening anything here.

Every requirement below is designed backwards from one question: **what will the AI
planner need to receive, and what must be true of the data for it to trust it?**

## Core design stance

- The **relational rows are the knowledge base**. No graph JSON, no embeddings, no
  vector DB, no snapshot tables in this epic. Per-user data volume (dozens of trips,
  hundreds of stops) makes on-demand computation trivially cheap.
- The profile is **deterministic structured variables (computed) + free-text evidence
  (passed through raw)**. The LLM sits at the planning edge, consuming the profile;
  it never computes profile values, because LLM-computed weights are non-reproducible
  and inconsistent.
- **Revealed preference beats stated preference.** What the user actually visited,
  favorited, and skipped outweighs self-reported style answers. Behavioral derivations
  (e.g. stops-per-day for pace) are primary; survey fields are secondary.
- **Confidence is first-class.** Every profile variable carries sample size and
  confidence so the future planner cannot overfit cold-start users.

## The 3 Hard Objectives (epic pass/fail)

1. **O1 — Clean capture.** A user can record a completed trip through the existing
   itinerary flow, and every profile-feeding signal is validated at the reducer
   boundary. No unvalidated enum or tag can ever reach the dataset.
   *Why hard: one garbage value silently corrupts every profile computed after it;
   the planner inherits the corruption invisibly.*
2. **O2 — Reproducible derivation.** The traveler profile is a pure function over
   relational rows: same rows in → byte-identical profile JSON out, computed on
   demand, sliceable by context (companions, recency), with value + confidence +
   sample size on every variable.
   *Why hard: confidence stops the planner hallucinating preferences off two data
   points; determinism makes the profile testable and debuggable.*
3. **O3 — Frozen consumable contract.** The epic ships a versioned profile contract
   (documented schema, v1 frozen as a brain decision) plus the user-facing preview
   where users confirm or override derived values.
   *Why hard: the planner is a separate feature on a separate timeline; it needs a
   stable interface, and a user-confirmed profile is strictly better input than an
   inferred one.*

## Hard Requirements

### Data model & capture

| # | Requirement | Planner justification |
|---|---|---|
| HR-1 | `tripMode` (PLANNED / COMPLETED) is explicit on Trip, with a named transition reducer (`set_trip_mode` or equivalent) and defined revert semantics. Profile reads only COMPLETED trips. Date-derived status remains UI flavor only. | The planner must learn only from actual behavior, never from aspirational planned trips. |
| HR-2 | One canonical verdict per location: `memoryVerdict` (FAVORITE / LIKED / NEUTRAL / SKIP_NEXT_TIME). Existing `appreciation` (1–5) becomes optional detail. No redundant `wouldReturn` boolean. | Contradictory overlapping signals (5-star + skip + would-return) make weighting undecidable. One signal, no ambiguity. |
| HR-3 | Negative signals are first-class: SKIP_NEXT_TIME is stored and aggregated, never discarded. | Skips are the rarest, most honest signal — they become the planner's exclusion patterns. |
| HR-4 | All controlled vocabularies (verdict, style tags, pace, companions) are validated inside reducers on write, not only in UI or read mappers. | O1. The dataset must be clean at the source of truth, regardless of client. |
| HR-5 | Free text (`memorySummary`, location `notes`) is stored raw and never pre-distilled into structured fields. One free-text field per level (no `hospitalityNotes`). | The LLM consumes verbatim notes at planning time; pre-distillation destroys the nuance it is good at reading. |
| HR-6 | `companions` and `pace` captured per trip. Pace is also derivable from stops-per-day; the behavioral derivation is primary, self-reported pace secondary. | Contextual slicing ("couple trip" weighs couple-trip history). Behavior beats survey. |
| HR-7 | All new columns optional/defaulted; SpacetimeDB publish is non-destructive; existing trips default to PLANNED with a visible convert-to-memory path from past-dated planned trips. | Existing data survives; users with past trips have a route into the dataset instead of an empty /memories. |

### Profile engine

| # | Requirement | Planner justification |
|---|---|---|
| HR-8 | Profile is a pure function (`computeTravelerProfile(rows, filters)`) computed on read. No stored snapshot tables in this epic. | Slicing for free (filter rows, recompute), zero staleness, zero recompute triggers, zero versioning debt. Persist later only if cost demands it. |
| HR-9 | Every variable = `{ value, confidence, sampleSize }`. Confidence derived from sample size; recency weighting applied (recent trips weigh more). | The planner must distinguish "FOOD 0.85, 40 stops" from "NIGHTLIFE 0.2, 3 stops" or it will overfit cold-start users. |
| HR-10 | Profile JSON carries `profileVersion`; the contract is documented in `brain/wiki/` and contract changes require a decision record. | O3. The planner builds against a versioned interface. |
| HR-11 | Profile computation reads only stored rows — no geocoding, no external API calls (respects RISK-001), no LLM calls. | Deterministic, instant, free. The LLM sits at the planning edge, never in this pipeline. |

### Product & boundaries

| # | Requirement | Justification |
|---|---|---|
| HR-12 | User can view and correct the profile; corrections stored as explicit overrides with provenance (`derived` vs `confirmed`), and re-derivation never silently clobbers a user correction. | Trust + better data: the planner prefers confirmed values over inferred ones. |
| HR-13 | All new reads/writes: `requireSession()` at the server-action boundary plus `requireOwnedTrip` ownership guard in reducers; zero cross-user reads of memory or profile data. RISK-002 verification scope extends to every new write surface. | Existing security model, extended. |
| HR-14 | Anti-requirements for this epic: no AI calls, no embeddings/vector DB, no photos, no stored graph JSON, no background jobs, no Maincloud/hosted DB assumptions. | Scope discipline. Each of these is a later feature that consumes this epic's output. |

## What we have vs. what we need

**Already in the repo:**
- Location-level signals: `appreciation`, `priceSentiment`, `notes`, `placeCategory`,
  `placeTypesJson` (`spacetimedb/src/schema/locations.ts`).
- Full itinerary CRUD reducers with the `requireOwnedTrip` ownership guard
  (`spacetimedb/src/shared/guards.ts`, `spacetimedb/src/modules/itinerary/reducers.ts`).
- `requireSession()` server-action pattern (`lib/actions/*`), server-side reads via
  procedures through `withSpacetimeDbConnection` (`lib/spacetimedb/server.ts`).
- Date-derived past/upcoming UI (`app/trips/page.tsx`, `components/tripDetail.tsx`)
  to anchor the new explicit mode.

**To build:**
- `tripMode` + transition reducer; trip-level memory fields (`memorySummary`,
  `overallAppreciation`, `travelStyleTagsJson`, `pace`, `companions` — the trimmed set).
- `memoryVerdict` + `memoryTagsJson` on Location; reducer-side vocabulary validation.
- The pure profile function + versioned contract documentation.
- `/memories` surface, Memories tab on trip detail, planned/completed toggle on
  `/trips/new`, convert-to-memory flow.
- The overrides/confirmation layer with provenance.
- The RISK-010 memory-first decision record (Phase 0 gate).

## Phases

**Phase 0 (gate, not a phase):** Write the memory-first decision record closing
RISK-010 — decided, options considered, accepted downsides (exact dates required for
old trips, photo-less v1, manual reconstruction friction), revisit criteria. The epic
does not start until this exists.

### Phase 1 — Capture (the dataset exists)
Schema: `tripMode` + trip memory fields + location `memoryVerdict`/`memoryTagsJson`,
all optional/defaulted. Reducers: `create_trip` with mode, `save_trip_memory`,
`set_trip_mode`, vocabulary validation in all of them. Publish + regenerate bindings.
UI: planned/completed toggle on `/trips/new`, Memories tab on trip detail,
convert-to-memory prompt on past-dated planned trips.

**Exit criteria:** a completed trip with validated trip+stop signals exists
end-to-end; hostile-client writes with invalid enums are rejected; existing
planned-trip flows are untouched (regression-checked).

### Phase 2 — Derive (the profile exists)
The pure function in `lib/` (e.g. `lib/traveler-profile/`): category affinities,
price band, behavioral pace, style/companion distributions, skip patterns — each with
value/confidence/sampleSize, recency-weighted, accepting slice filters. Safe read
procedure + `/memories` page rendering the traveler-facing profile preview (no
graph/node stats in UI). Determinism asserted by tests: same rows → identical JSON.

**Exit criteria:** profile renders for a real user; identical-input determinism
proven; cold-start (0–1 trips) renders honest low-confidence states, not fake
certainty.

### Phase 3 — Confirm & freeze (the planner can be built)
Overrides layer (confirm/correct per variable, provenance preserved across
re-derivation). Evidence-selection rule for free text: which raw notes accompany the
profile to the planner (e.g., notes attached to FAVORITE and SKIP stops). Contract v1
frozen: documented in `brain/wiki/`, recorded as a decision. Finish with a planner
dry run — a written example of the exact context bundle ("5 days in Lisbon with my
partner" → sliced profile + selected evidence) proving the contract is sufficient.

**Exit criteria:** the dry-run document could be handed to whoever builds the planner
with zero open questions back into this epic.

Each phase is independently shippable with its own brain sync and lint/build pass;
RISK-002 verification scope extends at Phases 1 and 3 (the write surfaces).

## Flagged design decision

No snapshot tables anywhere in this epic (HR-8). The Phase 3 planner dry run is
deliberately the moment that would expose compute-on-read as insufficient — that is
the cheap time to add persistence, not now.

## Brain impact

- Classification: **decision** (memory-first acceptance) + **material** (product
  direction, data architecture, risks, now, log all change when phases land).
- Suggested commands during execution:
  - `Run $vacky-brain plan with prompt: "Elaborate phased implementation plan for the Travel Memory & Traveler Profile epic at brain/outputs/plans/2026-06-12-travel-memory-traveler-profile-epic.md"`
  - `Run $vacky-brain sync with prompt: "Phase N of travel memory & traveler profile epic landed; sync direction, data architecture, risks, now, log"`
  - `$graphify . --update` after each phase merges.
