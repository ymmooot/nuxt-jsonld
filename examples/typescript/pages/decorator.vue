<template>
  <div>
    <h1>
      typescript example
    </h1>
    <button @click="() => count++">+</button><br>
    <nuxt-link to="/">Options API</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Jsonld } from 'nuxt-jsonld'

@Jsonld
@Component
export default class Sample extends Vue {
  name = 'vue.js'
  count = 0

  jsonld(): object {
    return {
      '@context': "https://schema.org",
      "@type": "Product",
      name: this.name,
      count: this.count,
    };
  }
}
</script>
