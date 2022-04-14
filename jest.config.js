module.exports = {
  moduleFileExtensions: ["js", "mjs", "ts"],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/$1",
    "#app": "<rootDir>/node_modules/nuxt3/dist/app/index.mjs",
    '#head': "<rootDir>/node_modules/nuxt3/dist/head/runtime/index.mjs",
  },
  transform: {
    '^.+\\.(js|mjs|ts)$': 'esbuild-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(nuxt3))",
  ],
  testPathIgnorePatterns: ['<rootDir>/cypress'],
};
