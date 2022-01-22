const path = require('path');

var glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pageFiles = glob.sync(path.resolve(__dirname, './pages/*.js'));

const configs = pageFiles.map((pageFile) => {
  const extension = path.extname(pageFile);
  const fileName = path.basename(pageFile, extension);
  // console.log('\n\n', {pageFile, extension, fileName});
  return {
    mode: process.env.NODE_ENV || 'development',
    entry: {
      [fileName]: pageFile
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // 'style-loader',
            'css-loader'
          ]
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: '[name].html',
        inject: 'body',
        scriptLoading: 'defer',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  };
});

module.exports = configs;
