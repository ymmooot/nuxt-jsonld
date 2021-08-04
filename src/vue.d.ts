import VueT from 'vue';
import { MetaInfo } from 'vue-meta';
import { Thing, WithContext } from 'schema-dts';

declare module 'vue/types/options' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ComponentOptions<V extends VueT> {
    jsonld?: () => WithContext<Thing> | WithContext<Thing>[] | null;
    head?: MetaInfo | (() => MetaInfo);
  }
}
