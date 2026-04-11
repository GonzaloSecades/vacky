# PR #6 Raw Note

Title: [codex] Fix globe loading and Three timer compatibility

PR: https://github.com/GonzaloSecades/vacky/pull/6

Merge date: 2026-04-08

Merge commit: `fb34bc0e060ae96aeef834b0aaa80a0051423cbc`

Branch: `GlobeDeprecatedError`

Base: `543d7b80d4703a9e7e4d002d850061fb07a41896`

Head: `009cc53bb8a72f3b8e64519de9a05c3a500b2831`

## Evidence Used

- GitHub PR metadata, body, final diff, issue comment, and review comments for PR #6.
- Local merge commit `fb34bc0`.
- Existing first-bootstrap raw note, reconciled with GitHub metadata.
- Current repo state at `90cbe69` to identify which review comments were addressed by final code.

## Problem Or Goal

The PR body and issue comment identify two concrete globe-runtime problems:

- `react-globe.gl` pulls in `three-render-objects`, which still instantiates `new THREE.Clock()`, deprecated in Three.js `0.183.2`.
- Importing `react-globe.gl` at the top of the globe page caused `window is not defined` during direct `/globe` route evaluation.

The goal was to keep the existing globe feature while preventing server evaluation of browser-only code and preserving the legacy `Clock` API expected by transitive dependencies.

## Final Merged Behavior

This PR did not add a new product feature. It stabilized the existing `/globe` feature.

Final merged behavior:

- `app/globe/page.tsx` stopped importing `react-globe.gl` directly.
- `components/globe-client.tsx` became the client-only wrapper that imports and renders `react-globe.gl`.
- `app/globe/page.tsx` dynamically imports `GlobeClient` with `next/dynamic(..., { ssr: false })`.
- A reusable `GlobeCanvasLoader` replaced duplicated spinner markup.
- Globe sizing remained responsive:
  - container width is measured
  - size is capped between `280` and `560`
  - `ResizeObserver` updates dimensions
- Globe camera setup runs through an `onGlobeReady` callback.
- `lib/three-clock-timer-shim.ts` preserves a legacy `Clock` API while internally using `Timer`.
- `three-timer.d.ts` adds ambient typings for `three/src/core/Timer.js`.
- `next.config.ts` aliases bare `three` imports to the shim for both:
  - client-side webpack production builds
  - Turbopack browser resolution
- `app/settings/page.tsx` received import/class cleanup as a scoped companion change.

## Main Files Or Areas Touched

- globe runtime and rendering:
  - `app/globe/page.tsx`
  - `components/globe-client.tsx`
- compatibility layer:
  - `lib/three-clock-timer-shim.ts`
  - `three-timer.d.ts`
  - `next.config.ts`
- companion cleanup:
  - `app/settings/page.tsx`

## Important Review-Driven Changes Or Comments

GitHub review evidence is strong for this PR.

- The PR body reports verification:
  - `npm run lint` with Node `22.20.0`
  - `npx tsc --noEmit` with Node `22.20.0`
  - `npm run build` blocked because `next/font` could not fetch Geist fonts from Google Fonts
- A user issue comment restates root cause, fix, timing behavior, and manual browser checks.
- Copilot first review summary says the PR prevented browser-only globe dependencies from being evaluated on the server and added a Three.js compatibility shim.
- Copilot flagged that the alias initially covered Turbopack only while `next build` uses webpack. Final/current `next.config.ts` includes both webpack and Turbopack aliasing, so this concern appears addressed in the final merge.
- Copilot flagged `size-18` in `app/settings/page.tsx` as not a default Tailwind spacing token. Current repo state still uses `size-18`, so deterministic avatar sizing remains unresolved unless Tailwind v4 supplies or accepts that utility in this setup.
- Copilot later flagged `GlobeCanvasLoader` as purely visual and recommended `role="status"`, `aria-live`, and/or screen-reader text. Current `app/globe/page.tsx` still has a visual-only loader, so the accessibility follow-up remains unresolved.

## Risks, Follow-Ups, Or Unresolved Questions

- The globe feature depends on custom bundler aliasing plus a local shim. This is a maintenance hotspot for future Next.js, Turbopack, webpack, or `three` upgrades.
- The shim imports from `three/src/core/Timer.js`, an internal-looking subpath; future Three.js package changes could break it.
- Build evidence remained incomplete because font fetch failed in the environment.
- Manual browser checks were recommended but no completed browser-check evidence was found in the PR metadata.
- The visual-only globe loader is an accessibility gap.
- `size-18` avatar sizing may be ignored if not supported by the Tailwind version/config.

## What Should Be Promoted Into The Wiki

- Architecture docs should record the globe's client-only boundary and custom Three.js compatibility setup.
- Risk docs should flag the `react-globe.gl` + `three` shim/alias combination as fragile.
- Feature history should note that `/globe` shipped in PR #3 but reached the current stabilized implementation shape in PR #6.
- Current risks should include the unresolved loader accessibility and `size-18` sizing concerns if they remain in code.
