import { z } from 'zod';

export const LivenessResponse = z.object({
  status: z.literal('ok'),
});

export type LivenessResponse = z.infer<typeof LivenessResponse>;
