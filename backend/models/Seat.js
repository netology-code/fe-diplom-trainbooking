import Waterline from 'waterline';

const Seat = Waterline.Collection.extend({
  identity: 'seat',
  datastore: 'default',
  primaryKey: '_id',
  attributes: {
    _id: {
      type: 'string'
    },
    train: {
      model: 'train'
    },
    route: {
      model: 'route'
    },
    type: {
      type: 'string'
    },
    index: {
      type: 'number'
    },
    is_child: {
      type: 'boolean'
    },
    is_wifi_included: {
      type: 'boolean'
    },
    is_linens_included: {
      type: 'boolean'
    }
  }
});
export default Seat;
