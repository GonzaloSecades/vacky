#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DEFAULT_POSTGRES_IMAGE = 'postgres:16-alpine';
const LOCAL_DRIVER_VALUES = new Set(['postgres', 'pg', 'local']);
const ENV_FILES = ['.env', '.env.local'];

const root = resolve(import.meta.dirname, '..');
let commandEnv = process.env;

const exitWith = (message) => {
  console.error(`\npre-dev failed: ${message}`);
  process.exit(1);
};

const run = (command, args, options = {}) =>
  spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: options.stdio ?? 'pipe',
    env: options.env ?? commandEnv,
  });

const parseEnvValue = (value) => {
  const trimmed = value.trim();
  const quote = trimmed[0];

  if ((quote === '"' || quote === "'") && trimmed.at(-1) === quote) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
};

const readEnvFiles = () => {
  const values = {};

  for (const file of ENV_FILES) {
    const path = resolve(root, file);

    if (!existsSync(path)) continue;

    const lines = readFileSync(path, 'utf8').split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) continue;

      const normalized = trimmed.startsWith('export ')
        ? trimmed.slice('export '.length)
        : trimmed;
      const separatorIndex = normalized.indexOf('=');

      if (separatorIndex === -1) continue;

      const key = normalized.slice(0, separatorIndex).trim();
      const value = normalized.slice(separatorIndex + 1);

      if (!key) continue;

      values[key] = parseEnvValue(value);
    }
  }

  return { ...values, ...process.env };
};

const parseDatabaseUrl = (databaseUrl) => {
  try {
    return new URL(databaseUrl);
  } catch {
    exitWith(
      'DATABASE_URL is not a valid URL. Use the local URL from .env.example or an explicit Neon URL.'
    );
  }
};

const normalizeDriver = (driver) => {
  if (!driver) return undefined;

  const normalized = driver.trim().toLowerCase();

  if (normalized === 'neon') return 'neon';
  if (LOCAL_DRIVER_VALUES.has(normalized)) return 'postgres';

  exitWith(
    'VACKY_DATABASE_DRIVER must be either "postgres" for local Docker Postgres or "neon" for explicit cloud-like testing.'
  );
};

const isNeonHost = (hostname) =>
  hostname === 'neon.tech' || hostname.endsWith('.neon.tech');

const configuredEnv = readEnvFiles();
commandEnv = configuredEnv;
const databaseUrl = configuredEnv.DATABASE_URL?.trim();
const driver = normalizeDriver(configuredEnv.VACKY_DATABASE_DRIVER);

if (!databaseUrl) {
  exitWith(
    'DATABASE_URL is missing. Copy .env.example to .env.local and keep the local Docker Postgres URL, or explicitly configure Neon with VACKY_DATABASE_DRIVER="neon".'
  );
}

const parsedDatabaseUrl = parseDatabaseUrl(databaseUrl);
const hostname = parsedDatabaseUrl.hostname;
const usesNeon = isNeonHost(hostname);

if (driver === 'neon') {
  if (!usesNeon) {
    exitWith(
      'VACKY_DATABASE_DRIVER="neon" was set, but DATABASE_URL does not point at a neon.tech host.'
    );
  }

  console.log(
    'pre-dev: VACKY_DATABASE_DRIVER="neon" is set; skipping local Docker Postgres for explicit cloud-like testing.'
  );
  process.exit(0);
}

if (usesNeon) {
  exitWith(
    'DATABASE_URL points at Neon. Local dev defaults to Docker Postgres; switch DATABASE_URL to postgresql://vacky:vacky@localhost:5432/vacky?schema=public or set VACKY_DATABASE_DRIVER="neon" intentionally.'
  );
}

const port =
  configuredEnv.POSTGRES_PORT?.trim() || parsedDatabaseUrl.port || '5432';

if (!/^\d+$/.test(port)) {
  exitWith('POSTGRES_PORT must be a numeric TCP port.');
}

const composeConfig = run('docker', ['compose', 'config']);

if (composeConfig.status !== 0) {
  exitWith(
    `docker compose config did not pass. ${
      composeConfig.stderr?.trim() || 'Verify Docker and docker-compose.yml.'
    }`
  );
}

const serviceId = run('docker', [
  'compose',
  'ps',
  '-q',
  'postgres',
]).stdout.trim();
const serviceRunning =
  serviceId &&
  run('docker', [
    'inspect',
    '-f',
    '{{.State.Running}}',
    serviceId,
  ]).stdout.trim() === 'true';

const portUsers = run('lsof', ['-ti', `tcp:${port}`])
  .stdout.split(/\s+/)
  .map((value) => value.trim())
  .filter(Boolean);

let shouldForceRecreate = false;

if (portUsers.length > 0 && !serviceRunning) {
  exitWith(
    `port ${port} is already in use outside this compose service by process id(s) ${portUsers.join(
      ', '
    )}. Stop that process manually or set POSTGRES_PORT to a free local port.`
  );
}

const imageExists =
  run('docker', ['image', 'inspect', DEFAULT_POSTGRES_IMAGE]).status === 0;

if (!imageExists) {
  console.log(
    `pre-dev: ${DEFAULT_POSTGRES_IMAGE} is not present locally; compose will pull it before starting Postgres.`
  );
  shouldForceRecreate = true;
}

const upArgs = ['compose', 'up', '-d', '--pull', 'missing'];

if (shouldForceRecreate) upArgs.push('--force-recreate');

upArgs.push('postgres');

const up = run('docker', upArgs, { stdio: 'inherit' });

if (up.status !== 0) {
  exitWith('docker compose could not start the local postgres service.');
}

const readHealthStatus = () => {
  const id = run('docker', ['compose', 'ps', '-q', 'postgres']).stdout.trim();

  if (!id) return 'missing';

  return run('docker', [
    'inspect',
    '-f',
    '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}',
    id,
  ]).stdout.trim();
};

for (let attempt = 0; attempt < 60; attempt += 1) {
  const healthStatus = readHealthStatus();

  if (healthStatus === 'healthy') {
    console.log('pre-dev: local Docker Postgres is healthy.');
    process.exit(0);
  }

  if (healthStatus === 'unhealthy' || healthStatus === 'exited') {
    exitWith(
      `local Docker Postgres reported ${healthStatus}. Run npm run db:logs for details.`
    );
  }

  await new Promise((resolveTimeout) => setTimeout(resolveTimeout, 1000));
}

exitWith(
  'local Docker Postgres did not become healthy within 60 seconds. Run npm run db:logs for details.'
);
