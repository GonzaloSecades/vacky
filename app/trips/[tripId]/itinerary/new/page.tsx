import NewLocationClient from '@/components/new-location';
import { getTripById } from '@/lib/actions/get-trip-by-id';

//"use client";
export default async function NewLocation({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const trip = await getTripById(tripId);

  if (!trip) {
    return <div className="px-4 py-8">Trip not found</div>;
  }

  return <NewLocationClient tripId={tripId} tripTitle={trip.title} />;
}
