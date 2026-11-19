# SpacetimeDB Official Source Index

Reviewed: 2026-04-24

Use this file to route SpacetimeDB migration work to the right primary source instead of relying on memory or random examples.

## Version Posture

- The official docs pages reviewed for this pack currently show `Version 2.0.0`.
- The GitHub releases page shows `v2.1.0` released on 2026-03-24.
- When examples, older snippets, and docs disagree, prefer:
  1. the current official AI rules
  2. the generated bindings in the repo
  3. current official docs

## Mandatory Sources

| Area | Source | Use it for | Migration note |
| --- | --- | --- | --- |
| AI rules | `https://spacetimedb.com/docs/ai-rules/spacetimedb-typescript.mdc` | Required TypeScript SDK patterns and anti-hallucination rules | Read before writing any TS module or client code |
| LLM index | `https://spacetimedb.com/llms.txt` | Broad product/doc map and auth/runtime overview | Good for orientation, not for exact API syntax |
| Next.js quickstart | `https://spacetimedb.com/docs/quickstarts/nextjs/` | Official Next.js app shape | Use the hybrid SSR + realtime client pattern |
| Code generation | `https://spacetimedb.com/docs/sdks/codegen/` | `spacetime generate` usage and generated bindings workflow | Regenerate after schema/function changes |
| Reducers | `https://spacetimedb.com/docs/functions/reducers/` | Transactional write path | Default place for persistent state changes |
| Views | `https://spacetimedb.com/docs/functions/views/` | Safe computed read models | Prefer for client-visible projections instead of exposing private tables |
| Access permissions | `https://spacetimedb.com/docs/tables/access-permissions/` | Public vs private table exposure | Tables are private by default |
| Procedures | `https://spacetimedb.com/docs/functions/procedures/` | Network/side-effect capable functions | Beta; require explicit justification and `withTx()` for DB access |
| Automatic migrations | `https://spacetimedb.com/docs/databases/automatic-migrations/` | Schema evolution constraints | Review before destructive or incompatible table changes |
| Authentication overview | `https://spacetimedb.com/docs/core-concepts/authentication/` | SpacetimeDB identity model | Native identity is OIDC-based |
| Using auth claims | `https://spacetimedb.com/docs/core-concepts/authentication/usage/` | Claim access from reducers/views/procedures | Read before designing custom auth flows inside the module |
| Databases overview | `https://spacetimedb.com/docs/databases/` | Module/database mental model | Good reset when old Prisma assumptions leak in |
| GitHub releases | `https://github.com/clockworklabs/SpacetimeDB/releases` | Version drift and latest release dates | Useful when docs and examples look out of sync |

## Migration-Specific Reading Order

1. `spacetimedb-typescript.mdc`
2. Next.js quickstart
3. reducers
4. views
5. access permissions
6. code generation
7. authentication overview and auth claims
8. procedures
9. automatic migrations

## What To Ignore

- Unverified blog posts, forum snippets, and old generated-binding examples.
- Any code that imports fake packages or uses fake APIs such as `SpacetimeDBClient.connect`.
- Examples that bypass generated bindings or hide reducer calls behind invented helpers.
- Maincloud-oriented publishing, login, and deployment flows for this migration branch. Vacky is local-instance-only on this branch.
