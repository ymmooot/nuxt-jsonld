import { describe, beforeEach, it, expect, vi, type Mock } from 'vitest';

import plugin from '../src/runtime/plugin';

const { vuePlugin, vueAppUse } = vi.hoisted(() => {
  return {
    vuePlugin: vi.fn(),
    vueAppUse: vi.fn(),
  };
});
vi.mock('../src/runtime/plugin-impl.ts', () => ({
  vuePlugin,
}));
vi.mock('nuxt/app', () => ({
  defineNuxtPlugin: vi.fn().mockImplementation((fn) => fn),
}));

describe('plugin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calles vuePlugin', () => {
    plugin({ vueApp: { use: vueAppUse } } as any);
    expect(vueAppUse).toBeCalledWith(vuePlugin);
  });
});
