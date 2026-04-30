import { t } from 'spacetimedb/server';
import spacetimedb from '../../schema';
import { requireOwnedTrip } from '../../shared/guards';

export const create_trip = spacetimedb.reducer(
  {
    userId: t.u64(),
    title: t.string(),
    description: t.string(),
    coverImageUrl: t.string().optional(),
    startDate: t.timestamp(),
    endDate: t.timestamp(),
  },
  (ctx, { userId, title, description, coverImageUrl, startDate, endDate }) => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!ctx.db.userAccount.id.find(userId)) {
      throw new Error('User not found');
    }

    if (!trimmedTitle || !trimmedDescription) {
      throw new Error('Missing required trip fields');
    }

    if (startDate.microsSinceUnixEpoch >= endDate.microsSinceUnixEpoch) {
      throw new Error('Start date must be before end date');
    }

    ctx.db.trip.insert({
      id: 0n,
      userId,
      title: trimmedTitle,
      description: trimmedDescription,
      coverImageUrl: coverImageUrl?.trim() || undefined,
      imagesJson: '[]',
      startDate,
      endDate,
      createdAt: ctx.timestamp,
      updatedAt: ctx.timestamp,
    });
  }
);

export const delete_trip = spacetimedb.reducer(
  {
    userId: t.u64(),
    tripId: t.u64(),
  },
  (ctx, { userId, tripId }) => {
    requireOwnedTrip(ctx.db, userId, tripId);

    const locationsToDelete = [...ctx.db.location.location_trip_id.filter(tripId)];
    for (const location of locationsToDelete) {
      ctx.db.location.id.delete(location.id);
    }

    ctx.db.trip.id.delete(tripId);
  }
);
