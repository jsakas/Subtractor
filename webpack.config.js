const path = require('path');
const { DefinePlugin } = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const MODE = process.env.WEBPACK_MODE || 'production';
const PRODUCTION = MODE === 'production';
const DEVTOOL = PRODUCTION ? 'source-map' : 'eval';

const { SENTRY_AUTH_TOKEN } = process.env;

module.exports = {
  mode: MODE,
  devtool: DEVTOOL,
  entry: {
    main: [
      './web/entry/sentry',
      './web/entry/main',
    ]
  },
  output: {
    filename: 'subtractor.js',
    path: path.resolve(__dirname, 'build', 'static'),
    publicPath: '/static/',
  },
  resolve: {
    alias: {
      'root': path.resolve(__dirname),
      'core': path.resolve(__dirname, 'core'),
      'presets': path.resolve(__dirname, 'presets'),
      'images': path.resolve(__dirname, 'web', 'images'),
      'style': path.resolve(__dirname, 'web', 'style'),
      'ui': path.resolve(__dirname, 'web', 'ui'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new DefinePlugin({
      'SENTRY_ENABLED': JSON.stringify(PRODUCTION),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'web', 'html', 'index.html'),
      filename: '../index.html',
      inject: 'body',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractCssChunks(),
    PRODUCTION &&
    SENTRY_AUTH_TOKEN && 
    new SentryCliPlugin({
      include: '.',
      ignore: ['node_modules', 'webpack.config.js'],
    })
  ].filter(o => o),
  devServer: {
    host: '0.0.0.0',
    port: 7200,
    historyApiFallback: true,
    disableHostCheck: true,
    index: path.join(__dirname, 'build', 'index.html'),
    contentBase: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|json|ico)$/,
        include: [path.resolve(__dirname, 'web', 'images')],
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/,],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
};
