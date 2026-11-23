import { Injectable } from '@nestjs/common';
import type { ReadinessResponse } from './health.schemas.js';

/**
 * Decides whether this instance can serve traffic.
 *
 * Readiness checks required dependencies. Liveness must not call this service:
 * a restart cannot fix a database outage, so liveness stays dependency-free.
 */
@Injectable()
export class HealthService {
  /**
   * Resolves when every required dependency is available.
   *
   * Step 2 adds the PostgreSQL check here. When a check fails, throw
   * `ServiceUnavailableException`; Nest turns it into an HTTP 503 response.
   * During shutdown, `return503OnClosing` (main.ts) already answers 503.
   */
  async checkReadiness(): Promise<ReadinessResponse> {
    return { status: 'ready' };
  }
}
