import { t } from 'spacetimedb/server';

export const UserAuthRecord = t.object('UserAuthRecord', {
  id: t.u64(),
  email: t.string(),
  fullName: t.string(),
  country: t.string(),
  passwordHash: t.string(),
  emailVerifiedAt: t.timestamp().optional(),
  createdAt: t.timestamp(),
  updatedAt: t.timestamp(),
});

export const SessionUserRecord = t.object('SessionUserRecord', {
  id: t.u64(),
  email: t.string(),
  fullName: t.string(),
  country: t.string(),
  emailVerifiedAt: t.timestamp().optional(),
  createdAt: t.timestamp(),
  updatedAt: t.timestamp(),
});

export const VerifyEmailResult = t.object('VerifyEmailResult', {
  ok: t.bool(),
  reason: t.string().optional(),
  userId: t.u64().optional(),
  email: t.string().optional(),
});

export const TripRecord = t.object('TripRecord', {
  id: t.u64(),
  userId: t.u64(),
  title: t.string(),
  description: t.string(),
  coverImageUrl: t.string().optional(),
  imagesJson: t.string(),
  startDate: t.timestamp(),
  endDate: t.timestamp(),
  createdAt: t.timestamp(),
  updatedAt: t.timestamp(),
});

export const LocationRecord = t.object('LocationRecord', {
  id: t.u64(),
  tripId: t.u64(),
  locationTitle: t.string(),
  lat: t.f64(),
  lng: t.f64(),
  scheduledDate: t.string().optional(),
  order: t.i32(),
  placeId: t.string().optional(),
  placeTypesJson: t.string(),
  placeCategory: t.string().optional(),
  appreciation: t.i32().optional(),
  priceSentiment: t.string().optional(),
  notes: t.string().optional(),
  createdAt: t.timestamp(),
});

export const TripWithLocationsRecord = t.object('TripWithLocationsRecord', {
  trip: TripRecord,
  locations: t.array(LocationRecord),
});

export const GlobeLocationRecord = t.object('GlobeLocationRecord', {
  tripTitle: t.string(),
  locationTitle: t.string(),
  lat: t.f64(),
  lng: t.f64(),
});

export const ItineraryLocationInput = t.object('ItineraryLocationInput', {
  id: t.u64().optional(),
  locationTitle: t.string(),
  lat: t.f64(),
  lng: t.f64(),
  scheduledDate: t.string(),
  order: t.i32(),
  placeId: t.string().optional(),
  placeTypesJson: t.string(),
  placeCategory: t.string().optional(),
  appreciation: t.i32().optional(),
  priceSentiment: t.string().optional(),
  notes: t.string().optional(),
});
