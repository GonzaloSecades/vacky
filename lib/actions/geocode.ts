import { GOOGLE_MAPS_GEOCODE_COORDINATES_URL } from '../constants';

interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export default async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult | null> {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY!;
  if (!googleMapsApiKey) {
    throw new Error('Google Maps API key is not configured');
  }

  const response = await fetch(
    `${GOOGLE_MAPS_GEOCODE_COORDINATES_URL}${lat},${lng}&key=${googleMapsApiKey}`
  );

  const data = await response.json();
  const result = data.results[0];

  // nobody knows this type; neither Google nor the library does, so we have to ignore it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countryComponent = result.address_components.find((component: any) =>
    component.types.includes('country')
  );

  if (countryComponent) {
    return {
      country: countryComponent.long_name || 'Unknown',
      formattedAddress: result.formatted_address || 'Unknown',
    };
  } else {
    return null;
  }
}
