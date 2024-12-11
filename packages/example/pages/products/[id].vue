<template>
  <div>
    <h1>Product Detail with Reactivity</h1>
    <code v-if="!product.count">No JSON-LD will be shown. Click the button.</code>
    <code v-else>{{ product.count }}</code>
    <button type="button" @click="updateCount">Update Count</button>
    <div>
      <nuxt-link to="/"> Back to list </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { params } = useRoute();
const count = ref<number>(0);
const updateCount = () => {
  count.value++;
};
const product = reactive({
  name: params.id,
  description: `This is a sample ${params.id} product.`,
  count,
});

useHead({
  title: `Product: ${product.name}`,
});

useJsonld(() => {
  if (!product.count) {
    return null;
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    ...product,
  };
});
</script>
