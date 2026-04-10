# PR #6 Raw Note

Title: [codex] Fix globe loading and Three timer compatibility

Merge date: 2026-04-08

Merge commit: `fb34bc0e060ae96aeef834b0aaa80a0051423cbc`

Branch seen locally: `GlobeDeprecatedError`

## Evidence Used

- local merge commit `fb34bc0`
- merge commit body includes a useful one-line intent summary
- branch commits visible locally:
  - `9361505` Fix globe loading and Three timer compatibility
  - `009cc53` fix config for globe library to build correctly via turbopack and webpack
- final merged tree at commit `fb34bc0`

## Problem Or Goal

Stabilize the globe page after compatibility problems with `react-globe.gl` / `three`, and improve the page so it loads reliably in the current Next.js bundler environment.

## Final Merged Behavior

This PR did not introduce a new feature; it made the existing globe feature behave more reliably.

Final merged behavior:

- `app/globe/page.tsx` stopped importing `react-globe.gl` directly
- new `components/globe-client.tsx` wrapped the globe component and was dynamically imported with `ssr: false`
- globe sizing became responsive instead of fixed `800x600`
  - container width is measured
  - size is capped between `280` and `560`
  - `ResizeObserver` updates dimensions
- globe camera setup moved to an `onGlobeReady` callback
- loading UX became reusable through `GlobeCanvasLoader`
- `next.config.ts` added explicit aliasing for bare `three` imports in both webpack and Turbopack
- new `lib/three-clock-timer-shim.ts` and `three-timer.d.ts` shimmed timer access to work around compatibility/runtime issues

The PR also touched `app/settings/page.tsx`, but the main evidence points to cleanup/polish rather than a new settings feature.

## Main Files Or Areas Touched

- globe runtime and rendering
  - `app/globe/page.tsx`
  - `components/globe-client.tsx`
- compatibility layer
  - `lib/three-clock-timer-shim.ts`
  - `three-timer.d.ts`
  - `next.config.ts`
- minor companion polish
  - `app/settings/page.tsx`

## Important Review-Driven Changes If Discoverable

No explicit review comments were available, but the local branch history shows a follow-up commit dedicated to bundler config:

- `009cc53` fix config for globe library to build correctly via turbopack and webpack

That is strong evidence that the initial fix was not sufficient without config-level aliasing.

## Risks, Follow-Ups, Or Unresolved Questions

- the globe feature now depends on custom bundler aliasing plus a local shim; this is a maintenance hotspot for future Next.js or `three` upgrades
- current raw evidence does not explain the exact upstream bug or deprecation path, only the workaround shape
- if the project moves to different rendering patterns or package versions, this shim may become stale quickly

## What Should Be Promoted Into The Wiki

- architecture docs should record the globe feature's special client-only boundary and custom `three` compatibility setup
- risk docs should flag `react-globe.gl` and the shim/alias combo as a fragile integration point
- feature history should note that globe shipped in PR #3 but needed reliability work in PR #6 before the current implementation shape stabilized
