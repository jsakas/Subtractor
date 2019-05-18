const path = require('path');
const { DefinePlugin } = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const MODE = process.env.WEBPACK_MODE || 'production';
const PRODUCTION = MODE === 'production';
const DEVTOOL = PRODUCTION ? 'source-map' : 'eval';

const { SENTRY_AUTH_TOKEN } = process.env;

module.exports = {
  mode: MODE,
  devtool: DEVTOOL,
  entry: {
    main: [
      './src/sentry',
      './src/main',
    ]
  },
  output: {
    filename: 'subtractor.js',
    path: path.resolve(__dirname, 'build', 'static'),
    publicPath: '/static/',
  },
  resolve: {
    alias: {
      'style': path.resolve(__dirname, 'src', 'style'),
      'web-audio-test-api': path.resolve(__dirname, 'node_modules/web-audio-test-api'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new DefinePlugin({
      'SENTRY_ENABLED': JSON.stringify(PRODUCTION),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'index.html'),
      filename: '../index.html',
      inject: 'body',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractCssChunks(),
    PRODUCTION &&
    SENTRY_AUTH_TOKEN && 
    new SentryWebpackPlugin({
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
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
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
