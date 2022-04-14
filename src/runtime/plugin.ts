import { computed } from 'vue';
import { defineNuxtPlugin } from '#app';
import { useHead } from '#head';

export default defineNuxtPlugin((nuxtApp) => {
  const mixin = {
    beforeCreate(this) {
      if (typeof this.$options?.jsonld !== 'function') {
        return
      }
      const json = computed(() => this.$options.jsonld.call(this));
      useHead(() => ({
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify(json.value, null, ''),
          },
        ],
      }));
    },
  };
  const plugin = {
    install(Vue) {
      Vue.mixin(mixin);
    },
  };
  nuxtApp.vueApp.use(plugin);
});
