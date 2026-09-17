import { defineNuxtPlugin } from 'nuxt/app';
import { vuePlugin } from './plugin-impl';
import { defaultOptions } from '#jsonld-options';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuePlugin, defaultOptions);
});
