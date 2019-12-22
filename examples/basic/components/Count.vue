<template>
  <div>
    <button @click="up">+</button>: {{ count }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
    }
  },
  methods: {
    up() {
      this.count += 1
    }
  },
  jsonld() {
    return {
      '@context': "http://schema.org",
      "body": this.count
    }
  }
}
</script>
