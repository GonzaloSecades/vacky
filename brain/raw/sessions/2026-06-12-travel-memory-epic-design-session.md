# Session: Travel Memory & Traveler Profile epic design (2026-06-12)

Transcript of the Claude Code design session that critiqued the 2026-06-11
completed-past-trips plan and produced the Travel Memory & Traveler Profile epic.
User messages are verbatim; assistant responses are condensed but faithful to the
full answers. Evidence, not polished documentation.

Artifacts produced in this session:

- `brain/outputs/plans/2026-06-12-travel-memory-traveler-profile-epic.md` (the epic; supersedes the 2026-06-11 module plan)
- `brain/outputs/plans/2026-06-12-travel-memory-profile-epic-planning-prompt.xml` (LLM prompt to elaborate the phased implementation plan)
- This transcript.

---

## Turn 1 — User

> check the completed pas trips memories module plan, alongside brain and graphiphy
> out. Tell me if the plan could be imporved or what could be wrong with it.
> Brief summary of the feature: The plan adds a completed-trip memory mode on top of
> the existing Trip/Location itinerary model, capturing structured trip and
> stop-level signals like style, pace, favourites, skips, ratings, notes, and
> deterministic snapshot JSON. It explicitly defers AI/Photos/embeddings for v1, but
> creates a read-only traveler profile and graph-like knowledge base that future
> personalized AI planning can use. Feel free to add, critique anything. Be focused
> on the feature. Before making any changes give me a complete and justified answer.

## Turn 1 — Assistant (condensed)

Reviewed the plan XML against the actual schema/reducers, the brain wiki, and the
graphify report (two parallel Explore agents). Verdict: directionally sound, but
with one architecturally risky piece and several gaps.

What the plan gets right: reusing Trip/Location instead of a parallel itinerary
system (matches the 2026-04-12 memory-first brief); location signal fields already
exist in `spacetimedb/src/schema/locations.ts` (appreciation, priceSentiment, notes,
placeCategory, placeTypesJson); deterministic-only profile with AI deferred;
ownership/auth rules match the requireSession + requireOwnedTrip patterns.

Main problems found:

1. **Snapshot tables are the weakest part of v1.** `trip_memory_snapshot` and
   `traveler_profile_snapshot` are derived caches with an incomplete recompute
   trigger list (delete_trip missing, trip edits unhandled), no schema versioning,
   and no definition of "deterministic". Recommended compute-on-read instead: pure
   function over relational rows, persist later only if cost demands it. If kept,
   recompute must run in the same reducer transaction.
2. **Redundant verdict signals.** Per location the plan ends with three overlapping
   signals: existing appreciation (1-5), new memoryVerdict (4-way), new wouldReturn
   (bool) — contradictory states possible, extra form friction (the known adoption
   risk per the direction page). Recommended one canonical verdict. Trip level:
   hospitalityNotes + memorySummary + description = three free-text fields; cut to one.
3. **tripMode lifecycle underspecified.** Collides with the existing date-derived
   status in `app/trips/page.tsx` and `components/tripDetail.tsx`; no named
   transition reducer; no revert semantics; all existing trips default PLANNED so
   /memories starts empty for everyone with no flagged conversion story.
4. **Migration/validation gaps.** New columns must be optional/defaulted for
   non-destructive local publish; controlled vocabularies must be validated in
   reducers on write (current pattern only validates on read in mappers).
5. **Brain/risk alignment.** RISK-010 (memory-first not accepted) is the
   precondition but the decision record was buried as a follow-up step — must be
   step zero. RISK-002 verification scope widens with each new reducer. RISK-001:
   profile computation must never touch the geocoding path. RISK-011: clarify
   whether unused imagesJson is reserved for the future Photos tab.
6. Smaller: graph-stats in the /memories UI is developer-facing (cut); empty states
   unaddressed; /trips past tab vs /memories coexistence needs intent.

## Turn 2 — User

> did you found the creatin of past trips to be a knowledge base of data for
> creating a profile a good idea? i knwo the implementation plan has a lots of flaws
> and i want to address them. The raw idea is: User creates a past trip with the
> itinerary functionality. That data is already relational as you said, so this is
> the base from we create user traveler profile. This part is the one i need to
> solve, could be creating an algoritm where the trips data is then analyzed via sql
> or an llm and the profile has variables determined by weight so then the
> combination of all of them returns a profile or those variables could be used for
> the main feature (to be implemented with this in base) the future trips planning
> with ai help when the ai has the travelers profile and alongside the user helps to
> give shape to a new trip?

## Turn 2 — Assistant (condensed)

Yes — the core idea is good. Key points:

- **Capture mechanism is the strongest part**: reusing the itinerary flow produces
  structured behavioral data (place categories/types, coordinates, dates, ratings,
  price sentiment, notes) — revealed preference, far stronger than survey-style
  stated preference. The user builds a labeled dataset of their own travel behavior.
- **The relational rows ARE the knowledge base.** At this scale no graph, embeddings,
  or vector DB needed; the plan's graphJson was over-engineering.
- Caveats: cold start (1-3 trips = thin profile → carry confidence, don't tune
  weights for tiny N); the value loop must be visible or users won't do the manual
  reconstruction work.
- **Resolution of the SQL-vs-LLM question — not either/or, a layered split:**
  - Layer 1 (v1, deterministic): SQL/TS aggregation producing variables each with
    value + confidence + sample size. Category affinity weighted by verdict (skips
    count negative — skips are gold), price band, behavioral pace (stops/day beats
    self-report), recency weighting. Reproducible, testable, explainable; show it to
    the user and let them correct it (confirmed profile beats inferred).
  - Layer 2 (later, planning time): the LLM *consumes* the profile, never computes
    it (LLM-computed weights are non-reproducible). Free-text notes pass through raw
    — that's where the LLM adds value, interpreting nuance SQL can't aggregate.
- **Architectural consequence**: the planner wants contextually *sliced* profiles
  ("couple trip" → weigh couple-trip history; this is where the companions field
  pays off). On-demand computation from rows gives slicing for free; a pre-baked
  stored snapshot does not. Independently confirms dropping snapshot tables.
- Design the profile schema backwards from what the planner will ask of it.

## Turn 3 — User

> i loved this focus this is the perfect way, lets continue improving it. this a
> feature entirely for an app, would be the base for the other strong feature of the
> app. help establish hard requirements for the spec of this first feature but
> making it thinking in the planinng feature with ai. lets make this like an "Epic"
> and lets create a 3 phased plan for this memorie + profile creation using what we
> have, what we need and 3 hard objectives for this epic.

## Turn 3 — Assistant (condensed)

Produced the full epic (now persisted as
`brain/outputs/plans/2026-06-12-travel-memory-traveler-profile-epic.md`):

- **3 hard objectives**: O1 clean capture (reducer-boundary validation of every
  profile-feeding signal), O2 reproducible derivation (pure function, byte-identical
  output, sliceable, value+confidence+sampleSize per variable), O3 frozen consumable
  contract (versioned profile contract + user confirm/override layer).
- **14 hard requirements** (HR-1..HR-14), each justified by planner needs: explicit
  tripMode with named transition reducer; one canonical memoryVerdict; negative
  signals first-class; reducer-side vocabulary validation; raw free text never
  pre-distilled; companions+pace for slicing; optional/defaulted columns +
  convert-to-memory path; pure-function profile with no snapshot tables;
  confidence on every variable; versioned contract in brain/wiki; no external API
  calls in profile computation; overrides with derived-vs-confirmed provenance;
  requireSession + requireOwnedTrip everywhere; anti-requirements (no AI,
  embeddings, photos, graph JSON, background jobs, hosted DB).
- **Phases**: Phase 0 gate = RISK-010 decision record. Phase 1 Capture (schema,
  reducers, toggle, Memories tab; exit = validated end-to-end completed trip,
  hostile writes rejected, planned flows regression-checked). Phase 2 Derive (pure
  profile function + /memories preview; exit = determinism proven, honest cold-start
  states). Phase 3 Confirm & freeze (overrides, evidence-selection rule for notes,
  contract v1 frozen as decision, planner dry run; exit = dry-run doc handable to
  the planner builder with zero open questions).

## Turn 4 — User

> create this answer to a suitable brain artifact and create another xml file
> containing a detailed and prcise prompt for an llm to take this epico from the
> newly created file and elaborate a plan for this epic. The plan must be addresed
> in phases with clear pass checkpoints for the phases. Make the requirements
> precise and make as much as we need for this feature to be as complete as possible
> (follow-up: please add an artifact with this conversation transcript)

## Turn 4 — Assistant (condensed)

Created:

1. `brain/outputs/plans/2026-06-12-travel-memory-traveler-profile-epic.md` — the
   epic artifact, marked as superseding the 2026-06-11 module plan.
2. `brain/outputs/plans/2026-06-12-travel-memory-profile-epic-planning-prompt.xml`
   — an LLM planning prompt with: strict required-reading list (epic, AGENTS.md,
   schema/reducers/guards/actions, brain risks/decisions/architecture, bundled
   Next.js docs); binding constraints mirroring the HRs and anti-requirements;
   required plan structure (Phase 0 decision record fully drafted, three phases each
   with scope/tasks/pass-checkpoints in four classes (commands, functional, hostile,
   regression)/rollback/brain-sync, profile contract draft, planner dry run,
   HR-to-task traceability matrix, risks and open questions, estimates); precision
   rules (exact field types, reducer signatures, concrete confidence function,
   cold-start behavior, tripMode transition semantics, determinism test approach);
   output format following the existing vackyPlanArtifact XML shape; and a
   self-check list before emitting.
3. This transcript file.

## Open threads / unresolved

- Test tooling for determinism assertions is an open decision (repo has no test
  runner); the planning prompt asks the planner LLM to propose the minimal approach
  and flag it.
- RISK-010 decision record is drafted-by-plan but not yet written to
  brain/wiki/decisions/ — Phase 0 gate still open.
- imagesJson (RISK-011) fate (reserved for Photos tab vs deprecated) still
  unresolved; flagged for the decision record.
