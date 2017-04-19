var path = require('path');
var config = require('./config');
var projectRoot = path.resolve(__dirname, '../');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

module.exports = {
  entry: {
    main: path.resolve(projectRoot, 'src/Main.ts')
  },
  context: path.resolve(projectRoot, 'src'),
  output: {
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    path: path.resolve(projectRoot, 'dist')
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|jpg|png|gif|svg|eot|otf|webp|mp3|ogg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: 'static/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};