<template>
  <div>
    <h1>
      typescript example
    </h1>
    <button @click="() => count++">+</button><br>
    <nuxt-link to="/decorator">Class API</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  name: string,
  count: number,
}

export default Vue.extend({
  data(): Data {
    return {
      name: 'vue.js',
      count: 0,
    }
  },
  jsonld(): object {
    return {
      '@context': "https://schema.org",
      "@type": "Product",
      name: this.name,
      count: this.count,
    };
  },
})
</script>
