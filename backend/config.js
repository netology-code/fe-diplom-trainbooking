import path from 'path';
import fs from 'fs';
import sailsMongoAdapter from 'sails-mongo';
import { mergeDeepWith, concat } from 'ramda';

const localConfigPath = path.join( __dirname, 'config.local.js' );

let localConfig = fs.existsSync( localConfigPath ) ? require( localConfigPath ) : {};
module.exports = mergeDeepWith( concat,
  {
    port: 3001,
    db: {
      adapters: {
        mongo: sailsMongoAdapter
      }
    },
    cors: require( './config/cors' )
  },
  localConfig
);
