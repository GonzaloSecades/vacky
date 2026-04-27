import { DbConnection } from '@/lib/spacetimedb/module_bindings';
import { toSpacetimeDbError } from '@/lib/spacetimedb/errors';
import {
  getSpacetimeDbDatabaseName,
  getSpacetimeDbUri,
} from '@/lib/spacetimedb/config';

export async function connectToSpacetimeDb(): Promise<DbConnection> {
  return await new Promise<DbConnection>((resolve, reject) => {
    let settled = false;

    try {
      DbConnection.builder()
        .withUri(getSpacetimeDbUri())
        .withDatabaseName(getSpacetimeDbDatabaseName())
        .onConnect((connection) => {
          if (settled) {
            return;
          }

          settled = true;
          resolve(connection);
        })
        .onConnectError((_ctx, error) => {
          if (settled) {
            return;
          }

          settled = true;
          reject(toSpacetimeDbError(error));
        })
        .build();
    } catch (error) {
      if (settled) {
        return;
      }

      settled = true;
      reject(toSpacetimeDbError(error));
    }
  });
}

export async function withSpacetimeDbConnection<T>(
  run: (connection: DbConnection) => Promise<T>
): Promise<T> {
  const connection = await connectToSpacetimeDb();

  try {
    return await run(connection);
  } finally {
    connection.disconnect();
  }
}

