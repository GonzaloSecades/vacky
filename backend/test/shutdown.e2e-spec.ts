import { type ChildProcess, spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync } from 'node:fs';
import { createServer } from 'node:net';
import { join } from 'node:path';

const MAIN = join(import.meta.dirname, '..', 'dist', 'main.js');

async function freePort(): Promise<number> {
  const server = createServer().listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address() as { port: number };
  server.close();
  await once(server, 'close');
  return port;
}

async function waitForLive(url: string, timeoutMs = 10_000): Promise<void> {
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

describe.each(['SIGTERM', 'SIGINT'] as const)(
  'Graceful shutdown on %s',
  (signal) => {
    let child: ChildProcess | undefined;

    afterEach(() => {
      if (child && child.exitCode === null && child.signalCode === null) {
        child.kill('SIGKILL');
      }
    });

    it('runs shutdown hooks, closes the port, and exits', async () => {
      expect(existsSync(MAIN), 'Run `npm run build` before e2e tests').toBe(
        true,
      );

      const port = await freePort();
      const liveUrl = `http://127.0.0.1:${port}/api/v1/health/live`;
      child = spawn(process.execPath, [MAIN], {
        env: {
          ...process.env,
          NODE_ENV: 'test',
          HOST: '127.0.0.1',
          PORT: String(port),
          NO_COLOR: '1',
          // This test reads the shutdown log line, so logging must be on.
          LOG_LEVEL: 'info',
        },
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      let output = '';
      child.stdout?.on('data', (chunk: Buffer) => (output += chunk.toString()));
      child.stderr?.on('data', (chunk: Buffer) => (output += chunk.toString()));

      await waitForLive(liveUrl);

      const exited = once(child, 'exit');
      child.kill(signal);
      const [code, exitSignal] = (await exited) as [
        number | null,
        NodeJS.Signals | null,
      ];

      expect(output).toContain(`Stopped after ${signal}`);
      expect(code).toBe(0);
      expect(exitSignal).toBeNull();
      await expect(fetch(liveUrl)).rejects.toThrow();
    }, 20_000);
  },
);
