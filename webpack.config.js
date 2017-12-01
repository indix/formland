const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './examples/src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'examples/dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer : {
    contentBase: path.resolve(__dirname, 'examples/dist'),
    port: 8000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/src/index.ejs',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}