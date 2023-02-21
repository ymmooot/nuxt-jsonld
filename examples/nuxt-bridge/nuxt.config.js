
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  target: "server",
  ssr: true,
  plugins: ['@/plugins/jsonld'],
  build: {
    // @ts-ignore
    transpile: ['iron-webcrypto', 'unhead'],
  },
})
