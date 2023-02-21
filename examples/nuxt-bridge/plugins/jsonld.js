import Vue from 'vue';
import NuxtJsonld from 'nuxt-jsonld';

Vue.use(NuxtJsonld);

export default defineNuxtPlugin(nuxtApp => {
  if (typeof NuxtJsonld.default !== 'undefined')  {
    nuxtApp.vueApp.use(NuxtJsonld.default)
  }
})
