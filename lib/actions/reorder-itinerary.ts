'use server';

import { prisma } from '@/app/db';
import { auth } from '@/auth';

const reorderItinerary = async (tripId: string, newOrder: string[]) => {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error('Not authenticated');
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
    },
  });

  if (!trip) {
    throw new Error('Trip not found');
  }

  const locationCount = await prisma.location.count({
    where: {
      id: {
        in: newOrder,
      },
      tripId,
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
        },
        data: {
          order: key,
        },
      })
    )
  );
};
export default reorderItinerary;
