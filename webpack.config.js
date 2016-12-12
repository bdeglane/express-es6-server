var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    app: ['babel-polyfill', path.join(__dirname, 'core', 'main.js')],
    // app: path.join(__dirname, 'core', 'main.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: path.join('./', 'static', '/')
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.json',
      '.css',
      'jsonp'
    ]
  },
  externals: nodeModules,
  target: "node",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        plugins: ['transform-runtime'],
        query: {
          presets: ['es2015']
        }
      }, {
        test: /\.ts(x?)$/,
        loader: 'babel-loader!ts-loader'
      }, {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }, {
        test: /\.json$/,
        loaders: [
          "json",
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false})
  ],
  stats: {
    colors: true
  }
};
