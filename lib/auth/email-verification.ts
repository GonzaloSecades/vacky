import { createHash, randomBytes } from 'node:crypto';

const EMAIL_VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24;

export function createOpaqueToken() {
  return randomBytes(32).toString('hex');
}

export function hashOpaqueToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function createEmailVerificationToken() {
  const rawToken = createOpaqueToken();

  return {
    rawToken,
    tokenHash: hashOpaqueToken(rawToken),
    expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
  };
}

