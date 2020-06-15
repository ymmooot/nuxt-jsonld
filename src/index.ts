import VueT from 'vue';
import { MetaInfo } from 'vue-meta';
import createJsonldMixin from './createMixin';
import decorator from './decorator';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends VueT> {
    jsonld?: () => object | null;
    head?: MetaInfo | (() => MetaInfo);
  }
}

export const Jsonld = decorator;

export default {
  install(Vue, options) {
    Vue.mixin(createJsonldMixin(options));
  },
};
