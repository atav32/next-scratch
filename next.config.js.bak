const withPlugins = require('next-compose-plugins');
const withSourceMaps = require("@zeit/next-source-maps");
const withTM = require('next-transpile-modules');
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

const config = {
  optimization: {
    minimize: false,
    minimizer: [],
  },
};

module.exports = withPlugins([
  withSourceMaps(),
  [
    withTM, {
      transpileModules: ['@tensorflow/tfjs', 'react-intl'],
    }
  ],
  withCSS(),
  [
    withSass,
    {
      cssModules: true,
    },
  ],
], config);
