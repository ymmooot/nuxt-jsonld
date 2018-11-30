const JsonldMixin = require('./mixin');

module.exports = {
  install(Vue) {
    Vue.mixin(JsonldMixin);
  },
};
