const Vue = require('vue');
const createJsonldMixin = require('../src/createMixin');

describe('without jsonld', () => {
  test('head method returns an empty object when jsonld is not defined', () => {
    const mock = new Vue({ mixins: [createJsonldMixin()] });
    expect(mock.$options.head.call(mock)).toEqual({});
  });

  test('head method returns an empty object when jsonld is not a function', () => {
    const mock = new Vue({
      mixins: [createJsonldMixin()],
      jsonld: 'hoge',
    });
    expect(mock.$options.head.call(mock)).toEqual({});
  });
});

describe('with jsonld', () => {
  const mockInstanceFactory = mixinOptions =>
    new Vue({
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

  test('head method returns jsonld metaInfo', () => {
    const mock = mockInstanceFactory();

    const mockHid = `nuxt-jsonld-${mock._uid}`;

    expect(mock.$options.head.call(mock)).toEqual({
      __dangerouslyDisableSanitizersByTagID: {
        [mockHid]: 'innerHTML',
      },
      script: [
        {
          hid: mockHid,
          innerHTML: `{
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
}`,
          type: 'application/ld+json',
        },
      ],
    });
  });

  describe('customizing indentation', () => {
    test('using tab', () => {
      const mock = mockInstanceFactory({ space: '\t' });
      const mockHid = `nuxt-jsonld-${mock._uid}`;

      expect(mock.$options.head.call(mock)).toEqual({
        __dangerouslyDisableSanitizersByTagID: {
          [mockHid]: 'innerHTML',
        },
        script: [
          {
            hid: mockHid,
            innerHTML: `{
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
}`,
            type: 'application/ld+json',
          },
        ],
      });
    });
    test('no space', () => {
      const mock = mockInstanceFactory({ space: 0 });
      const mockHid = `nuxt-jsonld-${mock._uid}`;

      expect(mock.$options.head.call(mock)).toEqual({
        __dangerouslyDisableSanitizersByTagID: {
          [mockHid]: 'innerHTML',
        },
        script: [
          {
            hid: mockHid,
            innerHTML: `{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://example.com/"}},{"@type":"ListItem","position":2,"item":{"@id":"https://example.com/foo/"}}]}`,
            type: 'application/ld+json',
          },
        ],
      });
    });
  });
});
