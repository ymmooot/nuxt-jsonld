import Vue, { ComponentOptions } from 'vue';
import { Thing, WithContext } from 'schema-dts';

type Target = {
  options?: ComponentOptions<Vue> & {
    jsonld?: () => WithContext<Thing> | WithContext<Thing>[] | null;
  };
} & typeof Vue;

export default (target: Target): void => {
  const options = target.options || {};

  if (!options.methods || !options.methods.jsonld || typeof options.methods.jsonld !== 'function') {
    return;
  }

  target.options.jsonld = options.methods.jsonld;
  delete target.options.methods.jsonld;
};
