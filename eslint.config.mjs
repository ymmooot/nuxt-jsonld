import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const cypressGlobals = Object.fromEntries(
  [
    'cy',
    'Cypress',
    'describe',
    'context',
    'it',
    'expect',
    'before',
    'beforeEach',
    'after',
    'afterEach',
  ].map((name) => [name, 'readonly'])
);

export default createConfigForNuxt({
  features: {
    stylistic: false,
  },
})
  .append(eslintPluginPrettierRecommended, {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  })
  .append({
    files: ['cypress/**/*.{js,ts}'],
    languageOptions: {
      globals: cypressGlobals,
    },
  })
  .append({
    ignores: [
      '**/dist/',
      '**/.nuxt/',
      '**/.output/',
      '**/coverage/',
      'cypress/fixtures/',
      'cypress/videos/',
    ],
  });
