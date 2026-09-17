import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '#jsonld-options': fileURLToPath(new URL('./src/runtime/options.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      include: ['src/runtime/**/*'],
      exclude: ['src/runtime/plugin.ts', 'src/runtime/options.ts'],
    },
  },
});
