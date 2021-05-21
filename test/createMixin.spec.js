import Vue from 'vue';
import createJsonldMixin from '../src/createMixin';

const mockInstanceFactory = (head, mixinOptions) => {
  const mock = new Vue({
    mixins: [createJsonldMixin(mixinOptions)],
    data() {
      return {
        breadcrumbs: [
          {
            url: 'https://example.com/',
            name: 'top page',
          },
          {
            url: 'https://example.com/foo/',
            name: 'foo',
          },
        ],
      };
    },
    head,
    jsonld() {
      const items = this.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': item.url,
          name: item.text,
        },
      }));
      return {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      };
    },
  });
  mock._uid = 12;
  return mock;
};

describe('without head and without jsonld', () => {
  test('head method does not exist when head and jsonld are not defined', () => {
    const mock = new Vue({ mixins: [createJsonldMixin()] });
    expect(mock.$options.head).toBeUndefined();
  });

  test('head method returns an empty object when head and jsonld return null', () => {
    const mock = new Vue({ mixins: [createJsonldMixin()], head: () => null, jsonld: () => null });
    expect(mock.$options.head()).toEqual({});
  });
});

describe('without head and with jsonld', () => {
  test('head method returns jsonld metaInfo', () => {
    const mock = mockInstanceFactory();
    expect(mock.$options.head.call(mock)).toEqual({
      __dangerouslyDisableSanitizersByTagID: {
        'nuxt-jsonld-24692542': ['innerHTML'],
      },
      script: [
        {
          hid: 'nuxt-jsonld-24692542',
          innerHTML: `
{
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@id": "https://example.com/"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": "https://example.com/foo/"
      }
    }
  ]
}
`,
          type: 'application/ld+json',
        },
      ],
    });
  });
});

describe('with head and jsonld', () => {
  const head = {
    title: 'title',
    script: [{ src: 'script.js' }],
  };
  test('head method returns an empty object when jsonld returns null', () => {
    const mock = mockInstanceFactory(head);

    mock.$options.jsonld = () => null;
    expect(mock.$options.head.call(mock)).toEqual({
      title: 'title',
      script: [
        {
          src: 'script.js',
        },
      ],
    });
  });

  describe('customizing indentation', () => {
    test('using tab', () => {
      const mock = mockInstanceFactory(head, { space: '\t' });
      expect(mock.$options.head.call(mock)).toEqual({
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-24692542': ['innerHTML'],
        },
        title: 'title',
        script: [
          {
            src: 'script.js',
          },
          {
            hid: 'nuxt-jsonld-24692542',
            innerHTML: `
{
	"@context": "http://schema.org",
	"@type": "BreadcrumbList",
	"itemListElement": [
		{
			"@type": "ListItem",
			"position": 1,
			"item": {
				"@id": "https://example.com/"
			}
		},
		{
			"@type": "ListItem",
			"position": 2,
			"item": {
				"@id": "https://example.com/foo/"
			}
		}
	]
}
`,
            type: 'application/ld+json',
          },
        ],
      });
    });
    test('no space', () => {
      const mock = mockInstanceFactory(head, { space: 0 });

      expect(mock.$options.head.call(mock)).toEqual({
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-24692542': ['innerHTML'],
        },
        title: 'title',
        script: [
          {
            src: 'script.js',
          },
          {
            hid: 'nuxt-jsonld-24692542',
            innerHTML: `{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://example.com/"}},{"@type":"ListItem","position":2,"item":{"@id":"https://example.com/foo/"}}]}`,
            type: 'application/ld+json',
          },
        ],
      });
    });
  });
});

describe('with head and without jsonld', () => {
  test('head method returns a result of original head method', () => {
    const mock = new Vue({
      mixins: [createJsonldMixin()],
      head: {
        title: 'title',
        script: [{ src: 'script.js' }],
      },
      jsonld() {
        return null;
      },
    });
    expect(mock.$options.head.call(mock)).toEqual({
      title: 'title',
      script: [{ src: 'script.js' }],
    });
  });
});
