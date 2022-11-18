import { computed } from 'vue';
import type { JsonLD, JsonLDFunc } from '../types';
import { useHead } from '#head';

const isFunc = (json: JsonLD | JsonLDFunc): json is JsonLDFunc => typeof json === 'function';

export const useJsonld = (json: JsonLD | JsonLDFunc) => {
  if (!json) {
    return;
  }

  const jsonComputed = computed(() => (isFunc(json) ? json() : json));
  useHead(() => {
    if (!jsonComputed.value) {
      return {};
    }
    return {
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(jsonComputed.value, null, ''),
        },
      ],
    };
  });
};
