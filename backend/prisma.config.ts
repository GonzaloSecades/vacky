import { defineConfig } from 'prisma/config';

// Prisma 7 does not read .env by itself. loadEnvFile() does not overwrite
// variables that are already set, so the process environment wins (the same
// order as @nestjs/config).

try {
  process.loadEnvFile();
} catch {
  // no .env file ( CI or deployment): use the process environment only.
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Not env('DATABASE_URL'): that throws when the variable is not set, and
    // then `prisma generate` fails in CI. Commands that connect fail with
    // "Connection url is empty" instead.
    url: process.env.DATABASE_URL ?? '',
  },
});
