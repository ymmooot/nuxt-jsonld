import Vue, { ComponentOptions, VueConstructor } from 'vue';

export default (component: any ): void => {
  const options: ComponentOptions<Vue> = component.options;

  if (!options.methods || !options.methods.jsonld || typeof options.methods.jsonld !== 'function') {
    return;
  }

  options.jsonld = options.methods.jsonld;
  delete options.methods.jsonld;
};
