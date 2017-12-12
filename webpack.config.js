const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

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
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
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
