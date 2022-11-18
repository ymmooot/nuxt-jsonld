module.exports = {
  moduleFileExtensions: ['js', 'mjs', 'ts'],
  collectCoverageFrom: ['src/runtime/**/*.{js,ts}', '!src/**/*.d.ts', '!src/runtime/plugin.ts'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/$1',
    '#app': '<rootDir>/node_modules/nuxt/dist/app/index.mjs',
    '#head': '<rootDir>/node_modules/nuxt/dist/head/runtime/index.mjs',
  },
  transform: {
    '^.+\\.(js|mjs)$': 'babel-jest',
    '^.+\\.(ts)$': 'esbuild-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(nuxt|unenv))'],
  testPathIgnorePatterns: ['<rootDir>/cypress'],
};
