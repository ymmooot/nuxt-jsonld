<template>
  <div>
    <h1>Composable Options</h1>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    useJsonld(
      () => {
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'nuxt-jsonld composable options',
        };
      },
      {
        tagPosition: 'bodyClose',
      }
    );
  },
});
</script>
