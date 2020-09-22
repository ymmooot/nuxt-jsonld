import { getCurrentInstance } from '@vue/composition-api';
import { JsonldFunc } from './jsonld';

export const useJsonld = (jsonFunc: JsonldFunc) => {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('This must be called within a setup function.');
  }

  vm.$options.jsonld = jsonFunc;
};
