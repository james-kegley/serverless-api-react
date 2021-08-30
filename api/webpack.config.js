const slsw = require('serverless-webpack');

module.exports = {
  target: 'node',
  mode: 'none',
  entry: slsw.lib.entries,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
};