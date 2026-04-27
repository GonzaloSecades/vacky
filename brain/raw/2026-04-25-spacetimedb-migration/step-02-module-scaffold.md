# Step 02: Module Scaffold

## What changed

- Added the initial `spacetimedb/` module package layout.
- Chose `lib/spacetimedb/module_bindings/` as the generated bindings target.
- Added the first schema skeleton covering auth, trips, locations, and audit data.
- Pinned the branch to local-only SpacetimeDB publishing and development.
- Published the module to the local-only database. The final branch default is `vacky-spacetimedb-local-dev`.
- Regenerated bindings with real auth reducers and procedures.

## How

- Created `spacetimedb/package.json` and `spacetimedb/tsconfig.json`.
- Added `spacetimedb/src/schema.ts` and `spacetimedb/src/index.ts` using the official TypeScript SDK shape from the local source pack.
- Kept the existing Prisma backend live while the SpacetimeDB module is scaffolded.
- Updated the repo scripts to publish only to `http://localhost:3000`.
- Later hardening replaced anonymous local identities with a local server-issued CLI identity because anonymous ownership was not stable across runs.

## Why

- The repo needs a real module entrypoint and a frozen bindings location before backend cutover work can proceed.
- A schema skeleton makes the migration concrete and exposes type/system constraints early.
- Local-only targeting removes accidental cloud/default-server drift from the migration workflow.

## Checkpoints

- [x] C1 add `spacetimedb/` module layout, CLI scripts, and codegen commands
- [x] C2 choose and freeze the generated bindings directory
- [x] C3 document local `spacetime start/dev/publish/generate` flow and how the Next app talks to it
- [x] C4 keep Prisma as the live backend temporarily while validating module build and binding generation
- [x] C5 verify the app still builds and the SpacetimeDB toolchain is operational

## Risks

- The schema uses JSON-string storage for some rich fields in the scaffold phase to keep the initial TypeScript module conservative.
- Anonymous local ownership is sticky per created database. This risk was retired later by switching to `spacetime login --server-issued-login http://localhost:3000 --no-browser` and database `vacky-spacetimedb-local-dev`.

## Verification

- `spacetime publish vacky-spacetimedb-local-dev --server http://localhost:3000 --module-path spacetimedb`
- `spacetime generate --lang typescript --out-dir lib/spacetimedb/module_bindings --module-path spacetimedb`
- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`
- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build`
