const withPlugins = require('next-compose-plugins');
const withSourceMaps = require("@zeit/next-source-maps");
const withTM = require('next-transpile-modules');

const config = {
  optimization: {
    minimize: false,
    minimizer: [],
  },
};

module.exports = withPlugins([
  withSourceMaps(),
  [withTM, {
    transpileModules: ['@tensorflow/tfjs', 'react-intl'],
  }],
], config);
