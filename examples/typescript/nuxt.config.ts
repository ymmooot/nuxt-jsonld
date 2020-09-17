import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  ssr: true,
  plugins: ['@/plugins/jsonld'],
  buildModules: ['@nuxt/typescript-build'],
}

module.exports = config
