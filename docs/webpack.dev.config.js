import path from 'path';
import webpack from 'webpack';

module.exports = {
  devtool: 'source-map',
  mode: 'none',
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      path.join( __dirname, '/src/entry.js' )
    ]
  },
  output: {
    path: path.join( __dirname, '/dev' ),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  resolve: {
    alias: {},
    extensions: [ '.js', '.sass', '.scss' ]
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|jpe?g|gif|png|)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimizes: false
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin
  ]
};
