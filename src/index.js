const vueMetaJsonldMixin = require('./mixin');

module.exports = {
  install(Vue) {
    Vue.mixin(vueMetaJsonldMixin);
  },
};
