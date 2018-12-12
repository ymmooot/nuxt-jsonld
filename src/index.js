const JsonldMixin = require('./mixin');
const mergeStrategy = (toVal, fromVal) => {
  if (!toVal) return fromVal;
  if (!fromVal) return toVal;

  if (typeof fromVal === 'function' && typeof toVal === 'function') {
    return function head() {
      const res1 = fromVal.call(this);
      const res2 = toVal.call(this);
      if (res2.script) {
        const hasScript = (res1.script || []).some(s => s.hid === res2.script[0].hid);
        if (!hasScript) {
          res1.script = res1.script ? res1.script.concat(res2.script) : res2.script;
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
  }
};

module.exports = {
  install(Vue) {
    Vue.config.optionMergeStrategies.head = mergeStrategy;
    Vue.mixin(JsonldMixin);
  },
};
