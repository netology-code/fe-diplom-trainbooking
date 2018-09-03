import Waterline from 'waterline';

const Coach = Waterline.Collection.extend({
  identity: 'coach',
  datastore: 'default',
  primaryKey: '_id',
  attributes: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    train: {
      model: 'train'
    },
    class_type: {
      type: 'string'
    },
    have_wifi: {
      type: 'boolean'
    },
    have_air_conditioning: {
      type: 'boolean'
    },
    price: {
      type: 'number'
    },
    top_price: {
      type: 'number'
    },
    bottom_price: {
      type: 'number'
    },
    side_price: {
      type: 'number'
    },
    linens_price: {
      type: 'number'
    },
    wifi_price: {
      type: 'number'
    },
    is_linens_included: {
      type: 'boolean'
    },
    available_seats: {
      type: 'number'
    }
  }
});
export default Coach;
