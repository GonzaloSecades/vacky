import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module.js';
import { configureApp } from './app.setup.js';
import type { Env } from './config/env.schema.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Hold startup logs until the pino logger is ready, so they are JSON too.
    bufferLogs: true,
    return503OnClosing: true,
  });

  // Route all Nest logs (including new Logger classes) to pino.
  app.useLogger(app.get(Logger));

  configureApp(app);

  // Listen for stop signals and run lifecycle hooks (onModuleDestroy,
  // onApplicationShutdown) before the process ends.
  // SIGTERM: Docker or a deployment platform stops the app. SIGINT: Ctrl+C.
  // useProcessExit: end with process.exit(0) so pino flushes its async
  // log buffer. Without it, the last log lines are lost on shutdown.
  app.enableShutdownHooks(
    [
      'SIGTERM', //Docker, a deployment platform, or Kubernetes asks the app to stop.
      'SIGINT', // Ctrl+C in the terminal asks the app to stop.
    ],
    {
      useProcessExit: true, // This will call process.exit() after the shutdown hooks are called.
    },
  );
  const config = app.get<ConfigService<Env, true>>(ConfigService);
  await app.listen(
    config.get('PORT', { infer: true }),
    config.get('HOST', { infer: true }),
  );
}
await bootstrap();
