<template>
  <div>
    <h1>Context example</h1>
    <div>
      <pre>{{ JSON.stringify(dog, null, 4) }}</pre>
      <nuxt-link to="/"> Back to list </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDog } from '@/composables/dog';
const { dog } = await useDog();
useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'Thing',
  name: dog.name,
  description: `A ${dog.breed} dog: linked to this page`,
}));
</script>

<style scoped>
pre {
  display: block;
  margin: 10px auto;
  max-width: 300px;
  padding: 12px;
  text-align: left;
  background-color: gainsboro;
  border-radius: 4px;
}
</style>
