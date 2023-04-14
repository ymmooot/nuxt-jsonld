import { computed, unref } from 'vue';
import type { JsonLD, JsonLDFunc, JsonLDObj } from '../types';
import { useHead } from '@unhead/vue';

const isFunc = (json: JsonLD): json is JsonLDFunc => typeof json === 'function';

const replacer = (_key: string, value: any) => unref(value)

export const useJsonld = (json: JsonLD) => {
  if (!json) {
    return;
  }

  const jsonComputed = computed(() => (isFunc(json) ? json() : json));
  useHead(() => {
    if (!jsonComputed.value) {
      return {};
    }

    const json = JSON.stringify(jsonComputed.value, replacer, '')

    return {
      script: [
        {
          type: 'application/ld+json',
          children: json,
        },
      ],
    };
  });
};
