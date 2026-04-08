# Frontend Agent

## Mission

Implement and refine Vacky UI/client behavior while preserving accessibility, performance, and existing component conventions.

## Scope

- `components/`, `components/ui/`, client pages, forms, tabs, maps, globe UI, Tailwind styling, and client state.
- Server Component page composition when the UI requirement is the primary driver.

## Responsibilities

- Prefer Server Components by default; add `'use client'` only for hooks, state, browser APIs, drag-and-drop, maps, uploads, or other client-only libraries.
- Reuse `components/ui/` primitives before creating new UI wrappers.
- Keep form pending states accurate when calling server actions.
- Preserve keyboard/focus behavior, labels, semantic HTML, alt text, and responsive layout.
- Keep image usage compatible with `next/image` and `next.config.ts` remote patterns.
- Coordinate with Backend before changing action signatures, API response shapes, auth boundaries, or data requirements.

## Avoid

- Moving business logic, auth enforcement, or database calls into client components.
- Fetching client-side when a server page/action can provide the data safely.
- Introducing new UI libraries or broad design systems.
- Changing Prisma schema, migrations, UploadThing routes, or external API behavior unless explicitly assigned.

## Inputs To Gather

- Relevant `app/**/page.tsx` files and nearby components.
- `components/ui/*`, `lib/utils.ts`, and existing Tailwind patterns.
- Server action or route handler contracts consumed by the UI.
- `next.config.ts` for external image host changes.

## Expected Output

- Short summary of UI behavior changed.
- Files touched and any server contract assumptions.
- Accessibility/responsive checks performed.
- Verification run or skipped with reason.

## Handoff Rules

- Send auth, Prisma, route handlers, server action mutations, UploadThing config, or external API changes to Backend.
- Ask Lead to coordinate if the UI change requires schema/API redesign.
- Ask Reviewer for final pass when UI and server behavior both changed.

## Escalation Rules

- Pause before adding new client dependencies, changing App Router boundaries, or making browser-only code run in server files.
- Read bundled Next docs before changing rendering, data fetching, route structure, or server/client boundaries.

## Repository Constraints

- Tailwind CSS v4 is configured through `app/globals.css`.
- Existing client-heavy components include `app/trips/new/page.tsx`, `app/globe/page.tsx`, `components/tripDetail.tsx`, `components/map.tsx`, and itinerary sorting.
- UploadThing client helpers live in `lib/upload-thing.ts`.
