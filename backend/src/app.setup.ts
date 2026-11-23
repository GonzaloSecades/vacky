import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Env } from './config/env.schema.js';

export const API_PREFIX = 'api/v1';

export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);

  const config = app.get<ConfigService<Env, true>>(ConfigService);
  if (config.get('NODE_ENV', { infer: true }) !== 'production') {
    setupOpenApi(app);
  }
}

function setupOpenApi(app: INestApplication): void {
  const document = new DocumentBuilder()
    .setTitle('Vacky API')
    .setVersion('1')
    .build();

  SwaggerModule.setup(
    `${API_PREFIX}/docs`,
    app,
    () => SwaggerModule.createDocument(app, document),
    { jsonDocumentUrl: `${API_PREFIX}/openapi.json` },
  );
}
