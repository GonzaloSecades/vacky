'use server';

import { requireSession } from '@/lib/auth/session';
import { listTripsForUser } from '@/lib/spacetimedb/trips';

export async function getAllTrips() {
  const session = await requireSession();

  return await listTripsForUser(session.user.id);
}
