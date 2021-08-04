import VueT from 'vue';
import { MetaInfo } from 'vue-meta';
import { Thing, WithContext } from 'schema-dts';
import createJsonldMixin from './createMixin';
import decorator from './decorator';

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends VueT> {
    jsonld?: () => WithContext<Thing> | WithContext<Thing>[] | null;
    head?: MetaInfo | (() => MetaInfo);
  }
}

export const Jsonld = decorator;

export default {
  install(Vue) {
    Vue.mixin(createJsonldMixin());
  },
};
