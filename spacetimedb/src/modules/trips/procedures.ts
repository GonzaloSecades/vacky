import { t } from 'spacetimedb/server';
import spacetimedb from '../../schema';
import { toTripRecord } from '../../shared/mappers';
import { TripRecord } from '../../shared/types';
import { sortTrips } from '../../shared/utils';

export const list_trips_by_user = spacetimedb.procedure(
  { userId: t.u64() },
  t.array(TripRecord),
  (ctx, { userId }) => {
    return ctx.withTx((tx) => {
      const trips = [...tx.db.trip.userId.filter(userId)];
      return sortTrips(trips).map(toTripRecord);
    });
  }
);
