import { validateEnv } from './env.schema.js';

describe('validateEnv', () => {
  it('applies the defaults to an empty object', () => {
    expect(validateEnv({})).toEqual({
      NODE_ENV: 'development',
      HOST: '127.0.0.1',
      PORT: 4000,
      LOG_LEVEL: 'info',
    });
  });

  it('coerces PORT from a string to a number', () => {
    expect(validateEnv({ PORT: '4001' }).PORT).toBe(4001);
  });

  it('rejects a PORT that is not a number', () => {
    expect(() => validateEnv({ PORT: 'abc' })).toThrow();
  });

  it('rejects a PORT that is out of range', () => {
    expect(() => validateEnv({ PORT: '70000' })).toThrow();
  });

  it('rejects an unknown LOG_LEVEL', () => {
    expect(() => validateEnv({ LOG_LEVEL: 'verbose' })).toThrow();
  });

  it('names the problem and the bad key in the error message', () => {
    expect(() => validateEnv({ PORT: 'abc' })).toThrow(
      /Invalid environment configuration[\s\S]*PORT/,
    );
    expect(() => validateEnv({ LOG_LEVEL: 'verbose' })).toThrow(
      /Invalid environment configuration[\s\S]*LOG_LEVEL/,
    );
  });
});
