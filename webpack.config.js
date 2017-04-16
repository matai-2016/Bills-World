const env = require('webpack').EnvironmentPlugin
const DotenvPlugin = require('webpack-dotenv-plugin')

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
  plugins:[
    new env(['AUTH0_CLIENT_ID', 'AUTH0_DOMAIN']),
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    })
  ],
  postcss: [
    require('autoprefixer')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map'
}
