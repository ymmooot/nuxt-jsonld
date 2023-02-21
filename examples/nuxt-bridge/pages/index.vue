<template>
  <div>
    <h1>
      example
    </h1>
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
