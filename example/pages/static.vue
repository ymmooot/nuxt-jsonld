<template>
  <div>
    <h1>Static JSON-LD example</h1>
    <div>
      <code v-html="jsonld"></code>
      <p class="message">
        When reloading on this page, a part of the jsonld is delayed, but the server-side rendering
        is working correctly. Don't worry.
      </p>
      <sample-comp />
      <nuxt-link to="/"> Back to list </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { getJsonldForDemo } from '@/mixins';

export default defineComponent({
  mixins: [getJsonldForDemo],
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
