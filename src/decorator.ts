import Vue, { ComponentOptions } from 'vue';

type Target = {
  options?: ComponentOptions<Vue>;
} & typeof Vue;

export const Jsonld = (target: Target): void => {
  const options = target.options || {};

  if (!options.methods || !options.methods.jsonld || typeof options.methods.jsonld !== 'function') {
    return;
  }

  options.jsonld = options.methods.jsonld;
  delete options.methods.jsonld;
};
