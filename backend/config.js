import sailsMongoAdapter from 'sails-mongo';

module.exports = {
  port: process.env.PORT || 3001,
  db: {
    adapters: {
      mongo: sailsMongoAdapter
    },
    datastores: {
      default: {
        adapter: 'mongo',
        url: process.env.DB_URL || 'mongodb://root@localhost:27017/netology'
      }
    }
  },
  cors: require( './config/cors' )
};
