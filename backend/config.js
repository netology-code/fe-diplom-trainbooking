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
        url: process.env.DB_URL || 'mongodb://localhost:27017/netology-fe-diplom'
      }
    }
  },
  cors: require( './config/cors' )
};
