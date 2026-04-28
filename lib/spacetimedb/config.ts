const LOCAL_SPACETIMEDB_HOSTS = new Set(['localhost', '127.0.0.1', '::1']);

function normalizeLocalUri(uri: string) {
  const parsed = new URL(uri);

  if (!LOCAL_SPACETIMEDB_HOSTS.has(parsed.hostname)) {
    throw new Error(
      `SpacetimeDB is local-only on this branch. Received non-local host "${parsed.hostname}".`
    );
  }

  return parsed.toString().replace(/\/$/, '');
}

export function getSpacetimeDbUri() {
  return normalizeLocalUri(
    process.env.SPACETIMEDB_URI?.trim() ||
      process.env.SPACETIMEDB_SERVER_URL?.trim() ||
      'http://localhost:3000'
  );
}

export function getSpacetimeDbDatabaseName() {
  return (
    process.env.SPACETIMEDB_DB_NAME?.trim() ||
    process.env.SPACETIMEDB_DATABASE_NAME?.trim() ||
    'vacky-spacetimedb-local-dev'
  );
}
