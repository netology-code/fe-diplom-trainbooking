import Waterline from 'waterline';

const City = Waterline.Collection.extend({
  identity: 'city',
  datastore: 'default',
  primaryKey: '_id',
  attributes: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    railway_stations: {
      collection: 'railwaystation',
      via: 'city'
    }
  }
});
export default City;
