import Vue from 'vue';
import mergeHead from './mergeHead';

interface Options {
  space?: number | string;
}

interface JsonldMixin {
  beforeCreate: () => void;
}

export default (options: Options = {}): JsonldMixin => {
  const mergedOptions = {
    space: 2,
    ...options,
  };

  return {
    beforeCreate (this: Vue) {
      if (this.$options && typeof this.$options.jsonld === 'function') {
        this.$options.head = mergeHead.call(this, mergedOptions)
      }
    },
  };
};
