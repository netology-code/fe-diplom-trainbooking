import path from 'path';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
import webpackConfig from '../docs/webpack.config';

import { task, src, dest, watch, registerBundlerServer } from './util';

const G = loadPlugins(),
  syncServer = browserSync.create(),
  basePath = route => path.join( __dirname, '../docs', route ),
  srcPath = route => path.join( basePath( 'src' ), route ),
  devDir = basePath( 'dev' ),
  distDir = basePath( 'dist' );

task( 'api.browser-sync',
  registerBundlerServer({
    configPath: basePath( 'webpack.dev.config.js' ),
    baseDir: devDir,
    syncServer
  })
);

task( 'api.swagger:dev', () => src( srcPath( 'swagger/schema.yaml' ))
  .pipe( G.plumber())
  .pipe( G.changed( devDir ))
  .pipe( G.swagger( 'schema.json' ))
  .pipe( dest( devDir ))
  .pipe( syncServer.stream())
);

task( 'api.pug:dev', () => src( srcPath( 'pages/*.pug' ))
  .pipe( G.plumber())
  .pipe( G.changed( devDir ))
  .pipe( G.pug())
  .pipe( G.flatten({
    includeParents: 0
  }))
  .pipe( dest( devDir ))
  .pipe( syncServer.stream())
);

task( 'api:dev', () => {
  runSequence([
    'api.swagger:dev',
    'api.pug:dev',
    'api.browser-sync'
  ]);

  watch( srcPath( 'pages/*.pug' ), [ 'api.pug:dev' ]);
  watch( srcPath( 'swagger/**/*.yaml' ), [ 'api.swagger:dev' ]);
});


task( 'api.swagger:build', () => src( srcPath( 'swagger/schema.yaml' ))
  .pipe( G.plumber())
  .pipe( G.changed( distDir ))
  .pipe( G.swagger( 'schema.json' ))
  .pipe( dest( distDir ))
);

task( 'api.webpack:build', () => src( srcPath( 'entry.js' ))
  .pipe( G.plumber())
  .pipe( webpack( webpackConfig ))
  .pipe( dest( distDir ))
);

task( 'api:build', () => {
  runSequence([
    'api.swagger:build',
    'api.webpack:build'
  ]);
});
