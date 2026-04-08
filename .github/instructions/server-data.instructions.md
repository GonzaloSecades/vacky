---
applyTo: "auth.ts,app/api/**/*.ts,lib/actions/**/*.ts,app/db.ts,prisma/**/*.prisma"
---

Treat this scope as high risk.

- Verify `auth()` and ownership checks for all user-scoped reads and writes.
- If code depends on `session.user.id`, confirm the repository already depends on that shape and do not suggest weakening those checks.
- Keep server actions in `lib/actions/` with `'use server'`.
- Prefer Prisma access through `@/app/db`.
- Do not suggest direct edits to `app/generated/prisma`.
- If `prisma/schema.prisma` changes, expect a migration plus `prisma generate`.
- For UploadThing changes, verify the server route name in `app/api/uploadthing/core.ts` stays aligned with the client usage.
- For external API calls, flag N+1 patterns, fan-out loops, missing error handling, or avoidable latency.
- For route handlers, watch for accidental overexposure of user data or cross-user access.
