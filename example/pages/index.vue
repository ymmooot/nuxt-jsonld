<template>
  <div>
    <h1>Product List</h1>
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

export default defineComponent({
  setup() {
    useHead({
      title: 'Product List',
    });

    const products = [
      { name: 'Foo', id: 1 },
      { name: 'Bar', id: 2 },
      { name: 'Baz', id: 3 },
    ];
    return {
      products,
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
