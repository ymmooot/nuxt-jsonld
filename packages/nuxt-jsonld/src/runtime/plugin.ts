import { defineNuxtPlugin } from 'nuxt/app';
import { vuePlugin } from './plugin-impl';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuePlugin);
});
