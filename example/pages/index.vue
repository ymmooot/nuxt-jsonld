<template>
  <div>
    <h1>Product List</h1>
    <code v-html="jsonld"></code>

    <nuxt-link :to="{ name: 'static' }">static</nuxt-link>
    <ul>
      <li v-for="p in products" :key="p.id">
        name:
        <nuxt-link :to="{ name: 'products-id', params: { id: p.name.toLowerCase() } }">
          {{ p.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { WithContext, ItemList } from 'schema-dts';
import { getJsonldForDemo } from '@/mixins';

export default defineComponent({
  mixins: [getJsonldForDemo],
  setup() {
    useHead({
      title: 'Product List',
    });

    return {
      products: [
        { name: 'Foo', id: 1 },
        { name: 'Bar', id: 2 },
        { name: 'Baz', id: 3 },
      ],
    };
  },
  jsonld(): WithContext<ItemList> {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: this.products.map((p) => ({
        '@type': 'ListItem',
        position: p.id,
        item: {
          '@type': 'Product',
          name: p.name,
        },
      })),
    };
  },
});
</script>
