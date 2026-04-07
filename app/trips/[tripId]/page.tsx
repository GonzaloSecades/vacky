import TripDetailComponent, { TripWithLocation } from '@/components/tripDetail';
import { getTripById } from '@/lib/actions/get-trip-by-id';

export default async function TripDetail({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const trip = await getTripById(tripId);
  if (!trip) {
    return <div>Trip not found</div>;
  }

  return <TripDetailComponent trip={trip as TripWithLocation} />;
}
