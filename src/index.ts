import VueT, { ComponentOptions } from 'vue';
import createJsonldMixin from './createMixin';
import decorator from './decorator';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends VueT> {
    jsonld?: () => object;
  }
}

const mergeStrategy = (parent, child, vm) => {
  if (vm) {
    return child;
  }

  return function head() {
    const p = typeof parent === 'function' ? parent.call(this) : parent;
    const c = typeof child === 'function' ? child.call(this) : child;

    if (!p) {
      return c;
    }
    if (!c) {
      return p;
    }

    if (c.script || p.script) {
      c.script = [...(c.script || []), ...(p.script || [])];
    }

    if (c.__dangerouslyDisableSanitizersByTagID || p.__dangerouslyDisableSanitizersByTagID) {
      c.__dangerouslyDisableSanitizersByTagID = {
        ...(c.__dangerouslyDisableSanitizersByTagID || {}),
        ...(p.__dangerouslyDisableSanitizersByTagID || {}),
      };
    }

    return c;
  };
};

export const Jsonld = decorator;

export default {
  mergeStrategy,
  install(Vue, options) {
    // eslint-disable-next-line no-param-reassign
    Vue.config.optionMergeStrategies.head = mergeStrategy;
    Vue.mixin(createJsonldMixin(options));
  },
};
