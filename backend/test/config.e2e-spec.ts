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

  it('exits with code 1 when DATABASE_URL is empty', async () => {
    // An empty process variable wins over the value in .env.
    app = await startApp({ DATABASE_URL: '' });
    const [code] = await app.closed;

    expect(code).toBe(1);
    expect(app.output()).toContain('DATABASE_URL');
  }, 20_000);

  it('does not print the database password', async () => {
    app = await startApp({
      DATABASE_URL: 'mysql://vacky:secret-db-pass@127.0.0.1:3306/vacky',
    });
    const [code] = await app.closed;

    expect(code).toBe(1);
    expect(app.output()).toContain('DATABASE_URL');
    expect(app.output()).not.toContain('secret-db-pass');
  }, 20_000);
});
