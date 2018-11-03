const VueMeta = require('vue-meta');
const vueMetaJsonldMixin = require('./mixin');

module.exports = {
  install(Vue, options = {}) {
    Vue.use(VueMeta, options);
    Vue.mixin(vueMetaJsonldMixin);
  }
}
