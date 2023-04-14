import { useJsonld } from '../src/runtime/composable';
import { ref, computed, reactive } from 'vue';
import { useHead } from '#head';

let useHeadArg = undefined;
jest.mock('@unhead/vue', () => ({
  useHead: jest.fn().mockImplementation((arg) => {
    useHeadArg = arg;
  }),
}));

describe('useJsonld', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useHeadArg = undefined;
  });

  it('calls useHead with a function which returns object including script tag', () => {
    useJsonld({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: 'foo',
    });
    expect(useHead).toBeCalledTimes(1);
    expect(useHeadArg()).toEqual({
      script: [
        {
          type: 'application/ld+json',
          children: '{"@context":"https://schema.org","@type":"Thing","name":"foo"}',
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
    expect(useHeadArg()).toEqual({
      script: [
        {
          type: 'application/ld+json',
          children: '{"@context":"https://schema.org","@type":"Thing","name":"foo"}',
        },
      ],
    });
  });

  test('passing a function returning null', () => {
    useJsonld(() => null);
    expect(useHead).toBeCalledTimes(1);
    expect(useHeadArg()).toEqual({});
  });

  test('passing null', () => {
    useJsonld(null);
    expect(useHead).not.toBeCalled();
  });

  test('ref field', () => {
    const nameRef = ref('foo')
    useJsonld({
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: nameRef,
      alternateName: computed(() => nameRef.value + 'bar'),
      author: reactive({
        '@type': 'Person',
        name: ref('John Doe'),
      })
    });
    expect(useHeadArg()).toEqual({
      script: [
        {
          type: 'application/ld+json',
          children: '{"@context":"https://schema.org","@type":"Article","name":"foo","alternateName":"foobar","author":{"@type":"Person","name":"John Doe"}}',
        },
      ],
    });
  })

  test('ref field in function', () => {
    const nameRef = ref('foo')
    useJsonld(() => ({
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: nameRef,
      alternateName: computed(() => nameRef.value + 'bar'),
      author: reactive({
        '@type': 'Person',
        name: ref('John Doe'),
      })
    }));
    expect(useHeadArg()).toEqual({
      script: [
        {
          type: 'application/ld+json',
          children: '{"@context":"https://schema.org","@type":"Article","name":"foo","alternateName":"foobar","author":{"@type":"Person","name":"John Doe"}}',
        },
      ],
    });
  })
});
