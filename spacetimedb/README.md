# Legacy backend

Status: deprecated for new backend development as of 2026-11-19.

This module still stores the running application's data.
The NestJS and PostgreSQL replacement is not implemented yet.
Keep this module, its generated bindings, and local data until verified cutover.
Keep the server local. Exported functions have an unresolved caller-authorization gap.

Use [the backend plan](../docs/nestjs-backend.md) for replacement work.
Use the root README for current local startup, publish, and binding generation commands.
Do not reset the database or expose it publicly during deprecation.
