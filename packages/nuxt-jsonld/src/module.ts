import { defineNuxtModule, addPlugin, addImports, createResolver } from '@nuxt/kit';
import type { JsonLDFunc } from './runtime/types';

export type { UseJsonldOptions } from './runtime/composable';
export type { JsonLD, JsonLDFunc } from './runtime/types';

export interface ModuleOptions {
  disableOptionsAPI: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-jsonld',
    configKey: 'nuxt-jsonld',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    disableOptionsAPI: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve('./runtime');
    const composable = resolver.resolve('./runtime/composable');
    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.alias['#jsonld'] = composable;
    addImports([{ name: 'useJsonld', as: 'useJsonld', from: composable }]);

    if (!options.disableOptionsAPI) {
      addPlugin(resolver.resolve('./runtime/plugin'));
    }
  },
});

declare module 'vue' {
  interface ComponentCustomOptions {
    jsonld?: JsonLDFunc;
  }
}
