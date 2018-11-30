const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: false,
    },
  },
  extends: [
    'airbnb-base',
    // 'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    // 'vue',
    'prettier'
  ],
  rules: {
    'import/no-extraneous-dependencies': false,
    'no-underscore-dangle': ['error', { 'allow': ['_uid'] }],
  },
  settings: {
    'import/resolver': {
      alias:[
        ['vue', path.resolve(__dirname, '/node_modules/vue/dist/vue.js')],
        ['vue-jsonld', path.resolve(__dirname, 'src/index.js')],
      ],
    },
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {},
    },
  ],
}
