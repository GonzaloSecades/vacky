import { Timestamp } from 'spacetimedb';
import { t } from 'spacetimedb/server';
import spacetimedb from './schema';

const UserAuthRecord = t.object('UserAuthRecord', {
  id: t.u64(),
  email: t.string(),
  fullName: t.string(),
  country: t.string(),
  passwordHash: t.string(),
  emailVerifiedAt: t.timestamp().optional(),
  createdAt: t.timestamp(),
  updatedAt: t.timestamp(),
});

const SessionUserRecord = t.object('SessionUserRecord', {
  id: t.u64(),
  email: t.string(),
  fullName: t.string(),
  country: t.string(),
  emailVerifiedAt: t.timestamp().optional(),
  createdAt: t.timestamp(),
  updatedAt: t.timestamp(),
});

const VerifyEmailResult = t.object('VerifyEmailResult', {
  ok: t.bool(),
  reason: t.string().optional(),
  userId: t.u64().optional(),
  email: t.string().optional(),
});

const TripRecord = t.object('TripRecord', {
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

const LocationRecord = t.object('LocationRecord', {
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

const TripWithLocationsRecord = t.object('TripWithLocationsRecord', {
  trip: TripRecord,
  locations: t.array(LocationRecord),
});

const GlobeLocationRecord = t.object('GlobeLocationRecord', {
  tripTitle: t.string(),
  locationTitle: t.string(),
  lat: t.f64(),
  lng: t.f64(),
});

const ItineraryLocationInput = t.object('ItineraryLocationInput', {
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

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const isExpired = (value: Timestamp, now: Timestamp) =>
  value.microsSinceUnixEpoch <= now.microsSinceUnixEpoch;

const compareMaybeStrings = (left?: string, right?: string) => {
  if (left && right) return left.localeCompare(right);
  if (left) return -1;
  if (right) return 1;
  return 0;
};

const toUserAuthRecord = (user: {
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

const toSessionUserRecord = (user: {
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

const toTripRecord = (trip: {
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

const toLocationRecord = (location: {
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

const sortTrips = <T extends { startDate: Timestamp }>(trips: T[]) =>
  trips.sort((left, right) => {
    const diff =
      right.startDate.microsSinceUnixEpoch -
      left.startDate.microsSinceUnixEpoch;
    if (diff > 0n) return 1;
    if (diff < 0n) return -1;
    return 0;
  });

const sortLocations = <T extends { scheduledDate?: string; order: number; locationTitle: string }>(
  locations: T[]
) =>
  locations.sort((left, right) => {
    const dateComparison = compareMaybeStrings(
      left.scheduledDate,
      right.scheduledDate
    );
    if (dateComparison !== 0) return dateComparison;
    if (left.order !== right.order) return left.order - right.order;
    return left.locationTitle.localeCompare(right.locationTitle);
  });

type TripLookupDb = {
  trip: {
    id: {
      find: (tripId: bigint) => { userId: bigint } | null;
    };
  };
};

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

const requireOwnedTrip = (db: TripLookupDb, userId: bigint, tripId: bigint) => {
  const trip = db.trip.id.find(tripId);

  if (!trip || trip.userId !== userId) {
    throw new Error('Trip not found');
  }

  return trip;
};

const insertLocation = (
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

export const init = spacetimedb.reducer((ctx) => {
  void ctx;
});

export const create_user_account = spacetimedb.reducer(
  {
    email: t.string(),
    fullName: t.string(),
    country: t.string(),
    passwordHash: t.string(),
    verificationTokenHash: t.string(),
    verificationExpiresAt: t.timestamp(),
  },
  (
    ctx,
    {
      email,
      fullName,
      country,
      passwordHash,
      verificationTokenHash,
      verificationExpiresAt,
    }
  ) => {
    const normalizedEmail = normalizeEmail(email);
    const trimmedName = fullName.trim();
    const trimmedCountry = country.trim();

    if (!normalizedEmail || !trimmedName || !trimmedCountry || !passwordHash) {
      throw new Error('Missing required user fields');
    }

    if (ctx.db.userAccount.email.find(normalizedEmail)) {
      throw new Error('A user with this email already exists');
    }

    const user = ctx.db.userAccount.insert({
      id: 0n,
      email: normalizedEmail,
      fullName: trimmedName,
      country: trimmedCountry,
      passwordHash,
      emailVerifiedAt: undefined,
      createdAt: ctx.timestamp,
      updatedAt: ctx.timestamp,
    });

    ctx.db.emailVerificationToken.insert({
      id: 0n,
      userId: user.id,
      email: normalizedEmail,
      tokenHash: verificationTokenHash,
      expiresAt: verificationExpiresAt,
      consumedAt: undefined,
      createdAt: ctx.timestamp,
    });

    ctx.db.authAuditEvent.insert({
      id: 0n,
      userId: user.id,
      eventType: 'user_registered',
      eventDetailsJson: JSON.stringify({ email: normalizedEmail }),
      createdAt: ctx.timestamp,
    });
  }
);

export const create_session = spacetimedb.reducer(
  {
    userId: t.u64(),
    tokenHash: t.string(),
    expiresAt: t.timestamp(),
  },
  (ctx, { userId, tokenHash, expiresAt }) => {
    const user = ctx.db.userAccount.id.find(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (ctx.db.session.tokenHash.find(tokenHash)) {
      throw new Error('Session token already exists');
    }

    ctx.db.session.insert({
      id: 0n,
      userId,
      tokenHash,
      expiresAt,
      revokedAt: undefined,
      createdAt: ctx.timestamp,
    });

    ctx.db.authAuditEvent.insert({
      id: 0n,
      userId,
      eventType: 'session_created',
      eventDetailsJson: JSON.stringify({}),
      createdAt: ctx.timestamp,
    });
  }
);

export const revoke_session_by_token_hash = spacetimedb.reducer(
  { tokenHash: t.string() },
  (ctx, { tokenHash }) => {
    const session = ctx.db.session.tokenHash.find(tokenHash);

    if (!session || session.revokedAt) {
      return;
    }

    ctx.db.session.id.update({
      ...session,
      revokedAt: ctx.timestamp,
    });

    ctx.db.authAuditEvent.insert({
      id: 0n,
      userId: session.userId,
      eventType: 'session_revoked',
      eventDetailsJson: JSON.stringify({}),
      createdAt: ctx.timestamp,
    });
  }
);

export const get_user_auth_by_email = spacetimedb.procedure(
  { email: t.string() },
  t.option(UserAuthRecord),
  (ctx, { email }) => {
    return ctx.withTx((tx) => {
      const user = tx.db.userAccount.email.find(normalizeEmail(email));
      return user ? toUserAuthRecord(user) : undefined;
    });
  }
);

export const get_session_user_by_token_hash = spacetimedb.procedure(
  { tokenHash: t.string() },
  t.option(SessionUserRecord),
  (ctx, { tokenHash }) => {
    return ctx.withTx((tx) => {
      const session = tx.db.session.tokenHash.find(tokenHash);

      if (!session || session.revokedAt || isExpired(session.expiresAt, tx.timestamp)) {
        return undefined;
      }

      const user = tx.db.userAccount.id.find(session.userId);
      return user ? toSessionUserRecord(user) : undefined;
    });
  }
);

export const verify_email_token = spacetimedb.procedure(
  { tokenHash: t.string() },
  VerifyEmailResult,
  (ctx, { tokenHash }) => {
    return ctx.withTx((tx) => {
      const token = tx.db.emailVerificationToken.tokenHash.find(tokenHash);

      if (!token) {
        return {
          ok: false,
          reason: 'invalid_token',
          userId: undefined,
          email: undefined,
        };
      }

      if (token.consumedAt) {
        return {
          ok: false,
          reason: 'token_already_used',
          userId: undefined,
          email: undefined,
        };
      }

      if (isExpired(token.expiresAt, tx.timestamp)) {
        return {
          ok: false,
          reason: 'token_expired',
          userId: undefined,
          email: undefined,
        };
      }

      const user = tx.db.userAccount.id.find(token.userId);
      if (!user) {
        return {
          ok: false,
          reason: 'user_not_found',
          userId: undefined,
          email: undefined,
        };
      }

      tx.db.userAccount.id.update({
        ...user,
        emailVerifiedAt: user.emailVerifiedAt ?? tx.timestamp,
        updatedAt: tx.timestamp,
      });

      tx.db.emailVerificationToken.id.update({
        ...token,
        consumedAt: tx.timestamp,
      });

      tx.db.authAuditEvent.insert({
        id: 0n,
        userId: user.id,
        eventType: 'email_verified',
        eventDetailsJson: JSON.stringify({ email: user.email }),
        createdAt: tx.timestamp,
      });

      return {
        ok: true,
        reason: undefined,
        userId: user.id,
        email: user.email,
      };
    });
  }
);

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

export default spacetimedb;
