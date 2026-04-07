/trips/route.ts (geocoding)

This route calls the Google Geocoding API once per stored location on every request (Promise.all(locations.map(...getCountryFromCoordinates))). This can quickly hit external rate limits and significantly increase latency. Consider persisting country/formattedAddress on Location, caching geocode lookups, or batching/limiting lookups so the API route remains fast and reliable.
