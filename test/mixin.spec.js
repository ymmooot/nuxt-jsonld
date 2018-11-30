const Vue = require('vue');
const jsonldMixin = require('../src/mixin');

describe('without jsonld', () => {
  test('head method returns an empty object when jsonld is not defined', () => {
    const mock = new Vue({ mixins: [jsonldMixin] });
    expect(mock.$options.head.call(mock)).toEqual({});
  });

  test('head method returns an empty object when jsonld is not a function', () => {
    const mock = new Vue({
      mixins: [jsonldMixin],
      jsonld: 'hoge',
    });
    expect(mock.$options.head.call(mock)).toEqual({});
  });
});

describe('with jsonld', () => {
  test('head method returns jsonld metaInfo', () => {
    const mock = new Vue({
      mixins: [jsonldMixin],
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
});
