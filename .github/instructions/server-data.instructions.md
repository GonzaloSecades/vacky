---
applyTo: "app/api/**/*.ts,lib/actions/**/*.ts,lib/auth/**/*.ts,lib/spacetimedb/**/*.ts,spacetimedb/src/**/*.ts,backend/**/*.ts"
---

Follow `AGENTS.md` and the current step in `docs/nestjs-backend.md`.

- The running Next.js application uses `getSession()` or `requireSession()` from `lib/auth/session`.
- Derive ownership from an authenticated principal. A request's `userId` alone proves nothing.
- Keep secrets, password hashes, and session tokens out of public responses and logs.
- Keep the legacy SpacetimeDB endpoint local. Its direct-call authorization remains an open risk.
- NestJS and PostgreSQL are the target, not existing runtime dependencies.
- Review input validation, transactions, bounded external calls, timeouts, and cross-user access.
- Preserve UploadThing route alignment and image-host configuration.
- Report which checks ran. Do not describe structural checks as runtime proof.
