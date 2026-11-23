import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LivenessResponse } from './health.schemas.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get('live')
  @ApiOkResponse({
    description: 'The process is running.',
    standardSchema: LivenessResponse,
  })
  getLive(): LivenessResponse {
    return { status: 'ok' };
  }
}
