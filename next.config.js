const withSourceMaps = require('@zeit/next-source-maps');
const withTM = require('next-transpile-modules');
const withCSS = require('@zeit/next-css')

const nextConfig = {
  optimization: {
    minimize: false,
    minimizer: [],
  },
  webpack: (config, {dev, isServer, webpack}) => {
    console.log('%c webpack', 'color: #b0b', config.module.rules, dev, isServer);

    config.plugins.push(new webpack.IgnorePlugin(/exclude\.js/))

    config.module.rules.push({
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings to not break webpack build.
        emitWarning: true,
      },
    });
    return config;
  },

  // withTM
  transpileModules: ['@tensorflow/tfjs', 'react-intl'],

  // withCSS
  cssLoaderOptions: {
    localIdentName:
      process.env.NODE_ENV !== 'production'
        ? '[name]__[local]--[hash:base64:5]'
        : '[local]--[hash:base64:5]',
  },
  cssModules: true,
};

module.exports = withSourceMaps(withCSS(withTM(nextConfig)));
