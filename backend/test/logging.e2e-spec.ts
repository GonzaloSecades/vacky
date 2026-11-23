import {
  type AppProcess,
  jsonLines,
  startApp,
  stopApp,
  waitForLive,
} from './helpers/app-process.js';

describe('HTTP log allowlist (e2e)', () => {
  let app: AppProcess | undefined;

  afterEach(async () => {
    // Runs also when the test fails before it reaches stopApp().
    if (app) await stopApp(app, 'SIGKILL');
    app = undefined;
  });

  it('logs only id, method, path, status, and duration', async () => {
    app = await startApp({ LOG_LEVEL: 'info' });
    await waitForLive(app.liveUrl);

    await fetch(`${app.liveUrl}?token=secret-query-token`, {
      headers: {
        'x-request-id': 'trace-log-test',
        'x-api-key': 'secret-header-key',
        authorization: 'Bearer secret-bearer-token',
      },
    });

    // Stop with SIGTERM first: pino flushes its buffer on a clean exit.
    await stopApp(app);
    const output = app.output();

    expect(output).not.toContain('secret-');

    const line = jsonLines(output).find((l) => l.req?.id === 'trace-log-test');
    expect(line).toBeDefined();
    expect(Object.keys(line!.req).sort()).toEqual(['id', 'method', 'url']);
    expect(line!.req.url).toBe('/api/v1/health/live');
    expect(line!.res).toEqual({ statusCode: 200 });
    expect(typeof line!.responseTime).toBe('number');
  }, 20_000);
});
