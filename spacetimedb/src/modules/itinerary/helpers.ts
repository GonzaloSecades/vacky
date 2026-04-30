import { Timestamp } from 'spacetimedb';

type LocationInsertRow = {
  id: bigint;
  tripId: bigint;
  locationTitle: string;
  lat: number;
  lng: number;
  scheduledDate: string | undefined;
  order: number;
  placeId: string | undefined;
  placeTypesJson: string;
  placeCategory: string | undefined;
  appreciation: number | undefined;
  priceSentiment: string | undefined;
  notes: string | undefined;
  createdAt: Timestamp;
};

type LocationInsertContext = {
  timestamp: Timestamp;
  db: {
    location: {
      insert: (location: LocationInsertRow) => unknown;
    };
  };
};

export const insertLocation = (
  ctx: LocationInsertContext,
  tripId: bigint,
  location: {
    locationTitle: string;
    lat: number;
    lng: number;
    scheduledDate?: string;
    order: number;
    placeId?: string;
    placeTypesJson?: string;
    placeCategory?: string;
    appreciation?: number;
    priceSentiment?: string;
    notes?: string;
  }
) => {
  ctx.db.location.insert({
    id: 0n,
    tripId,
    locationTitle: location.locationTitle,
    lat: location.lat,
    lng: location.lng,
    scheduledDate: location.scheduledDate,
    order: location.order,
    placeId: location.placeId,
    placeTypesJson: location.placeTypesJson ?? '[]',
    placeCategory: location.placeCategory,
    appreciation: location.appreciation,
    priceSentiment: location.priceSentiment,
    notes: location.notes,
    createdAt: ctx.timestamp,
  });
};
