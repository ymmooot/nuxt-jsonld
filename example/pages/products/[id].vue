<template>
  <div>
    <h1>Product Detail with Reactivity</h1>
    <code v-if="!product.purchaseDate">No JSON-LD will be shown. Click the button.</code>
    <code v-else v-html="jsonld"></code>
    <button @click="updatePurchaseDate">Update Purchase Date</button>
    <div>
      <nuxt-link to="/"> Back to list </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { getJsonldForDemo } from '@/mixins';

export default defineComponent({
  mixins: [getJsonldForDemo],
  setup() {
    const { params } = useRoute();
    const purchaseDate = ref<string>(null);
    const updatePurchaseDate = () => {
      purchaseDate.value = new Date().toISOString();
    };
    const product = reactive({
      name: params.id as string,
      description: `This is a sample ${params.id} product.`,
      purchaseDate,
    });

    useHead({
      title: `Product: ${product.name}`,
    });

    useJsonld(() => {
      if (purchaseDate.value === null) {
        return;
      }
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        ...product,
      };
    });

    return {
      updatePurchaseDate,
      product,
    };
  },
});
</script>
