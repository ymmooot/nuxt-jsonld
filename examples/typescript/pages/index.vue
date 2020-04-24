<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        typescript example
      </h1>
      <h2 class="subtitle">
        Vue.extend
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '~/components/Logo.vue';

export default Vue.extend({
  components: {
    Logo,
  },
  head() {
    return {
      title: 'This should be title of page',
      script: [
        {
          src: `https://cdnjs.cloudflare.com/ajax/libs/materialize/${this.ver}/js/materialize.min.js`
        }
      ]
    }
  },
  data(): object {
    return {
      ver: '1.0.0',
    }
  },
  jsonld() {
    return {
      '@context': "http://schema.org",
      body: {
        ver: this.ver,
        fuga: this.$store.state.fuga,
      },
    };
  },
});
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
