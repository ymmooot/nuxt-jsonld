import { computed } from 'vue';
import { defineNuxtPlugin } from '#app';
import { useHead } from '#head';

export default defineNuxtPlugin((nuxtApp) => {
  const mixin = {
    beforeCreate(this) {
      if (typeof this.$options?.jsonld !== 'function') {
        return;
      }
      const jsonComputed = computed(() => this.$options.jsonld.call(this));
      useHead(() => ({
        script: [
          {
            type: 'application/ld+json',
            children: jsonComputed.value ? JSON.stringify(jsonComputed.value, null, '') : undefined,
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
