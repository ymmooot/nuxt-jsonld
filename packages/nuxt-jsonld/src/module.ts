import {
  defineNuxtModule,
  addPlugin,
  addImports,
  addTemplate,
  createResolver,
  useLogger,
} from '@nuxt/kit';
import type { JsonLDFunc } from './runtime/types';
import type { UseJsonldOptions } from './runtime/composable';

export type { UseJsonldOptions } from './runtime/composable';
export type { JsonLD, JsonLDFunc } from './runtime/types';

export interface ModuleOptions {
  /**
   * Default `tagPosition` for every `useJsonld` call and every Options API `jsonld` method.
   * Each call can still override it with its own option.
   */
  tagPosition?: UseJsonldOptions['tagPosition'];
  /**
   * Enable the Options API `jsonld` method, which is implemented using a global mixin.
   */
  enableOptionsAPI: boolean;
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
    enableOptionsAPI: false,
  },
  setup(options, nuxt) {
    const logger = useLogger('nuxt-jsonld');
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve('./runtime');
    const composable = resolver.resolve('./runtime/composable');
    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.alias['#jsonld'] = composable;
    addImports([{ name: 'useJsonld', as: 'useJsonld', from: composable }]);

    // Inlined at build time instead of read from runtimeConfig, so that the defaults
    // cost nothing at runtime and the runtime stays usable outside of a Nuxt context.
    const optionsTemplate = addTemplate({
      filename: 'jsonld-options.mjs',
      getContents: () =>
        `export const defaultOptions = ${
          options.tagPosition ? JSON.stringify({ tagPosition: options.tagPosition }) : 'undefined'
        };\n`,
    });
    nuxt.options.alias['#jsonld-options'] = optionsTemplate.dst;

    if (options.enableOptionsAPI) {
      logger.warn(
        'The Options API `jsonld` method is deprecated and will be removed in the next major version. Use the `useJsonld` composable instead.'
      );
      addPlugin(resolver.resolve('./runtime/plugin'));
    }
  },
});

declare module 'vue' {
  interface ComponentCustomOptions {
    jsonld?: JsonLDFunc;
  }
}
