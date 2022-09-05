import { resolve } from 'pathe';
import { defineNuxtModule, addPlugin, addAutoImport } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { JsonLDFunc } from './types';

type ModuleOptions = {
  disableOptionsAPI: boolean;
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-jsonld',
    compatibility: {
      nuxt: '^3.0.0-rc.8',
      bridge: false,
    },
  },
  setup(options, nuxt: Nuxt) {
    const runtimeDir = resolve(__dirname, './runtime');
    const composable = resolve(__dirname, './runtime/composable');
    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.alias['#jsonld'] = composable;
    addAutoImport({
      name: 'useJsonld',
      from: composable,
    });

    if (!options.disableOptionsAPI) {
      addPlugin(resolve(runtimeDir, 'plugin'));
    }
  },
});

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    jsonld?: JsonLDFunc;
  }
}
