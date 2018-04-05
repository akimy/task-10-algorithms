const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/js`,
    publicPath: '',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/public',
      to: '.',
    }]),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
