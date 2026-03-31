'use server';

import { prisma } from '@/app/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function createTrip(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error('Not authenticated');
  }

  const title = formData.get('title')?.toString();
  const description = formData.get('description')?.toString();
  const startDateStr = formData.get('start-date')?.toString();
  const endDateStr = formData.get('end-date')?.toString();
  const coverImageUrl = formData.get('coverImageUrl')?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error('All fields are required');
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid start or end date');
  }

  if (startDate.getTime() >= endDate.getTime()) {
    throw new Error('Start date must be before end date');
  }
  await prisma.trip.create({
    data: {
      title,
      description,
      coverImageUrl,
      startDate,
      endDate,
      userId: session.user.id,
    },
  });

  redirect('/trips');
}
