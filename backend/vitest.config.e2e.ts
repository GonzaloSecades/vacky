import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // Keep test output readable. Tests that read logs set their own LOG_LEVEL.
    env: { LOG_LEVEL: 'silent' },
  },
});
