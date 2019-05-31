import Vue, { ComponentOptions } from 'vue';

export default (component: any): void => {
  const { options }: { options: ComponentOptions<Vue> } = component;

  if (!options.methods || !options.methods.jsonld || typeof options.methods.jsonld !== 'function') {
    return;
  }

  options.jsonld = options.methods.jsonld;
  delete options.methods.jsonld;
};
