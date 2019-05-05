const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const mode = process.env.WEBPACK_MODE || 'production';

module.exports = {
  mode,
  devtool: 'eval',
  entry: {
    main: ['./src/main'],
    test: ['./mocha/test'],
  },
  output: {
    filename: '[name].js',
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'mocha', 'index.html'),
      filename: '../mocha.html',
      body: ['test'],
      inject: false,
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
      // mocha test runner
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'node_modules', 'mocha'),
          path.resolve(__dirname, 'node_modules', 'chai'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          }
        ],
      },
      // {
      //   test: /\.js$/,
      //   include: [path.resolve(__dirname, 'mocha'),],
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //       },
      //     },
      //     {
      //       loader: 'babel-loader',
      //     }
      //   ],
      // },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules', 'mocha')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          }
        ],
      },
      // website
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'mocha'),
        ],
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
