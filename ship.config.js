module.exports = {
  publishCommand: ({ isYarn }) => {
    return isYarn
      ? `npm_config_registry=https://registry.npmjs.org/ npm publish --tag v1-lts`
      : `npm publish --tag v1-lts`;
  },
};
