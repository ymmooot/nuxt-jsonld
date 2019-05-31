import Vue, { ComponentOptions } from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    jsonld?: () => object;
  }
}
