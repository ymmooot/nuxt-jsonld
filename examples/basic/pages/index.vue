<template>
  <div>
    <h1>
      example　{{ count }}
    </h1>
    <nuxt-link to="other">other</nuxt-link>
    <button @click="() => count++">+</button><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'vue.js',
      count: 0,
    }
  },
  head() {
    return {
      title: 'top'
    }
  },
  jsonld() {
    return {
      '@context': "https://schema.org",
      "@type": "Product",
      name: this.name,
      count: this.count,
    };
  },
}
</script>
