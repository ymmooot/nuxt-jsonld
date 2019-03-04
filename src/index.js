const JsonldMixin = require('./mixin');

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
};

module.exports = {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.config.optionMergeStrategies.head = mergeStrategy;
    Vue.mixin(JsonldMixin);
  },
};
