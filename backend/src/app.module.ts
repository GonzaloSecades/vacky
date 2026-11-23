import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { validateEnv } from './config/env.schema.js';
import { HealthModule } from './health/health.module.js';
import { buildLoggerParams } from './logging/logger.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: buildLoggerParams,
    }),
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
