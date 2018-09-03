import gulp from 'gulp';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const gulpCommands = [ 'task', 'src', 'dest', 'watch' ]
    .map( command => gulp[ command ].bind( gulp )),
  [ task, src, dest, watch ] = gulpCommands,
  getBundler = config => webpack( config ),
  registerBundlerServer = ({ configPath, baseDir, syncServer }) => {
    const webpackConfig = require( configPath ),
      bundler = getBundler( webpackConfig );
    return () => syncServer
      .init({
        port: 8080,
        server: {
          baseDir,
          middleware: [
            webpackDevMiddleware( bundler, {
              stats: {
                colors: true
              }
            }),
            webpackHotMiddleware( bundler )
          ]
        }
      });
  };

export {
  getBundler,
  registerBundlerServer,
  task,
  src,
  dest,
  watch
};
