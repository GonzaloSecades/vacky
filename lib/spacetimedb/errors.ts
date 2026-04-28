export class SpacetimeDbError extends Error {
  constructor(message: string, readonly causeCode?: string) {
    super(message);
    this.name = 'SpacetimeDbError';
  }
}

function readObjectString(
  value: unknown,
  key: 'message' | 'code'
): string | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const candidate = Reflect.get(value, key);
  return typeof candidate === 'string' && candidate ? candidate : undefined;
}

export function toSpacetimeDbError(error: unknown): SpacetimeDbError {
  if (error instanceof SpacetimeDbError) {
    return error;
  }

  if (error instanceof Error) {
    return new SpacetimeDbError(error.message);
  }

  if (typeof error === 'string' && error) {
    return new SpacetimeDbError(error);
  }

  const nestedError = error && typeof error === 'object'
    ? Reflect.get(error, 'error')
    : undefined;
  const message =
    readObjectString(error, 'message') ??
    (nestedError instanceof Error ? nestedError.message : undefined) ??
    readObjectString(nestedError, 'message');
  const causeCode =
    readObjectString(error, 'code') ?? readObjectString(nestedError, 'code');

  if (message) {
    return new SpacetimeDbError(message, causeCode);
  }

  return new SpacetimeDbError('Unexpected SpacetimeDB error');
}
