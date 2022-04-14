<template>
  <div>
    <h1>Product Detail</h1>
    <div>
      <p>Name: {{ product.name }}</p>
      <p>Description: {{ product.description }}</p>
      <p>Purchase Date: {{ product.purchaseDate }}</p>
    </div>
    <button @click="updatePurchaseDate">Modify Purchase Date</button>
    <div>
      <nuxt-link to="/"> Back to list </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const { params } = useRoute();
    const purchaseDate = ref<string>(null);
    const updatePurchaseDate = () => {
      purchaseDate.value = new Date().toISOString();
    };

    useHead(() => ({
      title: `${params.id} ${purchaseDate.value}`,
    }));

    const product = reactive({
      name: params.id,
      description: `This is a sample ${params.id} product.`,
      purchaseDate,
    });

    useJsonld(() => {
      if (purchaseDate.value === null) {
        return
      }
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        ...product,
      }
    });

    useJsonld({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: 'Static json',
    });

    return {
      updatePurchaseDate,
      product,
    };
  },
});
</script>
