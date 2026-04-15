# Google Maps Modern API Migration

Date: 2026-04-14

Branch/sprint: `ItineraryEnhancement`, "Richer itinerary stop cards"

## Why This Matters

Google Maps JavaScript API is steering developers away from three APIs Vacky was using:

- `google.maps.Marker` is deprecated in favor of `google.maps.marker.AdvancedMarkerElement`.
- `google.maps.places.PlacesService` is legacy for new customers; Google recommends the new `google.maps.places.Place` class.
- `google.maps.places.AutocompleteService` is legacy for new customers; Google recommends `google.maps.places.AutocompleteSuggestion`.

This matters early because the richer itinerary planner is about to need custom marker visuals. Advanced markers are the current Google-supported path for marker customization, including HTML/CSS marker content. Moving now removes warning noise and avoids building the next marker iteration on an API Google no longer wants new work to use.

## What Changed

- Added a local `GoogleMapAdvancedMarker` component.
- Replaced `@react-google-maps/api`'s legacy `Marker` usage in:
  - `components/itinerary-planner-map.tsx`
  - `components/map.tsx`
- Added the `marker` library to the Maps loader.
- Added a map ID helper:
  - reads `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`
  - falls back to `DEMO_MAP_ID` for local/testing usage
- Updated map initialization options to include `mapId`.
- Removed `PlacesService` construction from the itinerary planner.
- Replaced `PlacesService.getDetails()` with:
  - `google.maps.importLibrary('places')`
  - `PlacePrediction.toPlace()`
  - `place.fetchFields({ fields: [...] })`
- Removed `AutocompleteService` construction from the itinerary planner.
- Replaced `AutocompleteService.getPlacePredictions()` with:
  - `google.maps.importLibrary('places')`
  - `AutocompleteSuggestion.fetchAutocompleteSuggestions()`
  - `PlacePrediction.toPlace()`
- Added per-row `AutocompleteSessionToken` usage so autocomplete typing and the selected `Place.fetchFields()` call are associated as one autocomplete session.
- Switched Place Details fields from legacy snake_case names to Place class camelCase names:
  - `formattedAddress`
  - `location`
  - `displayName`
  - `id`
  - `types`

The persisted Vacky data shape did not change in this step. The new Place API still feeds the same planner metadata:

- `placeId`
- `placeTypes`
- inferred `placeCategory`
- coordinates and display label

## Sources

- Advanced marker migration guide: https://developers.google.com/maps/documentation/javascript/advanced-markers/migration
- Places migration overview: https://developers.google.com/maps/documentation/javascript/legacy/places-migration-overview
- Place class data fields: https://developers.google.com/maps/documentation/javascript/place-class-data-fields
- Autocomplete Data (new) reference: https://developers.google.com/maps/documentation/javascript/reference/autocomplete-data
- Maps JavaScript API usage and billing: https://developers.google.com/maps/documentation/javascript/usage-and-billing
- Maps Platform billing reports: https://developers.google.com/maps/billing-and-pricing/understand-bill
- Maps Platform reporting and monitoring: https://developers.google.com/maps/reporting-and-monitoring/reporting

## Notes For Future Custom Markers

Advanced markers require a map ID. `DEMO_MAP_ID` is acceptable for local testing, but production/custom marker work should use a real Google Cloud map ID through `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`.

The local advanced marker wrapper now renders Vacky category marker content and owns marker click popups for both the itinerary planner map and trip-detail map. The popup shows the stop name, `Your rating`, `Cost feel`, and a `See on Google Maps` link that uses `placeId` when present and falls back to coordinates/title otherwise.

The popup intentionally keeps place type text out of the visible layout. It shows a small icon matching the current marker/category style; hover and keyboard focus reveal a compact tooltip with the most useful Google place type when available, falling back to the Vacky category for low-signal types such as `route`, `political`, `locality`, and `point_of_interest`.

Follow-up marker performance pass on 2026-04-14:

- The marker library promise remains module-cached, but marker lists now sit under parent React Suspense boundaries and `GoogleMapAdvancedMarker` reads the library with React `use()`.
- `components/google-map-advanced-marker.tsx` exposes `useAdvancedMarker()` for the imperative Google Maps lifecycle.
- The `AdvancedMarkerElement` and click listener are now created for the map/library lifetime only. Position, category marker content, native title, and InfoWindow aria label update through cheap property effects instead of tearing down and recreating the marker.
- Compact popup DOM is built lazily when a marker is clicked, not when every marker mounts.
- Marker visual DOM is cached by Vacky category and cloned per marker, because Google advanced markers move rather than clone DOM content passed to `content`.
- The inner marker effect component is memoized with a custom comparator that compares `position.lat`/`position.lng` and shallow `placeTypes` values, so parent renders that allocate fresh position objects do not automatically rerun marker hooks when marker data is unchanged.
- Trip-detail and planner map marker lists now wait for the base `GoogleMap` to report `onIdle` before rendering marker children, keeping custom markers hidden while the map is still settling.
- The old globe spinner was extracted into a shared `CanvasLoader` and reused for globe plus map loading states.
- Auto-fit effects remain useful because they synchronize the imperative Google map viewport after the map exists, but they now key off a coordinate signature so marker metadata-only edits can skip repeat `fitBounds`/center work.
- The planner map no longer starts from the earlier Argentina-specific MVP center. Its initial center is derived from the selected itinerary marker coordinates, and the no-marker state uses a neutral world fallback.

## Cloud-Based Map Styling Note

Google Cloud's map styling import/export JSON is not the same shape as the legacy Maps JavaScript `styles` array. The legacy array uses keys like `featureType`, `elementType`, and `stylers`; the Cloud-based map styling schema expects a root object with `variant`, optional `metadata`, and `styles` entries keyed by CBMS IDs such as `pointOfInterest.recreation.park`, `infrastructure.roadNetwork.road.highway`, `natural.water`, and `political.city`.

The first Vacky focus-style artifact used the legacy array format, so it was removed and replaced with:

- `brain/outputs/google-maps-vacky-focus-cbms-style.json`

That replacement keeps Vacky's intended map hierarchy:

- hide most Google POI labels so itinerary markers stay dominant
- keep parks, beaches, city names, neighborhoods, regions, countries, and water context readable
- mute road labels, road shields, signs, transit stations, railway tracks, and land parcels
- keep the style pastel and quiet so custom Vacky markers remain the focal layer

Validation performed locally:

- fetched the official schema from `https://developers.google.com/static/maps/cbms-json-schema.json`
- parsed the Vacky JSON with `jq`
- validated the Vacky JSON against the schema with local `ajv`
- checked that every Vacky style ID exists in the official schema's allowed ID constants

Source:

- Google CBMS JSON schema: https://developers.google.com/static/maps/cbms-json-schema.json

## Notes For Billing Safety

Autocomplete sessions should use fresh session tokens. Google documents that omitting or reusing session tokens can cause requests to be billed separately. Vacky now creates a row-scoped session token when a user starts typing, passes it to `fetchAutocompleteSuggestions()`, and clears it after selection or row removal.

During development, watch:

- Google Cloud Console -> Google Maps Platform -> Metrics
- Google Cloud Console -> Google Maps Platform -> Quotas
- Google Cloud Console -> Billing -> Reports
- Google Cloud Console -> Billing -> Budgets & alerts

For local manual testing, keep API key restrictions tight and set budget alerts or low quota limits on the project used for development.

## Verification

Command verification passed after the migration:

- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`
- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build`

Browser verification should confirm the marker, `PlacesService`, and `AutocompleteService` warnings are gone; autocomplete suggestions still populate; selected suggestions still fetch coordinates/types; and both trip-detail and itinerary-planner markers still render.

Follow-up marker popup verification on 2026-04-14:

- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run lint`
- `PATH=/Users/gonzalo.secades/.nvm/versions/node/v22.20.0/bin:$PATH npm run build`

Manual browser verification should click markers in both planner and trip detail maps, confirm the popup content, confirm the Google Maps link opens a new tab, and confirm the icon tooltip appears on hover/focus without adding visible place type text.
