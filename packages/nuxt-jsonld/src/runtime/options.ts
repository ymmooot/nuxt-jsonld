import type { UseHeadOptions } from '@unhead/vue';

// Fallback for when the module is not building the app (unit tests, type resolution).
// The module replaces this module with a build time generated one through the `#jsonld-options` alias,
// so that reading the site wide defaults costs nothing at runtime.
export const defaultOptions: Pick<UseHeadOptions, 'tagPosition'> | undefined = undefined;
