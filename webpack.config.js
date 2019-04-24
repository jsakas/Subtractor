const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const mode = process.env.WEBPACK_MODE || 'production';

module.exports = {
  mode,
  devtool: 'eval',
  entry: {
    main: [
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
      'web-audio-test-api': path.resolve(__dirname, 'node_modules/web-audio-test-api'),
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'index.html'),
      filename: '../index.html',
      inject: 'body',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new ExtractCssChunks(),
  ],
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
      }
    ]
  },
};
