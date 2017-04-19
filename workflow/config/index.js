var path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
  },
  dev: {
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    port: 8080,
    assetsPublicPath: '/',
  }
};