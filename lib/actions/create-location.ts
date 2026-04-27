'use server';

import { requireSession } from '@/lib/auth/session';
import { GOOGLE_MAPS_GEOCODE_ADDRESS_URL } from '@/lib/constants';
import { addLocationForUser } from '@/lib/spacetimedb/trips';
import { redirect } from 'next/navigation';

export async function geoCodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY!;
  if (!googleMapsApiKey) {
    throw new Error('Google Maps API key is not configured');
  }

  const response = await fetch(
    `${GOOGLE_MAPS_GEOCODE_ADDRESS_URL}${encodeURIComponent(address)}&key=${googleMapsApiKey}`
  );
  const data = await response.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } else {
    return null;
  }
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await requireSession();

  const address = formData.get('address') as string;
  if (!address) {
    throw new Error('Address is required');
  }

  const { lat, lng } = (await geoCodeAddress(address)) || {};
  if (lat === undefined || lng === undefined) {
    throw new Error('Failed to geocode address');
  }

  await addLocationForUser(session.user.id, tripId, {
    locationTitle: address,
    lat,
    lng,
  });

  redirect(`/trips/${tripId}`);
}
