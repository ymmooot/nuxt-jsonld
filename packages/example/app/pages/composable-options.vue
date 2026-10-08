<template>
  <div>
    <h1>Composable Options</h1>
    <nuxt-link to="/"> Back to list </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
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
</script>
