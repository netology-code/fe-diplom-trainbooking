import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import controllers from '../controllers';
import Db from './Db';

class App {
  constructor( config ) {
    this._config = config;
  }
  initDb() {
    const db = new Db( this._config.db );
    this.db = db;
    return db.connect();
  }
  listen() {
    const port = process.env.PORT || this._config.port,
      app = express();
    this.express = app;
    this._url = `http://localhost:${port}`;

    this.applyMiddleware();
    this.applyControllers();

    return new Promise( resolve => {
      this.server = app.listen( port, resolve );
    });
  }
  applyControllers() {
    Object.values( controllers ).forEach( Controller => {
      const controller = new Controller( this );
      controller.register();
    });
  }
  applyMiddleware() {
    const app = this.express,
      verify = ( req, res, buf ) => {
        req.rawBody = buf.toString();
      };

    app.use( cors());
    app.use(( req, res, next ) => {
      bodyParser.json({
        verify,
      })( req, res, ( err ) => {
        if ( !err ) {
          return next();
        }

        res.send({
          error: err.message
        })
      });
    });

  }
  onStart() {
    console.log( `Сервер запущен по адресу: ${this._url}` );
  }
  run() {
    this.initDb()
      .then( this.listen())
      .then( this.onStart.bind( this ));
  }
}

export default App;
