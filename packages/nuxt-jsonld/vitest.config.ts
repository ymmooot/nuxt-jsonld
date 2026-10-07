import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '#imports': '@unhead/vue',
    },
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      include: ['src/runtime/**/*'],
      exclude: ['src/runtime/plugin.ts'],
    },
  },
});
