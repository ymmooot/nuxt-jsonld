import Vue, { ComponentOptions } from 'vue';

type Target = {
  options?: ComponentOptions<Vue>;
} & typeof Vue;

export default (target: Target): void => {
  if (!target.options) {
    return;
  }

  const { options } = target;

  if (!options.methods || !options.methods.jsonld || typeof options.methods.jsonld !== 'function') {
    return;
  }

  options.jsonld = options.methods.jsonld;
  delete options.methods.jsonld;
}
