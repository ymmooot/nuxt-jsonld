/// <reference types="vitest/config" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      include: ['src/runtime/**/*', '!src/runtime/plugin.ts'],
    },
  },
});
