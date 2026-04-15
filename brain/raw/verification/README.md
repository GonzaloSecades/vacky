# Verification Sources

Store command, browser, accessibility, and manual-check evidence here.

This folder exists because merge history is not enough evidence for UI, auth-boundary, map, globe, and external-API behavior.

## What Belongs Here

- command output summaries for lint, build, Prisma, migrations, and focused scripts
- browser-check notes for itinerary, maps, globe, settings, auth redirects, and upload flows
- accessibility check notes
- security or hostile-client checks
- screenshots or references to screenshots when useful

## File Convention

Prefer:

`YYYY-MM-DD-short-scope.md`

Each note should answer:

- what was checked
- environment used
- commands or browser steps
- result
- failures or uncertainty
- risks that can be closed or downgraded

When a verification note changes risk status, update `wiki/risks.md` and `wiki/now.md`.
