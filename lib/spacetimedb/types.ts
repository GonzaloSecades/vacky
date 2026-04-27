import type {
  LocationRecord,
  TripRecord,
} from '@/lib/spacetimedb/module_bindings/types';
import type {
  LocationPlaceCategory,
  LocationPriceSentiment,
} from '@/lib/location-metadata';

export interface AppLocation {
  id: string;
  locationTitle: string;
  lat: number;
  lng: number;
  tripId: string;
  scheduledDate: string | null;
  order: number;
  placeId: string | null;
  placeTypes: string[];
  placeCategory: LocationPlaceCategory | null;
  appreciation: number | null;
  priceSentiment: LocationPriceSentiment | null;
  notes: string | null;
  createdAt: Date;
}

export interface AppTrip {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  images: string[];
  startDate: Date;
  endDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppTripWithLocations extends AppTrip {
  locations: AppLocation[];
}

function parseStringArrayJson(value: string) {
  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function toAppLocation(location: LocationRecord): AppLocation {
  return {
    id: location.id.toString(),
    locationTitle: location.locationTitle,
    lat: location.lat,
    lng: location.lng,
    tripId: location.tripId.toString(),
    scheduledDate: location.scheduledDate ?? null,
    order: location.order,
    placeId: location.placeId ?? null,
    placeTypes: parseStringArrayJson(location.placeTypesJson),
    placeCategory: (location.placeCategory as LocationPlaceCategory) ?? null,
    appreciation: location.appreciation ?? null,
    priceSentiment: (location.priceSentiment as LocationPriceSentiment) ?? null,
    notes: location.notes ?? null,
    createdAt: location.createdAt.toDate(),
  };
}

export function toAppTrip(trip: TripRecord): AppTrip {
  return {
    id: trip.id.toString(),
    title: trip.title,
    description: trip.description,
    coverImageUrl: trip.coverImageUrl ?? null,
    images: parseStringArrayJson(trip.imagesJson),
    startDate: trip.startDate.toDate(),
    endDate: trip.endDate.toDate(),
    userId: trip.userId.toString(),
    createdAt: trip.createdAt.toDate(),
    updatedAt: trip.updatedAt.toDate(),
  };
}

export function toAppTripWithLocations(input: {
  trip: TripRecord;
  locations: LocationRecord[];
}): AppTripWithLocations {
  return {
    ...toAppTrip(input.trip),
    locations: input.locations.map(toAppLocation),
  };
}
