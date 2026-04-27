import { Timestamp } from 'spacetimedb';
import type { ItineraryLocationInput } from '@/lib/spacetimedb/module_bindings/types';
import { toAppTrip, toAppTripWithLocations } from '@/lib/spacetimedb/types';
import { withSpacetimeDbConnection } from '@/lib/spacetimedb/server';

export interface SaveItineraryLocationInput {
  id?: string;
  locationTitle: string;
  lat: number;
  lng: number;
  scheduledDate: string;
  order: number;
  placeId?: string;
  placeTypes: string[];
  placeCategory?: string;
  appreciation?: number;
  priceSentiment?: string;
  notes?: string;
}

export interface GlobeLocationSource {
  tripTitle: string;
  locationTitle: string;
  lat: number;
  lng: number;
}

function parseU64Id(value: string, label: string) {
  try {
    const id = BigInt(value);

    if (id < BigInt(0)) {
      throw new Error();
    }

    return id;
  } catch {
    throw new Error(`Invalid ${label}`);
  }
}

function normalizeOptionalString(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function toTimestamp(value: Date) {
  return Timestamp.fromDate(value);
}

function toItineraryLocationInput(
  location: SaveItineraryLocationInput
): ItineraryLocationInput {
  return {
    id: location.id ? parseU64Id(location.id, 'location id') : undefined,
    locationTitle: location.locationTitle,
    lat: location.lat,
    lng: location.lng,
    scheduledDate: location.scheduledDate,
    order: location.order,
    placeId: normalizeOptionalString(location.placeId),
    placeTypesJson: JSON.stringify(location.placeTypes),
    placeCategory: normalizeOptionalString(location.placeCategory),
    appreciation: location.appreciation,
    priceSentiment: normalizeOptionalString(location.priceSentiment),
    notes: normalizeOptionalString(location.notes),
  };
}

export async function createTripForUser(
  userId: string,
  input: {
    title: string;
    description: string;
    coverImageUrl?: string;
    startDate: Date;
    endDate: Date;
  }
) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.createTrip({
      userId: parseU64Id(userId, 'user id'),
      title: input.title,
      description: input.description,
      coverImageUrl: normalizeOptionalString(input.coverImageUrl),
      startDate: toTimestamp(input.startDate),
      endDate: toTimestamp(input.endDate),
    });
  });
}

export async function addLocationForUser(
  userId: string,
  tripId: string,
  input: {
    locationTitle: string;
    lat: number;
    lng: number;
  }
) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.addLocation({
      userId: parseU64Id(userId, 'user id'),
      tripId: parseU64Id(tripId, 'trip id'),
      locationTitle: input.locationTitle,
      lat: input.lat,
      lng: input.lng,
    });
  });
}

export async function createItineraryForUser(
  userId: string,
  tripId: string,
  locations: SaveItineraryLocationInput[]
) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.createItinerary({
      userId: parseU64Id(userId, 'user id'),
      tripId: parseU64Id(tripId, 'trip id'),
      locations: locations.map(toItineraryLocationInput),
    });
  });
}

export async function saveItineraryForUser(
  userId: string,
  tripId: string,
  input: {
    locations: SaveItineraryLocationInput[];
    deletedLocationIds: string[];
  }
) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.saveItinerary({
      userId: parseU64Id(userId, 'user id'),
      tripId: parseU64Id(tripId, 'trip id'),
      locations: input.locations.map(toItineraryLocationInput),
      deletedLocationIds: input.deletedLocationIds.map((id) =>
        parseU64Id(id, 'location id')
      ),
    });
  });
}

export async function reorderItineraryDayForUser(
  userId: string,
  tripId: string,
  scheduledDate: string,
  newOrder: string[]
) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.reorderItineraryDay({
      userId: parseU64Id(userId, 'user id'),
      tripId: parseU64Id(tripId, 'trip id'),
      scheduledDate,
      newOrder: newOrder.map((id) => parseU64Id(id, 'location id')),
    });
  });
}

export async function listTripsForUser(userId: string) {
  return await withSpacetimeDbConnection(async (connection) => {
    const trips = await connection.procedures.listTripsByUser({
      userId: parseU64Id(userId, 'user id'),
    });

    return trips.map(toAppTrip);
  });
}

export async function getTripForUser(userId: string, tripId: string) {
  return await withSpacetimeDbConnection(async (connection) => {
    const result = await connection.procedures.getTripWithLocations({
      userId: parseU64Id(userId, 'user id'),
      tripId: parseU64Id(tripId, 'trip id'),
    });

    return result ? toAppTripWithLocations(result) : null;
  });
}

export async function listGlobeLocationsForUser(userId: string) {
  return await withSpacetimeDbConnection(async (connection) => {
    const locations = await connection.procedures.listGlobeLocationsByUser({
      userId: parseU64Id(userId, 'user id'),
    });

    return locations satisfies GlobeLocationSource[];
  });
}
