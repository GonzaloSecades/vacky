Use [AGENTS.md](../AGENTS.md) as the primary repository guide.

Vacky currently runs Next.js with first-party cookie auth and local legacy SpacetimeDB.
The accepted replacement is NestJS with PostgreSQL. It is not implemented yet.
Gonzalo writes the backend with step-by-step assistance.

- Review actual code, auth, ownership, validation, integration behavior, and verification evidence.
- Preserve existing UI and server/client boundaries unless the requested step changes them.
- Keep legacy persistence operational until replacement and migration checks pass.
- Do not prescribe Prisma, NextAuth, or hosted providers as current runtime dependencies.
- Use the single backend plan in `docs/nestjs-backend.md`.
- Do not require Vacky skill commands, extra plans, a fixed agent team, or graph rebuilds.
- Update current documentation only when a durable fact changes.
- Treat `deprecated/` and historical evidence as reference, not current instructions.
