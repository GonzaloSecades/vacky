import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LivenessResponse, ReadinessResponse } from './health.schemas.js';
import { HealthService } from './health.service.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  // Nest injects the HealthService instance registered in HealthModule.
  constructor(private readonly health: HealthService) {}

  // Liveness : should the process be restarted? Failures return 500, not this body.

  @Get('live')
  @ApiOkResponse({
    description: 'The process is running.',
    standardSchema: LivenessResponse,
  })
  getLive(): LivenessResponse {
    return { status: 'ok' };
  }

  // Readiness : should traffic be sent to this instance now ?
  @Get('ready')
  @ApiOkResponse({
    description: 'The process is ready to serve traffic.',
    standardSchema: ReadinessResponse,
  })
  @ApiServiceUnavailableResponse({
    description:
      'A required dependency is unavailable, or the process is shutting down.',
  })
  getReady(): Promise<ReadinessResponse> {
    return this.health.checkReadiness();
  }
}
