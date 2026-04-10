# Brain Bootstrap Session

Date: 2026-04-10

## Intent

Initialize a Karpathy-style project brain for Vacky inside the repository so project understanding can accumulate instead of being lost across LLM sessions.

## Repo Observations Used

- clean git status at bootstrap time
- existing `AGENTS.md` provides the strongest project snapshot
- current repo already includes:
  - App Router routes for homepage, trips, trip creation, trip details, itinerary creation, globe, and settings
  - auth, Prisma, UploadThing, and Google Maps/geocoding integration points
  - project-local agent and prompt assets under `.agents/` and `.codex/`

## Initial Brain Decisions

- keep `brain/` inside the Vacky repo
- separate `raw/`, `wiki/`, `outputs/`, and `Operator/`
- treat the wiki as compiled understanding, not a dump of notes
- treat `Operator/` as reusable procedure docs, not Vacky-only instructions
- keep GraphyBrain as an abstraction that can emerge later from repeated patterns

## Immediate Next Moves

- ingest this bootstrap note into the wiki as needed
- create future raw session notes after meaningful coding work
- promote real decisions, experiments, and feature understanding over time
