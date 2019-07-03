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
        'nuxt-jsonld-8251e634': 'innerHTML',
      },
      script: [
        {
          hid: 'nuxt-jsonld-8251e634',
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

  test('head method returns an empty object when jsonld returns null', () => {
    const mock = mockInstanceFactory();
    mock.$options.jsonld = () => null;
    expect(mock.$options.head.call(mock)).toEqual({});
  });

  describe('customizing indentation', () => {
    test('using tab', () => {
      const mock = mockInstanceFactory({ space: '\t' });

      expect(mock.$options.head.call(mock)).toEqual({
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-a36cc3c0': 'innerHTML',
        },
        script: [
          {
            hid: 'nuxt-jsonld-a36cc3c0',
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
          'nuxt-jsonld-5414b96e': 'innerHTML',
        },
        script: [
          {
            hid: 'nuxt-jsonld-5414b96e',
            innerHTML: `{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://example.com/"}},{"@type":"ListItem","position":2,"item":{"@id":"https://example.com/foo/"}}]}`,
            type: 'application/ld+json',
          },
        ],
      });
    });
  });
});

describe('hid', () => {
  test('hid number suffix is xxHash based innerHTML', () => {
    const mixin = createJsonldMixin({ space: 0 });
    const mock1 = new Vue({
      mixins: [mixin],
      jsonld() {
        return {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': 'https://example.jp/',
                name: 'home',
              },
            },
          ],
        };
      },
    });
    const mock2 = new Vue({
      mixins: [mixin],
      jsonld() {
        return {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          name: 'nuxt-jsonld',
          url: 'https://github.com/ymmooot/nuxt-jsonld/',
        };
      },
    });

    const actual = [mock1, mock2].map(mock => mock.$options.head.call(mock));

    expect(actual).toEqual([
      {
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-4e298139': 'innerHTML',
        },
        script: [
          {
            hid: 'nuxt-jsonld-4e298139',
            innerHTML: `{"@context":"http://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://example.jp/","name":"home"}}]}`,
            type: 'application/ld+json',
          },
        ],
      },
      {
        __dangerouslyDisableSanitizersByTagID: {
          'nuxt-jsonld-90d62c9': 'innerHTML',
        },
        script: [
          {
            hid: 'nuxt-jsonld-90d62c9',
            innerHTML: `{"@context":"http://schema.org","@type":"WebSite","name":"nuxt-jsonld","url":"https://github.com/ymmooot/nuxt-jsonld/"}`,
            type: 'application/ld+json',
          },
        ],
      },
    ]);
  });
});
