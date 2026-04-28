import {
  createOpaqueToken,
  hashOpaqueToken,
} from '@/lib/auth/email-verification';
import {
  createSessionRecord,
  getSessionUserByTokenHash,
  revokeSessionByTokenHash,
} from '@/lib/spacetimedb/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_NAME = 'vacky_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

function getSessionCookieOptions(expires: Date) {
  return {
    httpOnly: true,
    expires,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
  };
}

export interface AppSessionUser {
  id: string;
  email: string;
  name: string;
  image: string | null;
  country: string;
  emailVerifiedAt: Date | null;
}

export interface AppSession {
  user: AppSessionUser;
}

function getSessionExpiryDate() {
  return new Date(Date.now() + SESSION_TTL_MS);
}

async function readSessionCookieValue() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

async function writeSessionCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE_NAME,
    token,
    getSessionCookieOptions(expiresAt)
  );
}

async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE_NAME,
    '',
    getSessionCookieOptions(new Date(0))
  );
}

export async function getSession(): Promise<AppSession | null> {
  const rawToken = await readSessionCookieValue();

  if (!rawToken) {
    return null;
  }

  const tokenHash = hashOpaqueToken(rawToken);
  const sessionUser = await getSessionUserByTokenHash(tokenHash);

  if (!sessionUser) {
    return null;
  }

  return {
    user: {
      id: sessionUser.id,
      email: sessionUser.email,
      name: sessionUser.fullName,
      image: null,
      country: sessionUser.country,
      emailVerifiedAt: sessionUser.emailVerifiedAt,
    },
  };
}

export async function getOptionalSession(): Promise<AppSession | null> {
  try {
    return await getSession();
  } catch {
    return null;
  }
}

export async function requireSession(
  options?: { redirectTo?: string }
): Promise<AppSession> {
  const session = await getSession();

  if (!session) {
    if (options?.redirectTo) {
      redirect(options.redirectTo);
    }

    throw new Error('Not authenticated');
  }

  return session;
}

export async function createAppSession(userId: bigint) {
  const rawToken = createOpaqueToken();
  const expiresAt = getSessionExpiryDate();

  await createSessionRecord({
    userId,
    tokenHash: hashOpaqueToken(rawToken),
    expiresAt,
  });

  await writeSessionCookie(rawToken, expiresAt);
}

export async function destroyAppSession() {
  const rawToken = await readSessionCookieValue();

  if (rawToken) {
    await revokeSessionByTokenHash(hashOpaqueToken(rawToken));
  }

  await clearSessionCookie();
}
