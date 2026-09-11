# nuxt-jsonld

[![version](https://img.shields.io/npm/v/nuxt-jsonld.svg)](https://www.npmjs.com/package/nuxt-jsonld)
[![downloads](https://img.shields.io/npm/dt/nuxt-jsonld.svg)](https://www.npmjs.com/package/nuxt-jsonld)
[![Test](https://github.com/ymmooot/nuxt-jsonld/workflows/Test/badge.svg)](https://github.com/ymmooot/nuxt-jsonld/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/ymmooot/nuxt-jsonld/branch/master/graph/badge.svg)](https://codecov.io/gh/ymmooot/nuxt-jsonld)
[![nuxt-jsonld](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/8v9ivg/master&style=flat&logo=cypress)](https://cloud.cypress.io/projects/8v9ivg/runs)

A Nuxt module to manage JSON-LD in Vue components. Supports Nuxt 3 and Nuxt 4.

Please read [`nuxt-jsonld@v1` document](https://github.com/ymmooot/nuxt-jsonld/blob/v1/README.md) if you are using Nuxt 2.

## Installation

```bash
$ pnpm add nuxt-jsonld
# or
$ npm install nuxt-jsonld
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-jsonld'],
});
```

## Usage

### Composition API

You can call `useJsonld` with a json object.  
Alternatively, you can pass a function for a reactive json.

You can use `useJsonld` without importing, since it is provided as [Nuxt auto-imports functions](https://nuxt.com/docs/guide/concepts/auto-imports).  
Of course, you can import explicitly from `#jsonld`.

```vue
<script lang="ts" setup>
// You don't need to import explicitly.
// import { useJsonld } from '#jsonld';

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
</script>
```

#### tagPosition

You can use the `tagPosition: 'bodyClose'` option on applicable tags to append them to the end of the `<body>` tag.
This option works the same as the one described in [useHead](https://nuxt.com/docs/getting-started/seo-meta#body-tags).

default: `head`

```ts
useJsonld(
  {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: 'static json',
  },
  {
    tagPosition: 'bodyClose', // 'head', 'bodyOpen', 'bodyClose'
  }
);
```

### Options API

Make a jsonld method to your Vue components and return structured data object.

```vue
<script lang="ts">
import type { WithContext, BreadcrumbList } from 'schema-dts';

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
  jsonld(): WithContext<BreadcrumbList> {
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

## Options

### disableOptionsAPI

Options API `jsonld` method is implemented using global mixin.  
You can disable it if you don't use it.  
(default: `false`)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-jsonld'],
  'nuxt-jsonld': { disableOptionsAPI: true },
});
```

Or

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [['nuxt-jsonld', { disableOptionsAPI: true }]],
});
```

## Tips

### Hide JSON-LD

If you don't need JSON-LD tag, just return null.

```ts
useJsonld(() => {
  if (!props.product) {
    return null;
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.product.name,
  };
});
```

### Multiple JSON-LD from one component

You can return multiple json data as an array.

```js
[
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [/* breadcrumb items */],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {/* article info */},
  },
];
```

Or use `@graph` notation. [#247](https://github.com/ymmooot/nuxt-jsonld/issues/247#issuecomment-579851220)

Note: Safari will log an error to the console when using an array to describe multiple data. While the library functions correctly, please exercise caution if you are aggregating error logs with tools like Sentry. To avoid this issue, use `@graph`. [#1280](https://github.com/ymmooot/nuxt-jsonld/issues/1280)
