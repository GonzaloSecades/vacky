import { Timestamp } from 'spacetimedb';
import { withSpacetimeDbConnection } from '@/lib/spacetimedb/server';

export interface SpacetimeDbAuthUser {
  id: bigint;
  email: string;
  fullName: string;
  country: string;
  passwordHash: string;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpacetimeDbSessionUser {
  id: string;
  email: string;
  fullName: string;
  country: string;
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerifyEmailTokenResult {
  ok: boolean;
  reason: string | null;
  userId: bigint | null;
  email: string | null;
}

interface RegisterUserInput {
  email: string;
  fullName: string;
  country: string;
  passwordHash: string;
  verificationTokenHash: string;
  verificationExpiresAt: Date;
}

interface CreateSessionInput {
  userId: bigint;
  tokenHash: string;
  expiresAt: Date;
}

function toDate(value?: Timestamp) {
  return value ? value.toDate() : null;
}

function mapAuthUser(rawUser: {
  id: bigint;
  email: string;
  fullName: string;
  country: string;
  passwordHash: string;
  emailVerifiedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}): SpacetimeDbAuthUser {
  return {
    id: rawUser.id,
    email: rawUser.email,
    fullName: rawUser.fullName,
    country: rawUser.country,
    passwordHash: rawUser.passwordHash,
    emailVerifiedAt: toDate(rawUser.emailVerifiedAt),
    createdAt: rawUser.createdAt.toDate(),
    updatedAt: rawUser.updatedAt.toDate(),
  };
}

function mapSessionUser(rawUser: {
  id: bigint;
  email: string;
  fullName: string;
  country: string;
  emailVerifiedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}): SpacetimeDbSessionUser {
  return {
    id: rawUser.id.toString(),
    email: rawUser.email,
    fullName: rawUser.fullName,
    country: rawUser.country,
    emailVerifiedAt: toDate(rawUser.emailVerifiedAt),
    createdAt: rawUser.createdAt.toDate(),
    updatedAt: rawUser.updatedAt.toDate(),
  };
}

export async function registerUserAccount(input: RegisterUserInput) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.createUserAccount({
      ...input,
      verificationExpiresAt: Timestamp.fromDate(input.verificationExpiresAt),
    });
  });
}

export async function getUserAuthByEmail(email: string) {
  return await withSpacetimeDbConnection(async (connection) => {
    const user = await connection.procedures.getUserAuthByEmail({ email });
    return user ? mapAuthUser(user) : null;
  });
}

export async function createSessionRecord(input: CreateSessionInput) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.createSession({
      ...input,
      expiresAt: Timestamp.fromDate(input.expiresAt),
    });
  });
}

export async function getSessionUserByTokenHash(tokenHash: string) {
  return await withSpacetimeDbConnection(async (connection) => {
    const user = await connection.procedures.getSessionUserByTokenHash({
      tokenHash,
    });

    return user ? mapSessionUser(user) : null;
  });
}

export async function revokeSessionByTokenHash(tokenHash: string) {
  await withSpacetimeDbConnection(async (connection) => {
    await connection.reducers.revokeSessionByTokenHash({ tokenHash });
  });
}

export async function verifyEmailToken(tokenHash: string) {
  return await withSpacetimeDbConnection(async (connection) => {
    const result = await connection.procedures.verifyEmailToken({ tokenHash });

    return {
      ok: result.ok,
      reason: result.reason ?? null,
      userId: result.userId ?? null,
      email: result.email ?? null,
    } satisfies VerifyEmailTokenResult;
  });
}

