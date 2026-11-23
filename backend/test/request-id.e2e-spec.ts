import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.setup.js';

const LIVE = '/api/v1/health/live';
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('Request ID (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('generates a UUID when the caller sends none', async () => {
    const res = await request(app.getHttpServer()).get(LIVE).expect(200);
    expect(res.headers['x-request-id']).toMatch(UUID);
  });

  it('reuses a safe caller-supplied ID', async () => {
    const res = await request(app.getHttpServer())
      .get(LIVE)
      .set('X-Request-Id', 'abc-123')
      .expect(200);
    expect(res.headers['x-request-id']).toBe('abc-123');
  });

  it.each([
    ['too long', 'a'.repeat(129)],
    ['unsafe characters', 'abc;rm -rf'],
  ])('replaces an unsafe ID (%s) with a UUID', async (_case, unsafe) => {
    const res = await request(app.getHttpServer())
      .get(LIVE)
      .set('X-Request-Id', unsafe)
      .expect(200);
    expect(res.headers['x-request-id']).toMatch(UUID);
  });
});
