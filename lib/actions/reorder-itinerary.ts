'use server';

import { prisma } from '@/app/db';
import { auth } from '@/auth';
import {
  getTripDateRange,
  isDateKeyWithinRange,
  isItineraryDateKey,
} from '@/lib/itinerary-dates';

export async function reorderItineraryDay(
  tripId: string,
  scheduledDate: string,
  newOrder: string[]
) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Not authenticated');
  }

  if (!isItineraryDateKey(scheduledDate)) {
    throw new Error('Invalid itinerary date');
  }

  const uniqueLocationIds = new Set(newOrder);
  if (uniqueLocationIds.size !== newOrder.length) {
    throw new Error('Invalid itinerary order');
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user.id,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
    },
  });

  if (!trip) {
    throw new Error('Trip not found');
  }

  const { startDateKey, endDateKey } = getTripDateRange(trip);
  if (!isDateKeyWithinRange(scheduledDate, startDateKey, endDateKey)) {
    throw new Error('Invalid itinerary date');
  }

  const locationCount = await prisma.location.count({
    where: {
      id: {
        in: newOrder,
      },
      tripId,
      scheduledDate,
    },
  });

  if (locationCount !== newOrder.length) {
    throw new Error('Invalid itinerary order');
  }

  await prisma.$transaction(
    newOrder.map((locationId: string, key: number) =>
      prisma.location.updateMany({
        where: {
          id: locationId,
          tripId,
          scheduledDate,
        },
        data: {
          order: key,
        },
      })
    )
  );
}

export default reorderItineraryDay;
