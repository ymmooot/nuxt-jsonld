import createJsonldMixin from './createMixin';
import decorator from './decorator';

export const Jsonld = decorator;

export default {
  install(Vue) {
    Vue.mixin(createJsonldMixin());
  },
};
