# nuxt-jsonld

[![version](https://img.shields.io/npm/v/nuxt-jsonld.svg)](https://www.npmjs.com/package/nuxt-jsonld)
[![downloads](https://img.shields.io/npm/dt/nuxt-jsonld.svg)](https://www.npmjs.com/package/nuxt-jsonld)
[![CircleCI](https://circleci.com/gh/ymmooot/nuxt-jsonld.svg?style=shield)](https://circleci.com/gh/ymmooot/nuxt-jsonld)
[![codecov](https://codecov.io/gh/ymmooot/nuxt-jsonld/branch/master/graph/badge.svg)](https://codecov.io/gh/ymmooot/nuxt-jsonld)

A Nuxt.js module to manage jsonld in Vue component.

Please read [this](https://github.com/ymmooot/nuxt-jsonld/blob/v1/README.md) if you are using Nuxt2.

## Installation

```bash
$ yarn add nuxt-jsonld
# or
$ npm install nuxt-jsonld
```

```ts
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  buildModules: ['nuxt-jsonld'],
});
```

## Usage

### Composition API

You can call `useJsonld` with a json object.  
Alternatively, you can pass a function for a reactive json, just as [`useHead`](https://v3.nuxtjs.org/guide/features/head-management/#usehead-composable) composable.

You can use `useJsonld` without importing, since it is provided as [Nuxt auto-imports functions](https://v3.nuxtjs.org/guide/concepts/auto-imports#nuxt-auto-imports).  
Of course, you can import explicitly from `#jsonld`.

```vue
<script lang="ts">
// You don't need to import explicitly.
// import { useJsonld } from '#jsonld';

export default defineComponent({
  setup() {
    // just pass a jsonld object for static jsonld
    useJsonld({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: 'static json',
    });

    // pass a function which returns a jsonld object for reactive jsonld
    const count = ref(0);
    const countUp = () => {
      count.value += 1;
    };
    useJsonld(() => ({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: `reactive json: count is ${count.value}`,
    }));

    return {
      count,
      countUp,
    };
  },
});
</script>
```

### Options API

Make a jsonld method to your Vue components and return structured data object.

```vue
<script lang="ts">
import type { WithContext, ListItem } from 'schema-dts';

export default defineComponent({
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
  jsonld(): WithContext<ListItem> {
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }));
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  },
});
</script>
```

If you do not want to make jsonld tag, just return null

```vue
<script lang="ts">
import type { WithContext, Product } from 'schema-dts';

export default defineComponent({
  props: ['product'],
  jsonld(): WithContext<Product> | null {
    if (!this.product) {
      return null;
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: this.product.name,
    };
  },
});
</script>
```

You can return multiple json data as an array.

```js
[
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      /* breadcrumb items*/
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      /* article info */
    },
  },
];
```

Or use `@graph` notation. [#247](https://github.com/ymmooot/nuxt-jsonld/issues/247#issuecomment-579851220)
