import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './app.setup.js';
import type { Env } from './config/env.schema.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    return503OnClosing: true,
  });

  configureApp(app);

  app.enableShutdownHooks(
    [
      'SIGTERM', //Docker, a deployment platform, or Kubernetes asks the app to stop.
      'SIGINT', // Ctrl+C in the terminal asks the app to stop.
    ],
    // {
    //   useProcessExit: true, // This will call process.exit() after the shutdown hooks are called.
    // },
  );
  const config = app.get<ConfigService<Env, true>>(ConfigService);
  await app.listen(
    config.get('PORT', { infer: true }),
    config.get('HOST', { infer: true }),
  );
}
await bootstrap();
