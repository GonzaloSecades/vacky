Use [AGENTS.md](../AGENTS.md) as the primary repository guide.

This repository is a Next.js 16 App Router application using React 19, TypeScript, Tailwind CSS v4, NextAuth v5 beta, Prisma 7 with Neon, UploadThing, and Google Maps APIs.

When reviewing pull requests or suggesting changes:

- Prefer minimal, scoped fixes over broad refactors.
- Preserve existing repository patterns, file layout, and Tailwind utility style.
- Prioritize findings about behavioral regressions, broken auth or ownership checks, hydration issues, server/client boundary mistakes, theme regressions, and responsive layout problems over style-only suggestions.
- Default to Server Components. Add `'use client'` only when hooks, state, browser APIs, or client-only libraries require it.
- Enforce `auth()` at server boundaries when user-specific data is read or mutated.
- Keep server actions in `lib/actions/` with `'use server'`.
- Prefer server-side data access in pages, layouts, route handlers, and server actions over client-side fetching when feasible.
- Use `@/` imports for local modules.
- Reuse `components/ui/` primitives before introducing one-off wrappers.
- Prefer theme tokens such as `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, and `border-border` over hard-coded light-only colors.
- Preserve current theme persistence behavior: the app uses a cookie-backed light/dark setting applied from the root layout. Do not suggest client-only localStorage theming as the primary mechanism.
- Do not suggest editing generated Prisma files under `app/generated/prisma`; regenerate them when schema changes.
- Treat auth, Prisma, UploadThing, routing/rendering changes, external APIs, and map/geocoding behavior as high-risk areas.
- If uploads or external images change, verify UploadThing route alignment and `next.config.ts` image host rules.
- If maps or geocoding change, watch for API key boundaries, rate limits, latency, and fan-out regressions.
- The repository has a known risk in `app/api/trips/route.ts`: geocoding every stored location on each request can create unnecessary external API fan-out. Flag changes that worsen this.
- This repository does not have a dedicated test runner yet. Preferred verification is `npm run lint`, plus `npm run build` for production-sensitive changes, and focused manual browser checks for UI behavior.
- For reviews, prefer concise, concrete comments with file references and actionable fixes.
