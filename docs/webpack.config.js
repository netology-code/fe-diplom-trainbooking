import path from 'path';
import fs from 'fs';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
      config: {
        path: path.join( __dirname, 'postcss.config.js' ),
        ctx: {
          cssnano: {
            zindex: false
          },
          autoprefixer: {}
        }
      }
    }
  },
  sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  },
  mobileCSS = new ExtractTextWebpackPlugin( 'css/mobile.css' ),
  tabletCSS = new ExtractTextWebpackPlugin( 'css/tablet.css' ),
  desktopCSS = new ExtractTextWebpackPlugin( 'css/desktop.css' ),
  criticalCSS = new ExtractTextWebpackPlugin( 'css/critical.css' ),
  appCSS = new ExtractTextWebpackPlugin( 'css/app.css' ),
  getCriticalCSS = ( webpackStats, compilation ) => {
    const criticalFiles = Object.keys( compilation.assets )
        .filter( filename => filename.includes( 'critical.css' )),
      criticalContents = criticalFiles
        .map( filename => compilation.assets[ filename ].source());
    return criticalContents.join( '\n' );
  };

module.exports = {
  mode: 'production',
  entry: [
    path.join( __dirname, '/src/entry.js' )
  ],
  resolve: {
    alias: {},
    extensions: [ '.js', '.sass', '.scss' ]
  },
  stats: {
    colors: true
  },
  output: {
    path: path.join( __dirname, '/dist' ),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/fonts/[hash].[ext]'
            }
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'env', 'stage-0' ]
            }
          }
        ]
      },
      {
        test: /app\.sass$/,
        use: appCSS.extract([
          'css-loader',
          postCSSLoader,
          'resolve-url-loader',
          sassLoader
        ])
      },
      {
        test: /mobile\.sass$/,
        use: mobileCSS.extract([
          'css-loader',
          postCSSLoader,
          'resolve-url-loader',
          sassLoader
        ])
      },
      {
        test: /tablet\.sass$/,
        use: tabletCSS.extract([
          'css-loader',
          postCSSLoader,
          'resolve-url-loader',
          sassLoader
        ])
      },
      {
        test: /desktop\.sass$/,
        use: desktopCSS.extract([
          'css-loader',
          postCSSLoader,
          'resolve-url-loader',
          sassLoader
        ])
      },
      {
        test: /critical\.sass$/,
        use: criticalCSS.extract([
          'css-loader',
          postCSSLoader,
          'resolve-url-loader',
          sassLoader
        ])
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
          postCSSLoader
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    mobileCSS,
    desktopCSS,
    tabletCSS,
    criticalCSS,
    appCSS,
    ...fs.readdirSync( path.resolve( __dirname, 'src/pages' ))
      .filter( name => name.endsWith( '.pug' ))
      .map( filename => new HtmlWebpackPlugin({
        filename: filename.replace( '.pug', '.html' ),
        template: path.resolve( __dirname, `src/pages/${filename}` ),
        inject: false,
        minify: false,
        env: 'production',
        getCriticalCSS
      }))
  ]
};
