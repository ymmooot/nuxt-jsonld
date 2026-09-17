export default defineNuxtConfig({
  modules: ['nuxt-jsonld'],
  'nuxt-jsonld': {
    enableOptionsAPI: true,
  },
  css: ['@/css/index.css'],
  compatibilityDate: '2024-12-11',
});
