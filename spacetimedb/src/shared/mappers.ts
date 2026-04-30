import { Timestamp } from 'spacetimedb';

export const toUserAuthRecord = (user: {
  id: bigint;
  email: string;
  fullName: string;
  country: string;
  passwordHash: string;
  emailVerifiedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  country: user.country,
  passwordHash: user.passwordHash,
  emailVerifiedAt: user.emailVerifiedAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const toSessionUserRecord = (user: {
  id: bigint;
  email: string;
  fullName: string;
  country: string;
  emailVerifiedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}) => ({
  id: user.id,
  email: user.email,
  fullName: user.fullName,
  country: user.country,
  emailVerifiedAt: user.emailVerifiedAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const toTripRecord = (trip: {
  id: bigint;
  userId: bigint;
  title: string;
  description: string;
  coverImageUrl?: string;
  imagesJson: string;
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}) => ({
  id: trip.id,
  userId: trip.userId,
  title: trip.title,
  description: trip.description,
  coverImageUrl: trip.coverImageUrl,
  imagesJson: trip.imagesJson,
  startDate: trip.startDate,
  endDate: trip.endDate,
  createdAt: trip.createdAt,
  updatedAt: trip.updatedAt,
});

export const toLocationRecord = (location: {
  id: bigint;
  tripId: bigint;
  locationTitle: string;
  lat: number;
  lng: number;
  scheduledDate?: string;
  order: number;
  placeId?: string;
  placeTypesJson: string;
  placeCategory?: string;
  appreciation?: number;
  priceSentiment?: string;
  notes?: string;
  createdAt: Timestamp;
}) => ({
  id: location.id,
  tripId: location.tripId,
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
  createdAt: location.createdAt,
});
