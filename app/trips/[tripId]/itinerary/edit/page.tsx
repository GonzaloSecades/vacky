import ItineraryPlanner from '@/components/itinerary-planner';
import { getTripById } from '@/lib/actions/get-trip-by-id';
import { getTripDateRange } from '@/lib/itinerary-dates';
import { redirect } from 'next/navigation';

export default async function EditItinerary({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const trip = await getTripById(tripId);

  if (!trip) {
    return <div className="px-4 py-8">Trip not found</div>;
  }

  if (trip.locations.length === 0) {
    redirect(`/trips/${tripId}/itinerary/new`);
  }

  const { startDateKey, endDateKey } = getTripDateRange(trip);

  return (
    <ItineraryPlanner
      mode="edit"
      trip={{
        id: trip.id,
        title: trip.title,
        startDateKey,
        endDateKey,
      }}
      initialLocations={trip.locations.map((location) => ({
        id: location.id,
        locationTitle: location.locationTitle,
        lat: location.lat,
        lng: location.lng,
        scheduledDate: location.scheduledDate,
        order: location.order,
        placeId: location.placeId,
        placeTypes: location.placeTypes,
        placeCategory: location.placeCategory,
        appreciation: location.appreciation,
        priceSentiment: location.priceSentiment,
        notes: location.notes,
      }))}
    />
  );
}
