import Waterline from 'waterline';

const Route = Waterline.Collection.extend({
  identity: 'route',
  datastore: 'default',
  primaryKey: '_id',
  attributes: {
    _id: {
      type: 'string'
    },
    from_city: {
      model: 'city'
    },
    to_city: {
      model: 'city'
    },
    from_railway_station: {
      model: 'railwaystation'
    },
    to_railway_station: {
      model: 'railwaystation'
    },
    date_depart: {
      type: 'number'
    },
    date_arrival: {
      type: 'number'
    },
    train: {
      model: 'train'
    },
    have_first_class: {
      type: 'boolean'
    },
    have_second_class: {
      type: 'boolean'
    },
    have_third_class: {
      type: 'boolean'
    },
    have_fourth_class: {
      type: 'boolean'
    },
    have_wifi: {
      type: 'boolean'
    },
    have_air_conditioning: {
      type: 'boolean'
    },
    is_express: {
      type: 'boolean'
    },
    price_info: {
      type: 'json'
    },
    min_price: {
      type: 'number'
    },
    duration: {
      type: 'number'
    },
    available_seats: {
      type: 'number'
    },
    available_seats_info: {
      type: 'json'
    },
    bought_seats: {
      collection: 'seat',
      via: 'route'
    }
  }
});
export default Route;
