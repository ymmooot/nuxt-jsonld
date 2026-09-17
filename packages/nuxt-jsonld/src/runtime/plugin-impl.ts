import { computed, type Plugin } from 'vue';
import { useHead, type UseHeadOptions } from '@unhead/vue';

export type VuePluginOptions = Pick<UseHeadOptions, 'tagPosition'>;

export const vuePlugin: Plugin<[VuePluginOptions?]> = {
  install(Vue, options) {
    Vue.mixin({
      created() {
        if (typeof this.$options?.jsonld !== 'function') {
          return;
        }
        const jsonComputed = computed(() => this.$options.jsonld.call(this));
        useHead(
          () => ({
            script: [
              {
                type: 'application/ld+json',
                innerHTML: jsonComputed.value
                  ? JSON.stringify(jsonComputed.value, null, '')
                  : undefined,
              },
            ],
          }),
          options
        );
      },
    });
  },
};
