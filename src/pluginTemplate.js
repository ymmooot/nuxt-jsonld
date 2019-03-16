import Vue from 'vue';

const createMixin = options => ({
  head() {
    if (!this.$options || typeof this.$options.jsonld !== 'function') {
      return {};
    }

    const hid = `nuxt-jsonld-${this._uid}`;
    const jsonldString = JSON.stringify(this.$options.jsonld.call(this), null, options.space);

    return {
      script: [
        {
          hid,
          type: 'application/ld+json',
          innerHTML: options.space ? `\n${jsonldString}\n` : jsonldString,
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        [hid]: 'innerHTML',
      },
    };
  },
});

const getValue = (val, context) => {
  if (typeof val === 'object') {
    return val;
  }
  if (typeof val === 'function') {
    return val.call(context);
  }
  return undefined;
};

const mergeStrategy = (toVal, fromVal) => {
  if (!toVal) return fromVal;
  if (!fromVal) return toVal;

  return function head() {
    const res1 = getValue(fromVal, this);
    const res2 = getValue(toVal, this);

    if (res2.script) {
      const fromValScript = res1.script || [];
      const hasScript = fromValScript.some(s => s.hid === res2.script[0].hid);
      if (!hasScript) {
        res1.script = [...fromValScript, ...res2.script];
      }
    }
    if (res2.__dangerouslyDisableSanitizersByTagID) {
      res1.__dangerouslyDisableSanitizersByTagID = {
        ...(res1.__dangerouslyDisableSanitizersByTagID || {}),
        ...res2.__dangerouslyDisableSanitizersByTagID,
      };
    }

    return res1;
  };
};

const plugin = {
  install(Vue, options) {
    const mergedOptions = {
      space: 2,
      ...(options || {}),
    };

    Vue.config.optionMergeStrategies.head = mergeStrategy; // eslint-disable-line no-param-reassign
    const mixin = createMixin(mergedOptions);
    Vue.mixin(mixin);
  },
};

Vue.use(plugin, <%= JSON.stringify(options) %>);
