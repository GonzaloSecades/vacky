'use server';

import { requireSession } from '@/lib/auth/session';
import { getTripForUser } from '@/lib/spacetimedb/trips';

export async function getTripById(tripId: string) {
  const session = await requireSession();

  return await getTripForUser(session.user.id, tripId);
}
