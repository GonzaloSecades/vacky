import { t } from 'spacetimedb/server';
import spacetimedb from '../../schema';
import { requireOwnedTrip } from '../../shared/guards';
import { ItineraryLocationInput } from '../../shared/types';
import { insertLocation } from './helpers';

export const add_location = spacetimedb.reducer(
  {
    userId: t.u64(),
    tripId: t.u64(),
    locationTitle: t.string(),
    lat: t.f64(),
    lng: t.f64(),
  },
  (ctx, { userId, tripId, locationTitle, lat, lng }) => {
    requireOwnedTrip(ctx.db, userId, tripId);

    const existingLocations = [...ctx.db.location.location_trip_id.filter(tripId)];
    insertLocation(ctx, tripId, {
      locationTitle,
      lat,
      lng,
      order: existingLocations.length,
    });
  }
);

export const create_itinerary = spacetimedb.reducer(
  {
    userId: t.u64(),
    tripId: t.u64(),
    locations: t.array(ItineraryLocationInput),
  },
  (ctx, { userId, tripId, locations }) => {
    requireOwnedTrip(ctx.db, userId, tripId);

    if ([...ctx.db.location.location_trip_id.filter(tripId)].length > 0) {
      throw new Error('This trip already has an itinerary. Use edit instead.');
    }

    for (const location of locations) {
      insertLocation(ctx, tripId, location);
    }
  }
);

export const save_itinerary = spacetimedb.reducer(
  {
    userId: t.u64(),
    tripId: t.u64(),
    locations: t.array(ItineraryLocationInput),
    deletedLocationIds: t.array(t.u64()),
  },
  (ctx, { userId, tripId, locations, deletedLocationIds }) => {
    requireOwnedTrip(ctx.db, userId, tripId);

    const existingLocations = new Map(
      [...ctx.db.location.location_trip_id.filter(tripId)].map((location) => [
        location.id,
        location,
      ])
    );

    for (const locationId of deletedLocationIds) {
      const existingLocation = existingLocations.get(locationId);
      if (!existingLocation) {
        throw new Error('Invalid itinerary location');
      }

      ctx.db.location.id.delete(locationId);
      existingLocations.delete(locationId);
    }

    for (const location of locations) {
      if (!location.id) {
        insertLocation(ctx, tripId, location);
        continue;
      }

      const existingLocation = existingLocations.get(location.id);
      if (!existingLocation) {
        throw new Error('Invalid itinerary location');
      }

      ctx.db.location.id.update({
        ...existingLocation,
        locationTitle: location.locationTitle,
        lat: location.lat,
        lng: location.lng,
        scheduledDate: location.scheduledDate,
        order: location.order,
        placeId: location.placeId,
        placeTypesJson: location.placeTypesJson,
        placeCategory: location.placeCategory,
        appreciation: location.appreciation,
        priceSentiment: location.priceSentiment,
        notes: location.notes,
      });
    }
  }
);

export const reorder_itinerary_day = spacetimedb.reducer(
  {
    userId: t.u64(),
    tripId: t.u64(),
    scheduledDate: t.string(),
    newOrder: t.array(t.u64()),
  },
  (ctx, { userId, tripId, scheduledDate, newOrder }) => {
    requireOwnedTrip(ctx.db, userId, tripId);

    const uniqueLocationIds = new Set(newOrder);
    if (uniqueLocationIds.size !== newOrder.length) {
      throw new Error('Invalid itinerary order');
    }

    for (let index = 0; index < newOrder.length; index += 1) {
      const locationId = newOrder[index];
      const location = ctx.db.location.id.find(locationId);

      if (
        !location ||
        location.tripId !== tripId ||
        location.scheduledDate !== scheduledDate
      ) {
        throw new Error('Invalid itinerary order');
      }

      ctx.db.location.id.update({
        ...location,
        order: index,
      });
    }
  }
);
