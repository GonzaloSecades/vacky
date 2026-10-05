# Authenticated Trip Dashboard

> 14 nodes · cohesion 0.25

## Key Concepts

- **trips/page.tsx** (20 connections) — `app/trips/page.tsx`
- **trips/route.ts** (18 connections) — `app/api/trips/route.ts`
- **getSession()** (13 connections) — `lib/auth/session.ts`
- **trips-content.tsx** (11 connections) — `app/trips/trips-content.tsx`
- **get-all-trips.ts** (9 connections) — `lib/actions/get-all-trips.ts`
- **TripsPage()** (5 connections) — `app/trips/page.tsx`
- **TripsContent()** (5 connections) — `app/trips/trips-content.tsx`
- **getAllTrips()** (5 connections) — `lib/actions/get-all-trips.ts`
- **AppTrip** (5 connections) — `lib/spacetimedb/types.ts`
- **GET()** (4 connections) — `app/api/trips/route.ts`
- **DeletedTripToast()** (3 connections) — `app/trips/deleted-trip-toast.tsx`
- **getCountryFromCoordinates()** (3 connections) — `lib/actions/geocode.ts`
- **formatTripStatus()** (2 connections) — `app/trips/trips-content.tsx`
- **TripsContentProps** (2 connections) — `app/trips/trips-content.tsx`

## Relationships

- [Authentication Forms And Cards](Authentication_Forms_And_Cards.md) (13 shared connections)
- [Server Trip Data Helpers](Server_Trip_Data_Helpers.md) (6 shared connections)
- [Sessions And Email Verification](Sessions_And_Email_Verification.md) (6 shared connections)
- [Trips API And Geocoding](Trips_API_And_Geocoding.md) (5 shared connections)
- [Current Fullstack Architecture Guides](Current_Fullstack_Architecture_Guides.md) (4 shared connections)
- [Globe UI And Loaders](Globe_UI_And_Loaders.md) (3 shared connections)
- [Historical SpacetimeDB Migration Plan](Historical_SpacetimeDB_Migration_Plan.md) (3 shared connections)
- [Authenticated Trip Create Actions](Authenticated_Trip_Create_Actions.md) (3 shared connections)
- [Recalibrated History And Checks](Recalibrated_History_And_Checks.md) (2 shared connections)
- [SpacetimeDB Foundation Planning Guides](SpacetimeDB_Foundation_Planning_Guides.md) (2 shared connections)
- [UploadThing Cover Image Flow](UploadThing_Cover_Image_Flow.md) (2 shared connections)
- [Planner Client Type Contracts](Planner_Client_Type_Contracts.md) (2 shared connections)

## Source Files

- `app/api/trips/route.ts`
- `app/trips/deleted-trip-toast.tsx`
- `app/trips/page.tsx`
- `app/trips/trips-content.tsx`
- `lib/actions/geocode.ts`
- `lib/actions/get-all-trips.ts`
- `lib/auth/session.ts`
- `lib/spacetimedb/types.ts`

## Audit Trail

- EXTRACTED: 82 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
## Verified Node Membership

Generated source inventory, including historical evidence and proposals. Status is preserved from extraction; it is not an implementation or runtime verification claim. See `../BUILD_AUDIT.md` for unresolved source contradictions.

| Node ID | Concept | Source | Status |
| --- | --- | --- | --- |
| `app_api_trips_route` | trips/route.ts | `app/api/trips/route.ts` | not_tagged |
| `app_api_trips_route_get` | GET() | `app/api/trips/route.ts` | not_tagged |
| `app_trips_deleted_trip_toast_deletedtriptoast` | DeletedTripToast() | `app/trips/deleted-trip-toast.tsx` | not_tagged |
| `app_trips_page` | trips/page.tsx | `app/trips/page.tsx` | not_tagged |
| `app_trips_page_tripspage` | TripsPage() | `app/trips/page.tsx` | not_tagged |
| `app_trips_trips_content` | trips-content.tsx | `app/trips/trips-content.tsx` | not_tagged |
| `app_trips_trips_content_formattripstatus` | formatTripStatus() | `app/trips/trips-content.tsx` | not_tagged |
| `app_trips_trips_content_tripscontent` | TripsContent() | `app/trips/trips-content.tsx` | not_tagged |
| `app_trips_trips_content_tripscontentprops` | TripsContentProps | `app/trips/trips-content.tsx` | not_tagged |
| `lib_actions_geocode_getcountryfromcoordinates` | getCountryFromCoordinates() | `lib/actions/geocode.ts` | not_tagged |
| `lib_actions_get_all_trips` | get-all-trips.ts | `lib/actions/get-all-trips.ts` | not_tagged |
| `lib_actions_get_all_trips_getalltrips` | getAllTrips() | `lib/actions/get-all-trips.ts` | not_tagged |
| `lib_auth_session_getsession` | getSession() | `lib/auth/session.ts` | not_tagged |
| `lib_spacetimedb_types_apptrip` | AppTrip | `lib/spacetimedb/types.ts` | not_tagged |
