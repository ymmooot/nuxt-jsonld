# nuxt-jsonld

A Nuxt.js plugin to manage jsonld in Vue component.

## Installation

```bash
$ yarn add nuxt-jsonld
or
$ npm install nuxt-jsonld
```

```js
// plugins/jsonld.js
import Vue from 'vue';
import NuxtJsonld from 'nuxt-jsonld';

Vue.use(NuxtJsonld);
```

## Usage

Make a jsonld method to your Vue components and return structured data object.

```vue
<template>
  ...
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://example.com',
          text: 'top page',
        },
        {
          url: 'https://example.com/foo',
          text: 'foo',
        },
        {
          url: 'https://example.com/foo/bar',
          text: 'bar',
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
};
</script>
```

🎉 You will get the jsonld tag! 🎉

```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@id": "https://example.com",
        "name": "top page"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": "https://example.com/foo",
        "name": "foo"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@id": "https://example.com/foo/bar",
        "name": "bar"
      }
    },
  ]
}
</script>
```
