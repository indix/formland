const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  entry: {
    main: './examples/src/index.tsx',
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.ts', '.scss', '.css', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'examples/dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/dist'),
    port: 8000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.examples.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/src/index.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunk: 2,
    }),
    new ExtractTextPlugin('main.css'),
  ].concat(
    process.env.NODE_ENV === 'production'
      ? [
          new MinifyPlugin(),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
          }),
        ]
      : [new webpack.HotModuleReplacementPlugin()],
  ),
}
