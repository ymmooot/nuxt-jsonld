import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      include: ['src/runtime/**/*'],
      exclude: ['src/runtime/plugin.ts'],
    },
  },
});
