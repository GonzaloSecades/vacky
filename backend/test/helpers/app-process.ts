import { type ChildProcess, spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { join } from 'node:path';

export const MAIN = join(import.meta.dirname, '..', '..', 'dist', 'main.js');

type ExitResult = [code: number | null, signal: NodeJS.Signals | null];

export interface AppProcess {
  child: ChildProcess;
  baseUrl: string;
  liveUrl: string;
  /** Resolves after the process exits AND its stdout/stderr are closed. */
  closed: Promise<ExitResult>;
  output: () => string;
}

export async function freePort(): Promise<number> {
  const server = createServer().listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address() as { port: number };
  server.close();
  await once(server, 'close');
  return port;
}

export async function waitForLive(url: string, timeoutMs = 10_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // Server is not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Server did not become live at ${url}`);
}

/** Starts dist/main.js on a free port. Override env vars with `env`. */
export async function startApp(
  env: Record<string, string> = {},
): Promise<AppProcess> {
  const port = await freePort();
  const child = spawn(process.execPath, [MAIN], {
    env: {
      ...process.env,
      NODE_ENV: 'test',
      HOST: '127.0.0.1',
      PORT: String(port),
      NO_COLOR: '1',
      LOG_LEVEL: 'info',
      ...env,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  // Listen before anything can happen, so the event is never missed.
  const closed = once(child, 'close') as Promise<ExitResult>;

  let output = '';
  child.stdout?.on('data', (chunk: Buffer) => (output += chunk.toString()));
  child.stderr?.on('data', (chunk: Buffer) => (output += chunk.toString()));

  const baseUrl = `http://127.0.0.1:${port}`;
  return {
    child,
    baseUrl,
    liveUrl: `${baseUrl}/api/v1/health/live`,
    closed,
    output: () => output,
  };
}

/** Sends a signal if the process still runs, then waits for `close`. */
export async function stopApp(
  app: AppProcess,
  signal: NodeJS.Signals = 'SIGTERM',
): Promise<ExitResult> {
  if (app.child.exitCode === null && app.child.signalCode === null) {
    app.child.kill(signal);
  }
  return app.closed;
}

/** Parses the JSON log lines. Ignores lines that are not JSON. */
export function jsonLines(output: string): Record<string, any>[] {
  return output.split('\n').flatMap((line) => {
    try {
      return [JSON.parse(line)];
    } catch {
      return [];
    }
  });
}
