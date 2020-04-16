<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">example</h1>
      <h2 class="subtitle">My marvelous Nuxt.js project</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
      <Count />
      <nuxt-link to="/">next</nuxt-link>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Count from '~/components/Count.vue'

export default {
  components: {
    Logo,
    Count,
  },
  head() {
    return {
      title: 'nuxt-jsonld sample',
    };
  },
  jsonld() {
  return [
    {
      "@context": "http://schema.org",
      "@type": "Periodical",
      "issn": "0140-6736",
      "hasPart": {
        "@id": "vol376",
        "@type": "PublicationVolume",
        "volumeNumber": "376",
        "hasPart": [
          {
            "@id": "issue9735",
            "@type": "PublicationIssue",
            "datePublished": "2010-07-03",
            "pageEnd": "140",
            "pageStart": "69",
            "issueNumber": "9735"
          },
          {
            "@id": "issue9734",
            "@type": "PublicationIssue",
            "datePublished": "2010-07-03",
            "pageEnd": "68",
            "pageStart": "1",
            "issueNumber": "9734"
          }
        ]
      },
      "name": "The Lancet",
      "publisher": "Elsevier"
    },
    {
      "@context": "http://schema.org/",
      "@type": "Organization",
      "name": "ACME",
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/LikeAction",
          "userInteractionCount": 1170
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/FollowAction",
          "userInteractionCount": 145098
        }
      ]
  }];
  },
};
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
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
