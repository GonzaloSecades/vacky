import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { configureApp } from './../src/app.setup.js';

describe('Health (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  it('/api/v1/health/live (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health/live')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('/health/live with no api prefix  (GET)', () => {
    return request(app.getHttpServer()).get('/health/live').expect(404);
  });

  it('/api/v1/openapi.json documents the liveness response', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/openapi.json')
      .expect(200);

    const live = res.body.paths['/api/v1/health/live'].get;
    expect(live.responses['200'].content['application/json'].schema).toEqual(
      expect.objectContaining({
        type: 'object',
        required: ['status'],
      }),
    );
  });

  afterEach(async () => {
    await app.close();
  });
});
