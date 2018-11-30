import Vue from 'vue';
import VueJsonld from 'vue-jsonld';
import SampleBreadcrumbs from './SampleBreadcrumbs.vue';

Vue.use(VueJsonld);

new Vue({
  template: `
    <div id="app">
      <h1>vue-jsonld sample</h1>
      <sample-breadcrumbs :breadcrumbs="breadcrumbs" />
    </div>
  `,
  components: {
    SampleBreadcrumbs,
  },
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://example.com/',
          name: 'top page',
        },
        {
          url: 'https://example.com/foo/',
          name: 'foo',
        },
      ],
    };
  },
}).$mount('#app');
