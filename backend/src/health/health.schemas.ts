import { z } from 'zod';
// Each schema is the single source for runtime shape, TypeScript type
// (same name via z.infer), and the OpenAPI response schema.

export const LivenessResponse = z.object({
  status: z.literal('ok'),
});

export type LivenessResponse = z.infer<typeof LivenessResponse>;

// Readiness: the app can serve traffic. Failures return 503, not this body.
export const ReadinessResponse = z.object({
  status: z.literal('ready'),
});

export type ReadinessResponse = z.infer<typeof ReadinessResponse>;
