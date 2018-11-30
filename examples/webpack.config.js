const path = require('path');

export default {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/',
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }, { test: /\.vue$/, use: 'vue-loader' }],
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      'vue-meta': path.join(__dirname, '..', 'src'),
    },
  },
};
