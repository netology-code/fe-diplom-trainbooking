'use strict';

import path from 'path';
import open from 'open';
import express from 'express';
import config from './config.js';

const app = express(),
  port = process.env.PORT || config.port,
  url = `http://localhost:${port}`;

app.use( express.static( path.join( __dirname, 'dist' )));

app.listen( port, () => open( url ));
