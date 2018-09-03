import Waterline from 'waterline';

const Train = Waterline.Collection.extend({
  identity: 'train',
  datastore: 'default',
  primaryKey: '_id',
  attributes: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    have_coaches: {
      type: 'boolean'
    },
    coaches: {
      collection: 'coach',
      via: 'train'
    }
  }
});
export default Train;
