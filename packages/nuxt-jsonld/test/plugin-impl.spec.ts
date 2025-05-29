import { describe, beforeEach, it, expect, vi, type Mock } from 'vitest';
import { toValue } from 'vue';
import { mount } from '@vue/test-utils';

import { vuePlugin } from '../src/runtime/plugin-impl';

const { useHead } = vi.hoisted(() => {
  return {
    useHead: vi.fn(),
  };
});
vi.mock('@unhead/vue', () => ({
  useHead,
}));

const getLastCalledParams = (mock: Mock<any>) => mock.mock.calls[mock.mock.calls.length - 1];

describe('plugin-impl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not call useHead when $jsonld is not set', () => {
    mount(
      {
        template: '<div />',
      },
      {
        global: {
          plugins: [vuePlugin],
        },
      }
    );

    expect(useHead).not.toBeCalled();
  });

  it('calls useHead', () => {
    mount(
      {
        template: '<div />',
        data() {
          return {
            count: 0,
          };
        },
        jsonld() {
          return {
            '@context': 'https://schema.org',
            '@type': 'Thing',
            name: this.count,
          };
        },
      },
      {
        global: {
          plugins: [vuePlugin],
        },
      }
    );

    expect(useHead).toBeCalledTimes(1);
    expect(toValue(getLastCalledParams(useHead)[0])).toEqual({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: '{"@context":"https://schema.org","@type":"Thing","name":0}',
        },
      ],
    });
  });

  it('calls useHead with enpty when $jsonld response is undefined', () => {
    mount(
      {
        template: '<div />',
        jsonld() {
          return undefined;
        },
      },
      {
        global: {
          plugins: [vuePlugin],
        },
      }
    );

    expect(useHead).toBeCalled();
    expect(toValue(getLastCalledParams(useHead)[0])).toEqual({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: undefined,
        },
      ],
    });
  });
});
