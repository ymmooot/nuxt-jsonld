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
      <li><nuxt-link :to="{ name: 'option' }">Options API</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'composable-options' }">Composable API Options</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'context' }">Context</nuxt-link></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Product List',
});

const products = [
  { name: 'Foo', id: 1 },
  { name: 'Bar', id: 2 },
  { name: 'Baz', id: 3 },
];

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: products.map((p) => ({
    '@type': 'ListItem',
    position: p.id,
    item: {
      '@type': 'Product',
      name: p.name,
    },
  })),
});
</script>
