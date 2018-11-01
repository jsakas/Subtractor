const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const mode = process.env.WEBPACK_MODE || 'production';

module.exports = {
  mode,
  entry: {
    main: [
      'custom-elements',
      'shadydom',
      './src/Subtractor.js',
      './src/components/Fader.js',
      './src/components/Keyboard.js',
      './src/components/Knob.js'
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
      'custom-elements': path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements/custom-elements.min'),
      'shadydom': path.resolve(__dirname, 'node_modules/@webcomponents/shadydom/shadydom.min')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'html', 'index.html'),
      filename: '../index.html',
      inject: 'head',
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
