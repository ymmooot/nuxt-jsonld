import VueT from 'vue';
import createJsonldMixin from './createMixin';
import decorator from './decorator';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends VueT> {
    jsonld?: () => object;
    head?: object;
  }
}

export const Jsonld = decorator;

export default {
  install(Vue, options) {
    Vue.mixin(createJsonldMixin(options));
  },
};
