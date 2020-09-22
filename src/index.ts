import VueT from 'vue';
import { MetaInfo } from 'vue-meta';
import createJsonldMixin from './createMixin';
import { JsonldFunc } from './jsonld';

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends VueT> {
    jsonld?: JsonldFunc;
    head?: MetaInfo | (() => MetaInfo);
  }
}

export { Jsonld } from './decorator';
export { useJsonld } from './useJsonld';

export default {
  install(Vue, options) {
    Vue.mixin(createJsonldMixin(options));
  },
};
