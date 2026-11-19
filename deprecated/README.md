# Deprecated material

Retired: 2026-11-19. Source commit: `179df2f8e2f083e7b9a54cb436ac6e263a6eeb42`.

## Retired now

[The dated archive](2026-11-19/) preserves the former Operator workflows, team checklists, Vacky automation skills, and superseded execution plans.
[The archive map](2026-11-19/archive-map.json) records original and archived paths.
These files preserve history. They are not active instructions, skills, or implementation plans.
Read the root `AGENTS.md` and `docs/nestjs-backend.md` for current work.

Generated graph artifacts moved to local `deprecated/graphify-snapshot/` and are ignored.
This preserves the local snapshot without keeping generated caches, backups, and exports in normal changes.
The snapshot is absent from a fresh checkout. The source commit above retains the former tracked graph files.
Raw source evidence and unrelated `brain/experiments/` files remain in place.

## Legacy runtime still active

SpacetimeDB is deprecated for new backend development. The NestJS replacement does not exist yet.
`spacetimedb/`, `lib/spacetimedb/`, generated bindings, scripts, environment values, and dependencies remain live until verified cutover.
This cleanup does not delete local database data or change auth and trip behavior.

After cutover, archive necessary source and rationale with the final working commit.
Exclude dependencies, credentials, database contents, and generated bundles from that archive.
The backend plan defines feature parity, data migration, and rollback checks before removal.
