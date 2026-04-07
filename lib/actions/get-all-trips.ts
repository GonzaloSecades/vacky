'use server';

import { prisma } from '@/app/db';
import { auth } from '@/auth';

export async function getAllTrips() {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Not authenticated');
  }

  const trips = await prisma.trip.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      startDate: 'desc',
    },
  });
  return trips;
}
