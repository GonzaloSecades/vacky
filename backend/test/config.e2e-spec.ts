import { type AppProcess, startApp, stopApp } from './helpers/app-process.js';

describe('Invalid configuration (e2e)', () => {
  let app: AppProcess | undefined;

  afterEach(async () => {
    // If a regression lets the app start, do not leave it running.
    if (app) await stopApp(app, 'SIGKILL');
    app = undefined;
  });

  it('exits with code 1 and names the bad variable', async () => {
    app = await startApp({ PORT: 'abc' });
    const [code] = await app.closed;

    expect(code).toBe(1);
    expect(app.output()).toContain('Invalid environment configuration');
    expect(app.output()).toContain('PORT');
  }, 20_000);
});
