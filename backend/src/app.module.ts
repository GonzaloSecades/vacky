import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.schema.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    HealthModule,
  ],
})
export class AppModule implements OnApplicationShutdown {
  private readonly logger = new Logger('Shutdown');
  onApplicationShutdown(signal?: string) {
    if (signal) {
      this.logger.log(`Stopped after ${signal}`);
    }
  }
}
