const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('./js'),
  entry: './main.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: '.'
  },

  devtool: '#inline-source-map',

  plugins: [
    // allows for global variables
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|vendor)/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
        exclude: /node_modules/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
};
