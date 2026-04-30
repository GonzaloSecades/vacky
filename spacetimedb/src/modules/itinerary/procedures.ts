import { t } from 'spacetimedb/server';
import spacetimedb from '../../schema';
import { toLocationRecord, toTripRecord } from '../../shared/mappers';
import {
  GlobeLocationRecord,
  TripWithLocationsRecord,
} from '../../shared/types';
import { sortLocations } from '../../shared/utils';

export const get_trip_with_locations = spacetimedb.procedure(
  { userId: t.u64(), tripId: t.u64() },
  t.option(TripWithLocationsRecord),
  (ctx, { userId, tripId }) => {
    return ctx.withTx((tx) => {
      const trip = tx.db.trip.id.find(tripId);

      if (!trip || trip.userId !== userId) {
        return undefined;
      }

      const locations = sortLocations([
        ...tx.db.location.location_trip_id.filter(tripId),
      ]).map(toLocationRecord);

      return {
        trip: toTripRecord(trip),
        locations,
      };
    });
  }
);

export const list_globe_locations_by_user = spacetimedb.procedure(
  { userId: t.u64() },
  t.array(GlobeLocationRecord),
  (ctx, { userId }) => {
    return ctx.withTx((tx) => {
      const rows: {
        tripTitle: string;
        locationTitle: string;
        lat: number;
        lng: number;
      }[] = [];

      for (const trip of tx.db.trip.userId.filter(userId)) {
        for (const location of tx.db.location.location_trip_id.filter(trip.id)) {
          rows.push({
            tripTitle: trip.title,
            locationTitle: location.locationTitle,
            lat: location.lat,
            lng: location.lng,
          });
        }
      }

      return rows;
    });
  }
);
