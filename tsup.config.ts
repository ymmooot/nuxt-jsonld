import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*'],
  splitting: false,
  sourcemap: false,
  clean: true,
  external: ['@nuxt/kit', '@nuxt/schema', 'vue', 'nuxt3', '#app', '#head'],
  shims: true,
  format: ['esm', 'cjs'],
  dts: true,
});
