import { PrismaClient } from '@/app/generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';

type DatabaseDriver = 'neon' | 'postgres';

const LOCAL_DATABASE_DRIVER_VALUES = new Set(['postgres', 'pg', 'local']);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const isNeonHost = (hostname: string) =>
  hostname === 'neon.tech' || hostname.endsWith('.neon.tech');

const getDatabaseUrl = () => {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error(
      [
        'DATABASE_URL is required before Vacky can create a Prisma client.',
        'For local development, start Docker Postgres and use:',
        'DATABASE_URL="postgresql://vacky:vacky@localhost:5432/vacky?schema=public"',
        'For Neon preview/production, set DATABASE_URL to the Neon connection string.',
      ].join('\n')
    );
  }

  return databaseUrl;
};

const parseDatabaseUrl = (databaseUrl: string) => {
  try {
    return new URL(databaseUrl);
  } catch {
    throw new Error(
      'DATABASE_URL must be a valid PostgreSQL connection URL for local Docker Postgres or Neon.'
    );
  }
};

const getExplicitDatabaseDriver = (): DatabaseDriver | undefined => {
  const driver = process.env.VACKY_DATABASE_DRIVER?.trim().toLowerCase();

  if (!driver) return undefined;

  if (driver === 'neon') return 'neon';
  if (LOCAL_DATABASE_DRIVER_VALUES.has(driver)) return 'postgres';

  throw new Error(
    'VACKY_DATABASE_DRIVER must be either "postgres" for local Docker Postgres or "neon" for the Neon adapter.'
  );
};

const resolveDatabaseDriver = (parsedDatabaseUrl: URL): DatabaseDriver => {
  const explicitDriver = getExplicitDatabaseDriver();
  const usesNeon = isNeonHost(parsedDatabaseUrl.hostname);

  if (explicitDriver === 'postgres' && usesNeon) {
    throw new Error(
      'DATABASE_URL points at Neon, but VACKY_DATABASE_DRIVER is set to "postgres". Use a local Docker Postgres URL or set VACKY_DATABASE_DRIVER="neon".'
    );
  }

  if (explicitDriver === 'neon' && !usesNeon) {
    throw new Error(
      'VACKY_DATABASE_DRIVER is set to "neon", but DATABASE_URL does not point at a neon.tech host.'
    );
  }

  if (
    !explicitDriver &&
    usesNeon &&
    process.env.NODE_ENV !== 'production' &&
    !process.env.VERCEL_ENV
  ) {
    throw new Error(
      'DATABASE_URL points at Neon during local development. Vacky defaults to Docker Postgres locally; set DATABASE_URL to postgresql://vacky:vacky@localhost:5432/vacky?schema=public or set VACKY_DATABASE_DRIVER="neon" intentionally.'
    );
  }

  if (
    parsedDatabaseUrl.protocol !== 'postgresql:' &&
    parsedDatabaseUrl.protocol !== 'postgres:'
  ) {
    throw new Error(
      `DATABASE_URL must use a PostgreSQL protocol. Received "${parsedDatabaseUrl.protocol}".`
    );
  }

  if (usesNeon) return 'neon';

  return 'postgres';
};

const createPrismaClient = () => {
  const databaseUrl = getDatabaseUrl();
  const parsedDatabaseUrl = parseDatabaseUrl(databaseUrl);
  const driver = resolveDatabaseDriver(parsedDatabaseUrl);
  const adapter =
    driver === 'neon'
      ? new PrismaNeon({ connectionString: databaseUrl })
      : new PrismaPg(databaseUrl);

  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
