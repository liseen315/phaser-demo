var config = require('./config');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var opn = require('opn');
var webpackConfig = require('./webpack.dev.conf');
var port = process.env.PORT || config.dev.port;
var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
console.log('staticPath',staticPath);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n');
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  if (process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
});