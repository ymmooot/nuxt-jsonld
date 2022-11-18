<template>
  <div>
    <h1>Static JSON-LD example</h1>
    <div>
      <sample-comp />
      <nuxt-link to="/"> Back to list </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    useJsonld({
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: 'Static json',
    });
  },
});
</script>

<style scoped>
.message {
  display: block;
  margin: 10px auto;
  max-width: 500px;
  padding: 0 10px;
  text-align: left;
}
</style>
