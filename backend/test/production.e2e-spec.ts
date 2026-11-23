import {
  type AppProcess,
  startApp,
  stopApp,
  waitForLive,
} from './helpers/app-process.js';

describe('Production mode (e2e)', () => {
  let app: AppProcess | undefined;

  beforeAll(async () => {
    app = await startApp({ NODE_ENV: 'production', LOG_LEVEL: 'silent' });
    await waitForLive(app.liveUrl);
  }, 20_000);

  afterAll(async () => {
    if (app) await stopApp(app, 'SIGKILL');
  });

  it.each(['/api/v1/docs', '/api/v1/openapi.json'])(
    'does not expose %s',
    async (path) => {
      const res = await fetch(`${app!.baseUrl}${path}`);
      expect(res.status).toBe(404);
    },
  );

  it('still serves liveness', async () => {
    const res = await fetch(app!.liveUrl);
    expect(res.status).toBe(200);
  });
});
