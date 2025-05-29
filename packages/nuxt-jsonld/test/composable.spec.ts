import { describe, beforeEach, it, test, expect, vi, type Mock } from 'vitest';
import { ref, toValue } from 'vue';
import { useJsonld } from '../src/runtime/composable';

const { useHead } = vi.hoisted(() => {
  return {
    useHead: vi.fn(),
  };
});
vi.mock('@unhead/vue', () => ({
  useHead,
}));

const getLastCalledParams = (mock: Mock<any>) => mock.mock.calls[mock.mock.calls.length - 1];

describe('useJsonld', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls useHead with a function which returns object including script tag', () => {
    useJsonld({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: 'foo',
    });
    expect(useHead).toBeCalledTimes(1);
    expect(toValue(getLastCalledParams(useHead)[0])).toEqual({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: '{"@context":"https://schema.org","@type":"Thing","name":"foo"}',
        },
      ],
    });
  });

  test('passing a function', () => {
    const foo = ref('foo');
    useJsonld(() => ({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: foo.value,
    }));

    expect(useHead).toBeCalledTimes(1);
    expect(toValue(getLastCalledParams(useHead)[0])).toEqual({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: '{"@context":"https://schema.org","@type":"Thing","name":"foo"}',
        },
      ],
    });
  });

  test('passing a function returning null', () => {
    useJsonld(() => null);
    expect(useHead).toBeCalledTimes(1);
    expect(toValue(getLastCalledParams(useHead)[0])).toEqual({});
  });

  test('passing null', () => {
    useJsonld(null);
    expect(useHead).not.toBeCalled();
  });

  it('proxies options', () => {
    useJsonld(
      {
        '@context': 'https://schema.org',
        '@type': 'Thing',
        name: 'foo',
      },
      {
        tagPosition: 'bodyClose',
      }
    );
    expect(useHead).toBeCalledTimes(1);
    expect(toValue(getLastCalledParams(useHead)[1])).toEqual({
      tagPosition: 'bodyClose',
    });
  });
});
