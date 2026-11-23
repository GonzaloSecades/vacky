import { ServiceUnavailableException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller.js';
import { HealthService } from './health.service.js';

describe('HealthController', () => {
  let controller: HealthController;
  //A fake HealtService: each test decides what readiness returns.

  const health = { checkReadiness: vi.fn() };

  beforeEach(async () => {
    health.checkReadiness.mockReset();
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      //Replace the real service with the fake. No DB is needed.
      providers: [
        {
          provide: HealthService,
          useValue: health,
        },
      ],
    }).compile();
    controller = moduleRef.get(HealthController);
  });
  it('reports ready when the service is ready', async () => {
    health.checkReadiness.mockResolvedValue({ status: 'ready' });
    await expect(controller.getReady()).resolves.toEqual({ status: 'ready' });
  });

  it('passes on a 503 when a dependency is unavailable', async () => {
    health.checkReadiness.mockRejectedValue(
      new ServiceUnavailableException('database unavailable'),
    );
    await expect(controller.getReady()).rejects.toBeInstanceOf(
      ServiceUnavailableException,
    );
  });

  it('keeps liveness independent of readiness', () => {
    health.checkReadiness.mockRejectedValue(new ServiceUnavailableException());
    expect(controller.getLive()).toEqual({ status: 'ok' });
    expect(health.checkReadiness).not.toHaveBeenCalled();
  });
});
