import { t } from 'spacetimedb/server';
import spacetimedb from '../../schema';
import {
  toSessionUserRecord,
  toUserAuthRecord,
} from '../../shared/mappers';
import {
  SessionUserRecord,
  UserAuthRecord,
  VerifyEmailResult,
} from '../../shared/types';
import { isExpired, normalizeEmail } from '../../shared/utils';

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

      if (
        !session ||
        session.revokedAt ||
        isExpired(session.expiresAt, tx.timestamp)
      ) {
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
