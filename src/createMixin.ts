import Vue from 'vue';
import mergeHead from './mergeHead';

type JsonldMixin = {
  beforeCreate: () => void;
};

export default (): JsonldMixin => {
  return {
    beforeCreate(this: Vue) {
      if (this.$options && typeof this.$options.jsonld === 'function') {
        const originalHead = this.$options.head ?? this.$options.computed?.$metaInfo;

        this.$options.head = () => {
          return mergeHead.call(this, originalHead);
        };

        // for @nuxt/bridge
        if (this.$options.computed) {
          this.$options.computed.$metaInfo = () => {
            return mergeHead.call(this, originalHead);
          };
        }
      }
    },
  };
};
