import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*'],
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['@nuxt/kit', '@nuxt/schema', 'vue', 'nuxt', '#app', '#head'],
  shims: true,
  format: ['esm'],
  dts: true,
});
