module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prettier',
    '@typescript-eslint'
  ],
  rules: {
    'no-underscore-dangle': ['error', { 'allow': ['_uid', '__dangerouslyDisableSanitizersByTagID'] }],
    'no-param-reassign': ['error',  { "props": false }],
    "no-unused-vars": 'off',
    "@typescript-eslint/no-unused-vars": "error"
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.ts',
        ],
      },
    },
    'import/core-modules': ['vue', 'vue-meta'],
  },
  overrides: [
    {
      files: ['test/**/**.spec.*'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
    },
  ],
}
