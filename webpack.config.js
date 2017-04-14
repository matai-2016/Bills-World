var DotenvPlugin = require('webpack-dotenv-plugin')

module.exports = {
  entry: './client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    })
  ],
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
  postcss: [
   require('autoprefixer')
 ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map'
}
