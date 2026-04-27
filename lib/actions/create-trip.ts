'use server';

import { requireSession } from '@/lib/auth/session';
import { createTripForUser } from '@/lib/spacetimedb/trips';
import { redirect } from 'next/navigation';

export async function createTrip(formData: FormData) {
  const session = await requireSession();

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

  await createTripForUser(session.user.id, {
    title,
    description,
    coverImageUrl,
    startDate,
    endDate,
  });

  redirect('/trips');
}
