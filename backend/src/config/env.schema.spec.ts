import { validateEnv } from './env.schema.js';

const DATABASE_URL = 'postgresql://vacky:vacky_local@127.0.0.1:5432/vacky_dev';

// The smallest valid input. Each test changes one key.
const base = { DATABASE_URL };

describe('validateEnv', () => {
  it('applies the defaults when only DATABASE_URL is set', () => {
    expect(validateEnv(base)).toEqual({
      NODE_ENV: 'development',
      HOST: '127.0.0.1',
      PORT: 4000,
      LOG_LEVEL: 'info',
      DATABASE_URL,
      DATABASE_POOL_MAX: 10,
      DATABASE_CONNECT_TIMEOUT_MS: 5000,
    });
  });

  it('coerces PORT from a string to a number', () => {
    expect(validateEnv({ ...base, PORT: '4001' }).PORT).toBe(4001);
  });

  it('rejects a PORT that is not a number', () => {
    expect(() => validateEnv({ ...base, PORT: 'abc' })).toThrow();
  });

  it('rejects a PORT that is out of range', () => {
    expect(() => validateEnv({ ...base, PORT: '70000' })).toThrow();
  });

  it('rejects an unknown LOG_LEVEL', () => {
    expect(() => validateEnv({ ...base, LOG_LEVEL: 'verbose' })).toThrow();
  });

  it('names the problem and the bad key in the error message', () => {
    expect(() => validateEnv({ ...base, PORT: 'abc' })).toThrow(
      /Invalid environment configuration[\s\S]*PORT/,
    );
    expect(() => validateEnv({ ...base, LOG_LEVEL: 'verbose' })).toThrow(
      /Invalid environment configuration[\s\S]*LOG_LEVEL/,
    );
  });

  describe('DATABASE_URL', () => {
    it('is required', () => {
      expect(() => validateEnv({})).toThrow(/DATABASE_URL/);
    });

    it('accepts the postgres:// form', () => {
      const url = 'postgres://vacky:vacky_local@127.0.0.1:5432/vacky_dev';
      expect(validateEnv({ DATABASE_URL: url }).DATABASE_URL).toBe(url);
    });

    it.each([
      'http://127.0.0.1:5432/vacky_dev',
      'mysql://vacky:vacky_local@127.0.0.1:3306/vacky_dev',
      'not a url',
      '',
    ])('rejects %j', (url) => {
      expect(() => validateEnv({ DATABASE_URL: url })).toThrow(/DATABASE_URL/);
    });

    it('does not put the password in the error message', () => {
      expect(() =>
        validateEnv({ DATABASE_URL: 'mysql://vacky:secret-db-pass@h/db' }),
      ).toThrow(
        expect.objectContaining({
          message: expect.not.stringContaining('secret-db-pass'),
        }),
      );
    });

    it.each([
      'http://127.0.0.1:5432/vacky_dev',
      'mysql://vacky:vacky_local@127.0.0.1:3306/vacky_dev',
      'not a url',
      '',
      // No host.
      'postgres:garbage',
      'postgresql://',
      'postgresql:///vacky_dev',
      // No database name, or more than one path segment.
      'postgresql://vacky:vacky_local@127.0.0.1:5432',
      'postgresql://vacky:vacky_local@127.0.0.1:5432/',
      'postgresql://vacky:vacky_local@127.0.0.1:5432/vacky/dev',
    ])('rejects %j', (url) => {
      expect(() => validateEnv({ DATABASE_URL: url })).toThrow(/DATABASE_URL/);
    });

    it('accepts query parameters after the database name', () => {
      const url =
        'postgresql://vacky:vacky_local@127.0.0.1:5432/vacky_dev?sslmode=disable';
      expect(validateEnv({ DATABASE_URL: url }).DATABASE_URL).toBe(url);
    });
  });

  describe('pool settings', () => {
    it('coerces DATABASE_POOL_MAX and DATABASE_CONNECT_TIMEOUT_MS', () => {
      const env = validateEnv({
        ...base,
        DATABASE_POOL_MAX: '5',
        DATABASE_CONNECT_TIMEOUT_MS: '2000',
      });
      expect(env.DATABASE_POOL_MAX).toBe(5);
      expect(env.DATABASE_CONNECT_TIMEOUT_MS).toBe(2000);
    });

    it.each(['0', '101', '2.5', 'ten'])(
      'rejects DATABASE_POOL_MAX=%j',
      (value) => {
        expect(() =>
          validateEnv({ ...base, DATABASE_POOL_MAX: value }),
        ).toThrow(/DATABASE_POOL_MAX/);
      },
    );

    it.each(['0', '99', '60001'])(
      'rejects DATABASE_CONNECT_TIMEOUT_MS=%j',
      (value) => {
        expect(() =>
          validateEnv({ ...base, DATABASE_CONNECT_TIMEOUT_MS: value }),
        ).toThrow(/DATABASE_CONNECT_TIMEOUT_MS/);
      },
    );
  });
});
