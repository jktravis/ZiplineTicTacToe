var path = require('path');
var webpack = require('webpack');

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
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor)/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.css/,
        loaders: ['style', 'css']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
        exclude: /node_modules/,
        loader: 'file'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
};
