'use server';

import { requireSession } from '@/lib/auth/session';
import {
  getTripDateRange,
  isDateKeyWithinRange,
  isItineraryDateKey,
} from '@/lib/itinerary-dates';
import {
  getTripForUser,
  reorderItineraryDayForUser,
} from '@/lib/spacetimedb/trips';

export async function reorderItineraryDay(
  tripId: string,
  scheduledDate: string,
  newOrder: string[]
) {
  const session = await requireSession();

  if (!isItineraryDateKey(scheduledDate)) {
    throw new Error('Invalid itinerary date');
  }

  const uniqueLocationIds = new Set(newOrder);
  if (uniqueLocationIds.size !== newOrder.length) {
    throw new Error('Invalid itinerary order');
  }

  const trip = await getTripForUser(session.user.id, tripId);

  if (!trip) {
    throw new Error('Trip not found');
  }

  const { startDateKey, endDateKey } = getTripDateRange(trip);
  if (!isDateKeyWithinRange(scheduledDate, startDateKey, endDateKey)) {
    throw new Error('Invalid itinerary date');
  }

  const locationCount = trip.locations.filter(
    (location) =>
      location.scheduledDate === scheduledDate && newOrder.includes(location.id)
  ).length;

  if (locationCount !== newOrder.length) {
    throw new Error('Invalid itinerary order');
  }

  await reorderItineraryDayForUser(
    session.user.id,
    tripId,
    scheduledDate,
    newOrder
  );
}

export default reorderItineraryDay;
