const { resolve } = require('path');

module.exports = function nuxtJsonld(options) {
  this.addPlugin({
    src: resolve(__dirname, 'pluginTemplate.js'),
    fileName: 'jsonld.js',
    options,
    ssr: true,
  });
};
module.exports.meta = require('../package.json');
