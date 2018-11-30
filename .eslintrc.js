module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
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
    'no-underscore-dangle': ['error', { 'allow': ['_uid'] }],
  },
  settings: {
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
