'use server';

import { prisma } from '@/app/db';
import { auth } from '@/auth';
import { GOOGLE_MAPS_GEOCODE_ADDRESS_URL } from '@/lib/constants';
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
    console.log(`Geocoded address "${address}" to lat: ${lat}, lng: ${lng}`);
    return { lat, lng };
  } else {
    return null;
  }
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Not authenticated');
  }

  const address = formData.get('address') as string;
  if (!address) {
    throw new Error('Address is required');
  }

  const { lat, lng } = (await geoCodeAddress(address)) || {};
  if (lat === undefined || lng === undefined) {
    throw new Error('Failed to geocode address');
  }

  const count = await prisma.location.count({
    where: {
      tripId,
    },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count, // Set order based on the current count of locations for the trip
    },
  });

  redirect(`/trips/${tripId}`); // Redirect to the trip page after adding the location
}
