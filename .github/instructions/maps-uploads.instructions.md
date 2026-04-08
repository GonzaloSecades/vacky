---
applyTo: "app/api/trips/route.ts,app/api/uploadthing/**/*.ts,app/globe/page.tsx,components/map.tsx,components/tripDetail.tsx,lib/upload-thing.ts"
---

This repository integrates Google Maps APIs, geocoding, and UploadThing. Review this area for integration-specific regressions.

- Keep browser-only map and globe libraries in client components.
- Flag fixed-size map or globe canvases that break responsiveness or overflow on smaller screens.
- Watch for API key misuse or leakage across server and client boundaries.
- In `app/api/trips/route.ts`, avoid changes that increase per-request geocoding fan-out or repeat external calls unnecessarily.
- For upload flows, verify UploadThing endpoints, client config, and returned URLs remain aligned.
- If new external image hosts are introduced, expect `next.config.ts` image `remotePatterns` updates.
- Prioritize comments about broken rendering, slow paths, missing loading/error states, and external service misuse over purely stylistic feedback.
