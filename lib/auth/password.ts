import argon2 from 'argon2';

const PASSWORD_HASH_OPTIONS: argon2.Options & { raw?: false } = {
  type: argon2.argon2id,
  memoryCost: 19_456,
  parallelism: 1,
  timeCost: 2,
};

export async function hashPassword(password: string) {
  return await argon2.hash(password, PASSWORD_HASH_OPTIONS);
}

export async function verifyPassword(hash: string, password: string) {
  return await argon2.verify(hash, password, PASSWORD_HASH_OPTIONS);
}

