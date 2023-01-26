import { computed } from 'vue';
import { useHead } from '#head';

export default (nuxtApp) => {
  const mixin = {
    created() {
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
};
