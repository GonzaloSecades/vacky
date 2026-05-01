'use server';

import { requireSession } from '@/lib/auth/session';
import { deleteTripForUser } from '@/lib/spacetimedb/trips';

export async function deleteTrip(tripId: string) {
  const session = await requireSession();

  await deleteTripForUser(session.user.id, tripId);

  return { ok: true };
}