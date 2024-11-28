import { computed, type Plugin } from 'vue';
import { useHead } from '@unhead/vue';

export const vuePlugin: Plugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        if (typeof this.$options?.jsonld !== 'function') {
          return;
        }
        const jsonComputed = computed(() => this.$options.jsonld.call(this));
        useHead(() => ({
          script: [
            {
              type: 'application/ld+json',
              children: jsonComputed.value
                ? JSON.stringify(jsonComputed.value, null, '')
                : undefined,
            },
          ],
        }));
      },
    });
  },
};
