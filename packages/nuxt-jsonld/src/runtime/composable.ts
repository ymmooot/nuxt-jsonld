import { computed } from 'vue';
import type { JsonLD, JsonLDFunc } from '../types';
import { useHead, type UseHeadOptions } from '@unhead/vue';

const isFunc = (json: JsonLD | JsonLDFunc): json is JsonLDFunc => typeof json === 'function';
export type UseJsonldOptions = Pick<UseHeadOptions, 'tagPosition'>;
export type { JsonLD, JsonLDFunc } from '../types';

export const useJsonld = (json: JsonLD | JsonLDFunc, options?: UseJsonldOptions) => {
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
  }, options);
};
