import Waterline from 'waterline';
import models from '../models/index';

class Db {
  constructor( config ) {
    this._config = config;
    this._waterline = new Waterline;

    this.registerModels();
  }
  registerModels() {
    const waterline = this._waterline;
    Object.values( models ).forEach( model => waterline.registerModel( model ));
  }
  get models() {
    if ( this._models ) {
      return this._models;
    }
    const { collections } = this._db;
    this._models = Object.keys( collections ).reduce(( target, collectionName ) => {
      const modelName = Object.keys( models )
        .find( name => name.toLowerCase() === collectionName );
      target[ modelName ] = collections[ collectionName ];
      return target;
    }, {});

    return this._models;
  }
  connect() {
    return new Promise(( resolve, reject ) =>
      this._waterline.initialize( this._config, ( err, db ) => {
        if ( err ) {
          return reject( err );
        }
        this._db = db;
        resolve( db );
      })
    );
  }
}

export default Db;
