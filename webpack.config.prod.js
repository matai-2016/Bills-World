const webpack = require('webpack')

module.exports = {
  entry: './client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.css$/,
      loader: 'style!css?importLoaders=1!postcss'
    }]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['AUTH0_CLIENT_ID', 'AUTH0_DOMAIN']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  postcss: [
    require('autoprefixer')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
