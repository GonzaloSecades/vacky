# Trip Photos Tab Future Implementation

Date: 2026-04-15
Status: brainstorm
Tags: future implementation, photos, memory-first, trip detail, UploadThing, location association

## Summary

A trip-level Photos tab is a better product shape for photo memory capture than requiring every image to attach to a location at upload time.

Users should be able to upload photos into a trip first, then Vacky can help organize those photos into locations over time. This keeps the upload flow low-friction, avoids over-relying on photo metadata, and preserves the existing `Trip` and `Location` model split.

## Refined Direction

Add a `Photos` tab to `/trips/[tripId]`.

First version:

- upload photos to the trip
- display them in a trip gallery
- each photo can be unlinked or linked to a `Location`
- if metadata exists, show lightweight hints such as capture date, possible map point, or `near X`
- do not auto-create locations yet

Future smart layer:

- parse photo GPS metadata
- compare coordinates against existing trip locations
- if within a logical radius, suggest linking the photo to that location
- if no nearby location exists, suggest creating a new editable location from the photo
- later, AI can infer place/category/context from the image, but it should remain suggestion-based

## Why This Is Stronger

This makes the product more memory-first without breaking the current planning model.

Current Vacky already has:

- trips
- locations
- maps
- itinerary tabs
- UploadThing
- per-location metadata
- Google geocoding and Places

A trip-level photo inbox fits around that existing system. Photos become raw memory material; locations remain the structured map and itinerary layer.

## Suggested Product Model

Think of three states:

1. Unsorted trip photo
   - uploaded to the trip
   - shown in the Photos tab
   - not attached to a location
2. Linked photo
   - attached to an existing `Location`
   - linked manually or by suggestion
3. Photo-suggested location
   - photo has GPS/date/context that suggests a new location
   - user must confirm and edit before save

That keeps the system honest. Vacky suggests; the user decides.

## Logical Radius

Use a simple first rule:

- same trip only
- compare photo GPS to existing trip locations
- if distance is under a threshold, suggest the nearest location
- otherwise suggest creating a new location

Reasonable first thresholds:

- dense city trip: `100-250m`
- general travel: `500m`
- rural, nature, or road trip: `1-2km`

For MVP, choose one default such as `300m`, and avoid configurability until there is real usage. If the nearest location is ambiguous, show `possible match` instead of auto-linking.

## Monetization And Premium Angle

This has a plausible premium path, but the free version should still be useful.

Free:

- upload trip photos
- view gallery
- manually link photo to a location
- maybe basic EXIF date/GPS detection

Premium later:

- automatic location suggestions
- AI image understanding
- bulk organization
- create locations from photos
- map/timeline reconstruction
- duplicate detection
- smart memory summaries
- personalized future planning from past trip photos

That is a cleaner premium story than charging for basic uploads.

## Main Risk

Privacy is the big one.

Photo metadata can include exact GPS coordinates and timestamps. Also, if original images are stored with EXIF intact, the metadata may still exist inside the file even if the app does not display it.

The implementation decision needs to be explicit:

- store original photo as-is and warn/handle carefully, or
- strip EXIF from stored image and save only allowlisted metadata fields separately

The second option is better long-term, but likely heavier.

## Recommended Scope

Build this in stages.

Stage 1:

- add `Photos` tab
- upload/display trip photos
- store photos under trip ownership
- optional manual link to existing location
- no AI
- no auto-create

Stage 2:

- parse EXIF GPS/date
- suggest nearby existing location
- allow user-confirmed link

Stage 3:

- if no nearby location exists, suggest `Create location from this photo`
- prefill coordinates/date
- user edits title/category/notes before save

Stage 4:

- AI enrichment and premium memory builder

## Codex Implementation Prompt

```text
Use the Vacky implementation workflow. Start in plan mode and do not edit until scope, risks, tests, and brain impact are validated.

Feature:
Add a trip-level Photos tab as the foundation for a future visual memory builder.

Goal:
On `/trips/[tripId]`, add a Photos tab where authenticated users can upload and view photos for the current trip. Photos should belong to the trip first, and may later be linked to existing Locations or used to suggest new Locations.

First implementation scope:
- Add trip-owned photo storage.
- Use UploadThing for uploads.
- Add a Photos tab to trip detail.
- Display uploaded photos in a responsive gallery.
- Preserve user ownership boundaries.
- Optional if simple: allow manually linking a photo to an existing Location in the same trip.
- Keep the data model ready for future photo-to-location suggestions.

Future-facing design, not required in first pass:
- Parse EXIF GPS/date metadata.
- Suggest linking a photo to an existing trip Location when coordinates are within a logical radius.
- If no Location is nearby, suggest creating a new editable Location from the photo coordinates.
- Later premium/AI layer can classify images, infer place context, bulk-organize photos, and build trip memory timelines.

Non-goals:
- No AI image analysis in the first implementation.
- No automatic location creation.
- No bulk photo import.
- No map/timeline reconstruction.
- No public sharing.
- No monetization enforcement yet.
- Do not promote memory-first to accepted product strategy unless a decision record is explicitly added.

Inspect first:
- brain/wiki/now.md
- brain/wiki/features/current-surface.md
- brain/wiki/architecture/overview.md
- brain/wiki/architecture/data-and-auth.md
- brain/wiki/risks.md
- app/api/uploadthing/core.ts
- lib/upload-thing.ts
- prisma/schema.prisma
- app/trips/[tripId] route/page components
- existing tab implementation on trip detail
- Next.js docs under node_modules/next/dist/docs/ before changing App Router/server/client boundaries

Risk checks:
- Photo metadata may contain sensitive GPS/timestamp data.
- Decide whether first pass stores original images as-is or strips EXIF later.
- Server actions must validate trip ownership and photo ownership.
- If location-linking is included, only allow links to locations owned by the same user and trip.
- Do not worsen existing Google geocoding cost risk.

Verification:
- Run Prisma migration/generate if schema changes.
- Run npm lint.
- Run npm build if production-sensitive or schema/client-boundary changes are touched.
- Manually verify authenticated upload, gallery display, unauthorized trip/photo access rejection, and mobile layout.
- If manual location linking is included, verify only same-trip locations are linkable.

Brain update:
This is a material feature and data-model change. Update current surface, architecture/data pages, risks if needed, now.md, and log.md before PR-ready handoff. If this becomes the accepted memory-first direction, add a decision record under brain/wiki/decisions/.
```
