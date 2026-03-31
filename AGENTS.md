<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. Before changing routing, rendering, data fetching, config, or server/client boundaries, read the relevant guide in `node_modules/next/dist/docs/`. Start with `node_modules/next/dist/docs/01-app/index.md` for App Router work and follow linked pages as needed. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vacky Agent Guide

## Project Snapshot

- Framework: Next.js `16.2.1` with the App Router
- Runtime: React `19`, TypeScript, Tailwind CSS `v4`
- Auth: `next-auth` v5 beta with GitHub provider
- Database: Postgres via Prisma `7` and `@prisma/adapter-neon`
- Uploads: UploadThing
- Package manager: `npm`
- Expected Node version: `22.20.0` from `.nvmrc`

## Commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Prisma client generate: `npx prisma generate`

## Repo Structure

- `app/`: App Router pages, layouts, API routes, generated Prisma client
- `components/`: shared UI and app components
- `lib/`: server actions and utilities
- `prisma/`: schema and SQL migrations
- `auth.ts`: central NextAuth configuration

## Architecture Notes

### App Router

- Default to Server Components. Add `'use client'` only when hooks, client state, browser APIs, or client-only libraries are required.
- Route handlers live under `app/api/**/route.ts`.
- Server actions live in `lib/actions/` and must keep `'use server'`.

### Authentication

- `auth.ts` exports `auth`, `handlers`, `signIn`, and `signOut`.
- The root layout already calls `auth()` and passes the session into `Navbar`.
- When adding authenticated pages or actions, enforce auth on the server boundary. Do not rely on client-side gating alone.
- If a route should be protected, prefer checking auth in the page or layout for that route segment, and keep server-action checks as defense in depth.

### Database / Prisma

- Prisma schema lives in `prisma/schema.prisma`.
- Generated Prisma client output is committed under `app/generated/prisma`.
- The app imports Prisma from `@/app/generated/prisma/client`, not from `@prisma/client`.
- After changing the Prisma schema:
  1. create or update a migration,
  2. run `npx prisma generate`,
  3. commit both the schema/migration and the updated generated client if it changed.
- Keep the Neon adapter setup in `app/db.ts` intact unless the connection strategy is intentionally changing.

### UploadThing

- UploadThing server config lives in `app/api/uploadthing/core.ts`.
- The route handler lives in `app/api/uploadthing/route.ts`.
- Client helpers are centralized in `lib/upload-thing.ts`.
- If you add new file routes, update both the server router type and any client endpoint usage.
- If uploaded image hosts change, update `next.config.ts` image `remotePatterns`.

## Current Domain Model

- `User`, `Account`, `Session`, and `VerificationToken` support authentication.
- `Trip` currently stores:
  - `title`
  - `description`
  - `coverImageUrl`
  - `images`
  - `startDate`
  - `endDate`
  - `userId`

## Coding Conventions For This Repo

- Use the `@/` alias for local imports.
- Keep UI primitives in `components/ui/` and reuse them before creating new one-off wrappers.
- Prefer server-side data access in pages/layouts/actions over client-side fetching when possible.
- For form submissions that call server actions from client components, ensure pending state tracks the async action correctly.
- Avoid moving generated files by hand; let Prisma generate them.
- Preserve the existing Tailwind utility style and simple component structure.

## What To Check Before Merging

- `npm run lint`
- `npm run build`
- If schema changed, verify the migration and generated Prisma client are both in sync
- If uploads changed, verify the UploadThing endpoint name and Next image host config match the returned URLs

## Known Sharp Edges

- This project uses a newer Next.js version than many older examples; confirm behavior against the bundled docs instead of relying on memory.
- Prisma is generated into `app/generated/prisma`, so stale generated files can cause confusing type/runtime mismatches.
- Auth is enforced in server actions today, but route-level protection may need to be added explicitly for new pages.
