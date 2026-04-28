import { schema, table, t } from 'spacetimedb/server';

export const UserAccount = table(
  { name: 'user_account' },
  {
    id: t.u64().primaryKey().autoInc(),
    email: t.string().unique(),
    fullName: t.string(),
    country: t.string(),
    passwordHash: t.string(),
    emailVerifiedAt: t.timestamp().optional(),
    createdAt: t.timestamp(),
    updatedAt: t.timestamp(),
  }
);

export const Session = table(
  { name: 'session' },
  {
    id: t.u64().primaryKey().autoInc(),
    userId: t.u64().index('btree'),
    tokenHash: t.string().unique(),
    expiresAt: t.timestamp(),
    revokedAt: t.timestamp().optional(),
    createdAt: t.timestamp(),
  }
);

export const EmailVerificationToken = table(
  { name: 'email_verification_token' },
  {
    id: t.u64().primaryKey().autoInc(),
    userId: t.u64().index('btree'),
    email: t.string(),
    tokenHash: t.string().unique(),
    expiresAt: t.timestamp(),
    consumedAt: t.timestamp().optional(),
    createdAt: t.timestamp(),
  }
);

export const Trip = table(
  { name: 'trip' },
  {
    id: t.u64().primaryKey().autoInc(),
    userId: t.u64().index('btree'),
    title: t.string(),
    description: t.string(),
    coverImageUrl: t.string().optional(),
    imagesJson: t.string(),
    startDate: t.timestamp(),
    endDate: t.timestamp(),
    createdAt: t.timestamp(),
    updatedAt: t.timestamp(),
  }
);

export const Location = table(
  {
    name: 'location',
    indexes: [
      {
        name: 'location_trip_id',
        accessor: 'location_trip_id',
        algorithm: 'btree',
        columns: ['tripId'],
      },
      {
        name: 'location_scheduled_date',
        accessor: 'location_scheduled_date',
        algorithm: 'btree',
        columns: ['scheduledDate'],
      },
    ],
  },
  {
    id: t.u64().primaryKey().autoInc(),
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
  }
);

export const AuthAuditEvent = table(
  {
    name: 'auth_audit_event',
    indexes: [
      {
        name: 'auth_audit_event_user_id',
        accessor: 'auth_audit_event_user_id',
        algorithm: 'btree',
        columns: ['userId'],
      },
    ],
  },
  {
    id: t.u64().primaryKey().autoInc(),
    userId: t.u64().optional(),
    eventType: t.string(),
    eventDetailsJson: t.string(),
    createdAt: t.timestamp(),
  }
);

const spacetimedb = schema({
  userAccount: UserAccount,
  session: Session,
  emailVerificationToken: EmailVerificationToken,
  trip: Trip,
  location: Location,
  authAuditEvent: AuthAuditEvent,
});

export default spacetimedb;
