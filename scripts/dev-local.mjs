import { spawn } from 'node:child_process';
import { access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SPACETIMEDB_URL = 'http://127.0.0.1:3000';
const READY_TIMEOUT_MS = 30_000;
const READY_POLL_INTERVAL_MS = 500;
const managedChildren = [];
let shuttingDown = false;

function log(message) {
  console.log(`[dev:local] ${message}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function canAccess(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSpacetimePath() {
  const pathEntries = (process.env.PATH ?? '').split(path.delimiter).filter(Boolean);
  const candidates = [
    ...pathEntries.map((entry) => path.join(entry, 'spacetime')),
    path.join(process.env.HOME ?? '', '.local', 'bin', 'spacetime'),
  ];

  for (const candidate of new Set(candidates)) {
    if (candidate && await canAccess(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    'Could not find the SpacetimeDB CLI. Install it or make sure ~/.local/bin/spacetime is available.'
  );
}

function buildEnv(spacetimePath) {
  const pathEntries = [
    path.dirname(spacetimePath),
    path.dirname(process.execPath),
    ...(process.env.PATH ?? '').split(path.delimiter).filter(Boolean),
  ];

  return {
    ...process.env,
    PATH: [...new Set(pathEntries)].join(path.delimiter),
  };
}

async function isSpacetimeReady() {
  try {
    const response = await fetch(SPACETIMEDB_URL, {
      signal: AbortSignal.timeout(1_000),
    });

    return response.status > 0;
  } catch {
    return false;
  }
}

async function waitForSpacetime(spacetimeProcess) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < READY_TIMEOUT_MS) {
    if (await isSpacetimeReady()) {
      return;
    }

    if (spacetimeProcess && spacetimeProcess.exitCode !== null) {
      throw new Error(
        `SpacetimeDB exited before becoming ready (exit code ${spacetimeProcess.exitCode}).`
      );
    }

    await sleep(READY_POLL_INTERVAL_MS);
  }

  throw new Error(
    `Timed out waiting ${READY_TIMEOUT_MS / 1000}s for SpacetimeDB at ${SPACETIMEDB_URL}.`
  );
}

function spawnManagedProcess(name, command, args, env) {
  log(`Starting ${name}...`);

  const child = spawn(command, args, {
    stdio: 'inherit',
    env,
  });

  managedChildren.push({ name, child });
  return child;
}

async function runCommand(name, command, args, env) {
  log(`Running ${name}...`);

  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env,
    });

    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`${name} exited from signal ${signal}.`));
        return;
      }

      if (code !== 0) {
        reject(new Error(`${name} exited with code ${code}.`));
        return;
      }

      resolve();
    });
  });
}

function forwardSignal(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  log(`Received ${signal}. Shutting down child processes...`);

  for (const { child } of [...managedChildren].reverse()) {
    if (child.exitCode === null) {
      child.kill(signal);
    }
  }
}

process.on('SIGINT', () => forwardSignal('SIGINT'));
process.on('SIGTERM', () => forwardSignal('SIGTERM'));

async function main() {
  const spacetimePath = await resolveSpacetimePath();
  const env = buildEnv(spacetimePath);

  let spacetimeManaged = false;

  if (await isSpacetimeReady()) {
    log(`Using existing SpacetimeDB instance at ${SPACETIMEDB_URL}.`);
  } else {
    const spacetimeProcess = spawnManagedProcess(
      'SpacetimeDB',
      spacetimePath,
      ['start', '--listen-addr', '127.0.0.1:3000', '--non-interactive'],
      env
    );

    spacetimeManaged = true;
    await waitForSpacetime(spacetimeProcess);
    log('SpacetimeDB is ready.');
  }

  await runCommand(
    'local SpacetimeDB publish',
    'npm',
    ['run', 'stdb:publish:local'],
    env
  );
  await runCommand(
    'SpacetimeDB TypeScript code generation',
    'npm',
    ['run', 'stdb:generate'],
    env
  );

  const nextProcess = spawnManagedProcess(
    'Next.js dev server',
    'npm',
    ['run', 'dev'],
    env
  );

  const nextExitCode = await new Promise((resolve, reject) => {
    nextProcess.on('error', reject);
    nextProcess.on('exit', (code, signal) => {
      if (signal) {
        resolve(0);
        return;
      }

      resolve(code ?? 0);
    });
  });

  if (spacetimeManaged) {
    forwardSignal('SIGTERM');
    
    // Give child processes time to gracefully terminate
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, 5_000);
      
      const checkAllExited = () => {
        const allExited = managedChildren.every(({ child }) => child.exitCode !== null);
        if (allExited) {
          clearTimeout(timeout);
          resolve();
        }
      };
      
      managedChildren.forEach(({ child }) => {
        child.on('exit', checkAllExited);
      });
      
      checkAllExited();
    });
  }

  process.exit(nextExitCode);
}

main().catch((error) => {
  console.error(`[dev:local] ${error instanceof Error ? error.message : String(error)}`);
  forwardSignal('SIGTERM');
  process.exit(1);
});
