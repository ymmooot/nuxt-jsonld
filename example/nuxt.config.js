module.exports = {
  mode: 'universal',
  head: {
    title: 'nuxt-jsonld example',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'nuxt-jsonld example' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modules: [
    ['nuxt-jsonld', { space: 4 }]
  ],
}
