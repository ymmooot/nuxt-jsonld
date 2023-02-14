import VueT from 'vue';
import { MetaInfo } from 'vue-meta';
import { Thing, Graph, WithContext } from 'schema-dts';

import createJsonldMixin from './createMixin';
import decorator from './decorator';

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends VueT> {
    jsonld?: () => WithContext<Thing> | WithContext<Thing>[] | Graph | null;
    head?: MetaInfo | (() => MetaInfo);
  }
}

export const Jsonld = decorator;

export default {
  install(Vue) {
    Vue.mixin(createJsonldMixin());
  },
};
