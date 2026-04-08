# Implementation Checklist

Use this while making Vacky changes.

## Before Editing

- Confirm `git status --short --branch`.
- Read the relevant files and call sites.
- Preserve unrelated local changes.
- Confirm whether the work touches Next.js boundaries, auth, Prisma, UploadThing, or geocoding.

## While Editing

- Use `@/` imports for local code.
- Prefer Server Components and server actions for data work.
- Add `'use client'` only when required.
- Keep auth checks in server actions and route handlers.
- Validate user ownership for trip/location IDs.
- Reuse `components/ui/` and existing Tailwind patterns.
- Keep form pending state accurate for async server actions.
- Update `next.config.ts` image hosts if new remote image URLs are introduced.

## Prisma Work

- Update `prisma/schema.prisma`.
- Add or update a migration under `prisma/migrations/`.
- Run `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npx prisma generate`.
- Do not manually edit `app/generated/prisma`.

## Verification

- Run `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`.
- Run `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build` for production-sensitive changes.
- Document manual checks when browser behavior matters.
