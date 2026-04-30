import { t } from 'spacetimedb/server';
import spacetimedb from '../../schema';
import { normalizeEmail } from '../../shared/utils';

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
