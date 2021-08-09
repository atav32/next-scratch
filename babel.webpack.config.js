module.exports = {
  preset: [
    ['@babel/preset-env', {useBuiltIns: 'usage', corejs: '3'}],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      'react-intl',
      {
        messagesDir,
        extractSourceLocation: true,
      },
    ],
  ],
  compact: true,
};
