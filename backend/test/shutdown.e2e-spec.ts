import { existsSync } from 'node:fs';
import {
  type AppProcess,
  MAIN,
  jsonLines,
  startApp,
  stopApp,
  waitForLive,
} from './helpers/app-process.js';

describe.each(['SIGTERM', 'SIGINT'] as const)(
  'Graceful shutdown on %s',
  (signal) => {
    let app: AppProcess | undefined;

    afterEach(async () => {
      if (app) await stopApp(app, 'SIGKILL');
    });

    it('runs shutdown hooks, closes the port, and exits', async () => {
      expect(existsSync(MAIN), 'Run `npm run build` before e2e tests').toBe(
        true,
      );

      app = await startApp();
      await waitForLive(app.liveUrl);

      const [code, exitSignal] = await stopApp(app, signal);

      expect(code).toBe(0);
      expect(exitSignal).toBeNull();
      expect(
        jsonLines(app.output()).some((line) =>
          String(line.msg).includes(`Stopped after ${signal}`),
        ),
      ).toBe(true);
      await expect(fetch(app.liveUrl)).rejects.toThrow();
    }, 20_000);
  },
);
