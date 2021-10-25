import { defineNuxtConfig } from 'nuxt3';
import nuxtJsonld from '../dist/module';

export default defineNuxtConfig({
  buildModules: [nuxtJsonld],
  css: ['@/css/index.css'],
});
