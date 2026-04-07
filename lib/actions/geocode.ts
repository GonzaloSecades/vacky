import { GOOGLE_MAPS_GEOCODE_COORDINATES_URL } from '../constants';

interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

interface GoogleAddressComponent {
  long_name?: string;
  types: string[];
}

interface GoogleGeocodeResponse {
  results?: {
    address_components?: GoogleAddressComponent[];
    formatted_address?: string;
  }[];
  status?: string;
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

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as GoogleGeocodeResponse;
  if (data.status !== 'OK' || !data.results?.length) {
    return null;
  }

  const result = data.results[0];
  if (!result.address_components?.length) {
    return null;
  }

  const countryComponent = result.address_components.find((component) =>
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
