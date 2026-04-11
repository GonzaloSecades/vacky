'use server';

import { prisma } from '@/app/db';
import { auth } from '@/auth';

export async function getTripById(tripId: string) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Not authenticated');
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user.id,
    },
    include: {
      locations: {
        orderBy: [{ scheduledDate: 'asc' }, { order: 'asc' }],
      },
    },
  });
  return trip;
}
