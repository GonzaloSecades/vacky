import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // Keep test output readable. Tests that read logs set their own LOG_LEVEL.
    env: {
      LOG_LEVEL: 'silent',
      // Format only for now: nothing connects until Part 4.
      DATABASE_URL: 'postgresql://vacky:vacky_local@127.0.0.1:5432/vacky_test',
    },
  },
});
