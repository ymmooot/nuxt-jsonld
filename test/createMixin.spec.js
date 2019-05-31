import Vue from 'vue';
import createJsonldMixin from '../src/createMixin';

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

    expect(mock.$options.head.call(mock)).toEqual({
      __dangerouslyDisableSanitizersByTagID: {
        'nuxt-jsonld-0': 'innerHTML',
      },
      script: [
        {
          hid: 'nuxt-jsonld-0',
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

  describe('customizing indentation', () => {
    test('using tab', () => {
      const mock = mockInstanceFactory({ space: '\t' });

      expect(mock.$options.head.call(mock)).toEqual({
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-0': 'innerHTML',
        },
        script: [
          {
            hid: 'nuxt-jsonld-0',
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
      const mock = mockInstanceFactory({ space: 0 });

      expect(mock.$options.head.call(mock)).toEqual({
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-0': 'innerHTML',
        },
        script: [
          {
            hid: 'nuxt-jsonld-0',
            innerHTML: `{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://example.com/"}},{"@type":"ListItem","position":2,"item":{"@id":"https://example.com/foo/"}}]}`,
            type: 'application/ld+json',
          },
        ],
      });
    });
  });
});

describe('hid', () => {
  test('increase hid number sufix', () => {
    const mixin = createJsonldMixin({ space: 0 });
    const mock1 = new Vue({
      mixins: [mixin],
      jsonld() {
        return {};
      },
    });
    const mock2 = new Vue({
      mixins: [mixin],
      jsonld() {
        return {};
      },
    });
    const mock3 = new Vue({
      mixins: [mixin],
      jsonld() {
        return {};
      },
    });

    const actual = [mock1, mock2, mock3].map(mock => mock.$options.head.call(mock));

    expect(actual).toEqual([
      {
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-0': 'innerHTML',
        },
        script: [{ hid: 'nuxt-jsonld-0', innerHTML: '{}', type: 'application/ld+json' }],
      },
      {
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-1': 'innerHTML',
        },
        script: [{ hid: 'nuxt-jsonld-1', innerHTML: '{}', type: 'application/ld+json' }],
      },
      {
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-2': 'innerHTML',
        },
        script: [{ hid: 'nuxt-jsonld-2', innerHTML: '{}', type: 'application/ld+json' }],
      },
    ]);
  });
});
