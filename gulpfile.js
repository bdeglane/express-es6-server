var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var scriptWebpackConfig = require('./script.webpack.config');
var webserver = require('gulp-webserver');
var mocha = require('gulp-mocha');
var path = require('path');
var nodemon = require('gulp-nodemon');

//var dist = path.join(__dirname, 'dist', '/');
var dist = path.join('./dist', '/');

gulp.task('default', ['server']);

// start nodemon
gulp.task('run:dev', function () {
  nodemon({
    script: path.join('./dist', 'server.js'),
    ext: 'js html',
    env: {'NODE_ENV': 'development'}
  })
});

// start the prod build
gulp.task('run', function () {

});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('build:dev', ['webpack:build-dev'], function () {
  gulp.watch(['app/**/*', 'core/**/*', 'config/**/*'], ['webpack:build-dev']);
});

// Production build
gulp.task('build', ['webpack:build']);

// modify some webpack config options
var myScriptDevConfig = Object.create(scriptWebpackConfig);
myScriptDevConfig.devtool = 'sourcemap';
myScriptDevConfig.debug = true;
myScriptDevConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  }));

// create a single instance of the compiler to allow caching
var devScriptCompiler = webpack(myScriptDevConfig);


gulp.task('build:script:schema', function (callback) {
  // run webpack
  devScriptCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError('build:script:schema', err);
    gutil.log('[build:script:schema]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack:build', function (callback) {
  // modify some webpack config options
  var productionConfig = Object.create(webpackConfig);
  productionConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  productionConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }));

  webpack(productionConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;
myDevConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
  }));

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

// development build
gulp.task('webpack:build-dev', function (callback) {
  // run webpack
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});

// testing part
gulp.task('test', ['mocha:single']);

// run test for a single run
gulp.task('mocha:single', function () {
  return gulp.src(['./test/**/*.js'], {
    read: false
  })
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register'
    }));
});

// run test when files change
gulp.task('mocha:watch', function () {
  gulp.watch(['./app/**/*'], ['mocha:single']);
});
