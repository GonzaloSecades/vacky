import { table, t } from 'spacetimedb/server';

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
