<template>
  <div>
    <h1>Options API</h1>
    <div>
      <p>{{ count }}</p>
      <button @click="count++">+</button>
    </div>
    <nuxt-link to="/"> Back to list </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: this.count,
    };
  },
};
</script>
