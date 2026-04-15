'use server';

import { prisma } from '@/app/db';
import { auth } from '@/auth';
import {
  getTripDateRange,
  isDateKeyWithinRange,
  isItineraryDateKey,
} from '@/lib/itinerary-dates';
import {
  inferPlaceCategory,
  isLocationPlaceCategory,
  isLocationPriceSentiment,
  type LocationPlaceCategory,
  type LocationPriceSentiment,
} from '@/lib/location-metadata';
import { redirect } from 'next/navigation';

export interface ItineraryActionState {
  error?: string;
}

interface RawItineraryRow {
  id?: unknown;
  clientId?: unknown;
  locationTitle?: unknown;
  lat?: unknown;
  lng?: unknown;
  scheduledDate?: unknown;
  placeId?: unknown;
  placeTypes?: unknown;
  placeCategory?: unknown;
  appreciation?: unknown;
  priceSentiment?: unknown;
  notes?: unknown;
}

interface ItineraryRow {
  id?: string;
  locationTitle: string;
  lat: number;
  lng: number;
  scheduledDate: string;
  placeId?: string;
  placeTypes: string[];
  placeCategory?: LocationPlaceCategory;
  appreciation?: number;
  priceSentiment?: LocationPriceSentiment;
  notes?: string;
}

interface ExistingLocation {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
}

const COORDINATE_TOLERANCE = 0.000001;

function parseJsonField<T>(formData: FormData, key: string, fallback: T): T {
  const value = formData.get(key);
  if (typeof value !== 'string' || value.trim() === '') {
    return fallback;
  }

  return JSON.parse(value) as T;
}

function parseCoordinate(value: unknown) {
  const coordinate = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(coordinate) ? coordinate : null;
}

function normalizeOptionalString(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeStringArray(value: unknown) {
  if (value === undefined || value === null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error('Invalid place types');
  }

  return value.map((item) => {
    if (typeof item !== 'string') {
      throw new Error('Invalid place types');
    }

    return item.trim();
  });
}

function normalizeOptionalInteger(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const numberValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isInteger(numberValue)) {
    throw new Error('Your rating must be a whole number');
  }

  return numberValue;
}

function normalizeOptionalPriceSentiment(value: unknown) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (!isLocationPriceSentiment(value)) {
    throw new Error('Invalid cost feel');
  }

  return value;
}

function normalizeOptionalPlaceCategory(
  value: unknown,
  placeTypes: string[],
  locationTitle: string
) {
  const inferredCategory =
    placeTypes.length > 0
      ? inferPlaceCategory(placeTypes, locationTitle)
      : undefined;

  if (value === undefined || value === null || value === '') {
    return inferredCategory;
  }

  if (!isLocationPlaceCategory(value)) {
    throw new Error('Invalid place category');
  }

  if (
    value === 'GENERIC' &&
    inferredCategory &&
    inferredCategory !== 'GENERIC'
  ) {
    return inferredCategory;
  }

  return value;
}

function parseRows(formData: FormData): ItineraryRow[] {
  const rawRows = parseJsonField<RawItineraryRow[]>(formData, 'locations', []);
  if (!Array.isArray(rawRows)) {
    throw new Error('Invalid itinerary payload');
  }

  return rawRows.map((row) => {
    const locationTitle = normalizeOptionalString(row.locationTitle);
    const scheduledDate = normalizeOptionalString(row.scheduledDate);
    const lat = parseCoordinate(row.lat);
    const lng = parseCoordinate(row.lng);
    const placeTypes = normalizeStringArray(row.placeTypes);
    const appreciation = normalizeOptionalInteger(row.appreciation);
    const priceSentiment = normalizeOptionalPriceSentiment(row.priceSentiment);
    const placeCategory = normalizeOptionalPlaceCategory(
      row.placeCategory,
      placeTypes,
      locationTitle ?? ''
    );

    if (!locationTitle || !scheduledDate || lat === null || lng === null) {
      throw new Error('Every location needs a selected place and date');
    }

    if (appreciation !== undefined && (appreciation < 1 || appreciation > 5)) {
      throw new Error('Your rating must be between 1 and 5');
    }

    return {
      id: normalizeOptionalString(row.id),
      locationTitle,
      lat,
      lng,
      scheduledDate,
      placeId: normalizeOptionalString(row.placeId),
      placeTypes,
      placeCategory,
      appreciation,
      priceSentiment,
      notes: normalizeOptionalString(row.notes),
    };
  });
}

function parseDeletedLocationIds(formData: FormData) {
  const deletedLocationIds = parseJsonField<unknown[]>(
    formData,
    'deletedLocationIds',
    []
  );

  if (!Array.isArray(deletedLocationIds)) {
    throw new Error('Invalid deleted location payload');
  }

  return deletedLocationIds.map((id) => {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid deleted location payload');
    }

    return id;
  });
}

function rejectDuplicateIds(ids: string[], message: string) {
  if (new Set(ids).size !== ids.length) {
    throw new Error(message);
  }
}

function validateDateRange(
  rows: ItineraryRow[],
  startDateKey: string,
  endDateKey: string
) {
  for (const row of rows) {
    if (
      !isItineraryDateKey(row.scheduledDate) ||
      !isDateKeyWithinRange(row.scheduledDate, startDateKey, endDateKey)
    ) {
      throw new Error('Location dates must be inside the trip date range');
    }
  }
}

function ensureCreateRowsHaveSelectedPlaces(rows: ItineraryRow[]) {
  for (const row of rows) {
    if (!row.placeId) {
      throw new Error('Every new itinerary location must use autocomplete');
    }
  }
}

function sameCoordinates(left: number, right: number) {
  /** Google Places coordinates are precise enough that tiny decimal differences can
   * appear after storage/serialization even when the place has not meaningfully
   * changed. @COORDINATE_TOLERANCE (0.000001 degrees, about 0.11 m at the equator)
   * treats those insignificant differences as equal while still detecting real
   * location changes.
   */
  return Math.abs(left - right) <= COORDINATE_TOLERANCE;
}

function isExistingLocationUnchanged(
  row: ItineraryRow,
  existingLocation: ExistingLocation
) {
  return (
    row.locationTitle === existingLocation.locationTitle &&
    sameCoordinates(row.lat, existingLocation.lat) &&
    sameCoordinates(row.lng, existingLocation.lng)
  );
}

function applySameDayOrder(rows: ItineraryRow[]) {
  const nextOrderByDate = new Map<string, number>();

  return rows.map((row) => {
    const order = nextOrderByDate.get(row.scheduledDate) ?? 0;
    nextOrderByDate.set(row.scheduledDate, order + 1);

    return { ...row, order };
  });
}

export async function createItinerary(
  tripId: string,
  _prevState: ItineraryActionState,
  formData: FormData
): Promise<ItineraryActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  let rows: ItineraryRow[];
  try {
    rows = parseRows(formData);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Invalid form' };
  }

  if (rows.length === 0) {
    return { error: 'Add at least one itinerary location' };
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user.id,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      locations: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!trip) {
    throw new Error('Trip not found');
  }

  if (trip.locations.length > 0) {
    return { error: 'This trip already has an itinerary. Use edit instead.' };
  }

  const { startDateKey, endDateKey } = getTripDateRange(trip);

  try {
    validateDateRange(rows, startDateKey, endDateKey);
    ensureCreateRowsHaveSelectedPlaces(rows);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Invalid form' };
  }

  const orderedRows = applySameDayOrder(rows);

  await prisma.$transaction(
    orderedRows.map((row) =>
      prisma.location.create({
        data: {
          locationTitle: row.locationTitle,
          lat: row.lat,
          lng: row.lng,
          scheduledDate: row.scheduledDate,
          order: row.order,
          placeId: row.placeId,
          placeTypes: row.placeTypes,
          placeCategory: row.placeCategory,
          appreciation: row.appreciation,
          priceSentiment: row.priceSentiment,
          notes: row.notes,
          tripId,
        },
      })
    )
  );

  redirect(`/trips/${tripId}`);
}

export async function saveItinerary(
  tripId: string,
  _prevState: ItineraryActionState,
  formData: FormData
): Promise<ItineraryActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  let rows: ItineraryRow[];
  let deletedLocationIds: string[];
  try {
    rows = parseRows(formData);
    deletedLocationIds = parseDeletedLocationIds(formData);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Invalid form' };
  }

  if (rows.length === 0) {
    return { error: 'Keep at least one itinerary location' };
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user.id,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      locations: {
        select: {
          id: true,
          locationTitle: true,
          lat: true,
          lng: true,
        },
      },
    },
  });

  if (!trip) {
    throw new Error('Trip not found');
  }

  const existingLocations = new Map(
    trip.locations.map((location) => [location.id, location])
  );
  const retainedExistingIds = rows
    .map((row) => row.id)
    .filter((id): id is string => Boolean(id));

  try {
    rejectDuplicateIds(retainedExistingIds, 'Duplicate itinerary locations');
    rejectDuplicateIds(deletedLocationIds, 'Duplicate deleted locations');

    for (const locationId of [...retainedExistingIds, ...deletedLocationIds]) {
      if (!existingLocations.has(locationId)) {
        throw new Error('Invalid itinerary location');
      }
    }

    for (const locationId of retainedExistingIds) {
      if (deletedLocationIds.includes(locationId)) {
        throw new Error('A location cannot be both retained and deleted');
      }
    }

    for (const locationId of existingLocations.keys()) {
      if (
        !retainedExistingIds.includes(locationId) &&
        !deletedLocationIds.includes(locationId)
      ) {
        throw new Error('Submitted itinerary is missing an existing location');
      }
    }

    const { startDateKey, endDateKey } = getTripDateRange(trip);
    validateDateRange(rows, startDateKey, endDateKey);

    for (const row of rows) {
      if (!row.id) {
        if (!row.placeId) {
          throw new Error('Every new itinerary location must use autocomplete');
        }
        continue;
      }

      const existingLocation = existingLocations.get(row.id);
      if (!existingLocation) {
        throw new Error('Invalid itinerary location');
      }

      if (!isExistingLocationUnchanged(row, existingLocation) && !row.placeId) {
        throw new Error('Changed locations must use autocomplete');
      }
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Invalid form' };
  }

  const orderedRows = applySameDayOrder(rows);

  await prisma.$transaction([
    ...(deletedLocationIds.length > 0
      ? [
          prisma.location.deleteMany({
            where: {
              tripId,
              id: {
                in: deletedLocationIds,
              },
            },
          }),
        ]
      : []),
    ...orderedRows.map((row) =>
      row.id
        ? prisma.location.updateMany({
            where: {
              id: row.id,
              tripId,
            },
            data: {
              locationTitle: row.locationTitle,
              lat: row.lat,
              lng: row.lng,
              scheduledDate: row.scheduledDate,
              order: row.order,
              placeId: row.placeId ?? null,
              placeTypes: row.placeTypes,
              placeCategory: row.placeCategory ?? null,
              appreciation: row.appreciation ?? null,
              priceSentiment: row.priceSentiment ?? null,
              notes: row.notes ?? null,
            },
          })
        : prisma.location.create({
            data: {
              locationTitle: row.locationTitle,
              lat: row.lat,
              lng: row.lng,
              scheduledDate: row.scheduledDate,
              order: row.order,
              placeId: row.placeId,
              placeTypes: row.placeTypes,
              placeCategory: row.placeCategory,
              appreciation: row.appreciation,
              priceSentiment: row.priceSentiment,
              notes: row.notes,
              tripId,
            },
          })
    ),
  ]);

  redirect(`/trips/${tripId}`);
}
