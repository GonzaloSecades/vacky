import { ConfigService } from '@nestjs/config';
import type { Params } from 'nestjs-pino';
import type { Env } from '../config/env.schema.js';
import { resolveRequestId } from './request-id.js';

/**
 * Builds the nestjs-pino options from validated configuration.
 *
 * Output: one JSON object per line on stdout. Every log written during a
 * request includes `req.id`, because nestjs-pino keeps the request in
 * AsyncLocalStorage. pino-http also writes one "request completed" line per
 * request with the status code and `responseTime` in milliseconds.
 *
 * Do not add a pino `transport` (for example pino-pretty) here. Transports run
 * in a worker thread and can lose the last lines on shutdown. For readable
 * local logs, pipe instead: `npm run start:dev | npx pino-pretty`.
 */
export function buildLoggerParams(config: ConfigService<Env, true>): Params {
  return {
    pinoHttp: {
      level: config.get('LOG_LEVEL', { infer: true }),
      genReqId: resolveRequestId,
      // Never write credentials to logs. Matching values become "[Redacted]".
      // Add new secret-bearing fields here before logging them.
      redact: [
        'req.headers.authorization',
        'req.headers.cookie',
        'res.headers["set-cookie"]',
      ],
    },
  };
}
