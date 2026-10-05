# Authenticated Trip Create Actions

> 6 nodes · cohesion 0.60

## Key Concepts

- **requireSession()** (19 connections) — `lib/auth/session.ts`
- **trips/new/page.tsx** (16 connections) — `app/trips/new/page.tsx`
- **create-trip.ts** (13 connections) — `lib/actions/create-trip.ts`
- **createTrip()** (5 connections) — `lib/actions/create-trip.ts`
- **NewTrip()** (4 connections) — `app/trips/new/page.tsx`
- **UploadButton** (3 connections) — `lib/upload-thing.ts`

## Relationships

- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (10 shared connections)
- [UploadThing Cover Image Flow](UploadThing_Cover_Image_Flow.md) (4 shared connections)
- [Trips API And Geocoding](Trips_API_And_Geocoding.md) (4 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (3 shared connections)
- [Authenticated Trip Dashboard](Authenticated_Trip_Dashboard.md) (3 shared connections)
- [Itinerary Server Actions](Itinerary_Server_Actions.md) (3 shared connections)
- [Globe UI And Loaders](Globe_UI_And_Loaders.md) (2 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (2 shared connections)
- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (2 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (2 shared connections)
- [Itinerary Routes And Planning](Itinerary_Routes_And_Planning.md) (2 shared connections)
- [Itinerary Dates And Reordering](Itinerary_Dates_And_Reordering.md) (2 shared connections)

## Source Files

- `app/trips/new/page.tsx`
- `lib/actions/create-trip.ts`
- `lib/auth/session.ts`
- `lib/upload-thing.ts`

## Audit Trail

- EXTRACTED: 51 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `app_trips_new_page` | trips/new/page.tsx | `app/trips/new/page.tsx` | not_tagged |
| `app_trips_new_page_newtrip` | NewTrip() | `app/trips/new/page.tsx` | not_tagged |
| `lib_actions_create_trip` | create-trip.ts | `lib/actions/create-trip.ts` | not_tagged |
| `lib_actions_create_trip_createtrip` | createTrip() | `lib/actions/create-trip.ts` | not_tagged |
| `lib_auth_session_requiresession` | requireSession() | `lib/auth/session.ts` | not_tagged |
| `lib_upload_thing_uploadbutton` | UploadButton | `lib/upload-thing.ts` | not_tagged |
