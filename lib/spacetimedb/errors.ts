export class SpacetimeDbError extends Error {
  constructor(message: string, readonly causeCode?: string) {
    super(message);
    this.name = 'SpacetimeDbError';
  }
}

export function toSpacetimeDbError(error: unknown): SpacetimeDbError {
  if (error instanceof SpacetimeDbError) {
    return error;
  }

  if (error instanceof Error) {
    return new SpacetimeDbError(error.message);
  }

  return new SpacetimeDbError('Unexpected SpacetimeDB error');
}
