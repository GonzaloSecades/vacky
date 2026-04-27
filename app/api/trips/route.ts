import { getSession } from '@/lib/auth/session';
import getCountryFromCoordinates from '@/lib/actions/geocode';
import { listGlobeLocationsForUser } from '@/lib/spacetimedb/trips';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const locations = await listGlobeLocationsForUser(session.user.id);

    const transformedLocations = await Promise.all(
      locations.map(async (location) => {
        const geocodeResult = await getCountryFromCoordinates(
          location.lat,
          location.lng
        );
        return {
          name: `${location.tripTitle} - ${geocodeResult?.formattedAddress}`,
          lat: location.lat,
          lng: location.lng,
          country: geocodeResult?.country,
        };
      })
    );

    return NextResponse.json(transformedLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
