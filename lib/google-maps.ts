import type { Libraries } from '@react-google-maps/api';

export const GOOGLE_MAPS_SCRIPT_ID = 'vacky-google-maps';
export const GOOGLE_MAPS_LIBRARIES: Libraries = ['places', 'marker'];
export const GOOGLE_MAPS_DEMO_MAP_ID = 'DEMO_MAP_ID';

export function getGoogleMapsBrowserApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not configured. Add it to .env.local to load Google Maps and Places.'
    );
  }

  return apiKey;
}

export function getGoogleMapsMapId() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? GOOGLE_MAPS_DEMO_MAP_ID;
}
