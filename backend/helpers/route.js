import {
  mergeWith, omit, or, pick,
  pickBy, range, isNil, compose, not,
  inc, equals as eq, whereEq,
  mapObjIndexed
} from 'ramda';
import moment from 'moment/moment';

const boolProps = [
    'have_first_class',
    'have_second_class',
    'have_third_class',
    'have_fourth_class',
    'have_wifi',
    'have_air_conditioning',
    'is_express'
  ],
  getBoolProps = compose(
    mapObjIndexed( val => val === 'true' ),
    pick( boolProps )
  ),
  isNotNil = compose( not, isNil ),
  omitEmptyBoolProps = compose( pickBy( isNotNil ), getBoolProps );

export const toRoute = item => {
  const omitProps = [
      'date_depart',
      'date_arrival',
      'from_city',
      'train',
      'to_city',
      'price_info',
      'from_railway_station',
      'to_railway_station'
    ],
    { price_info: priceInfo } = item;
  return {
    ...omit( omitProps, item ),
    train: omit([ 'have_coaches' ], item.train ),
    from: {
      railway_station_name: item.from_railway_station.name,
      city: item.from_city,
      datetime: item.date_depart
    },
    to: {
      railway_station_name: item.to_railway_station.name,
      city: item.to_city,
      datetime: item.date_arrival
    },
    price_info: Object.entries( priceInfo ).reduce(
      ( target, [ prop, value ]) => {
        if ( value !== false ) {
          target[ prop ] = value;
        }
        return target;
      },
      {}
    )
  };
};

export const toRouteItems = ( fromData, toData = []) => {
  if ( fromData.length === 0 ) {
    return [];
  }

  const commonLength = Math.min( fromData.length, toData.length );


  if ( toData.length === 0 ) {
    return fromData.map( item => ({
      ...getBoolProps( item ),
      min_price: item.min_price,
      available_seats: item.available_seats,
      available_seats_info: item.available_seats_info,
      departure: toRoute( item )
    }));
  }

  if ( commonLength === 0 ) {
    return [];
  }

  return range( 0, commonLength )
    .map( index => {
      const departure = toRoute( fromData[ index ]),
        arrival = toRoute( toData[ index ]);
      return {
        ...mergeWith(
          or,
          getBoolProps( departure ),
          getBoolProps( arrival )
        ),
        min_price: Math.min( departure.min_price, arrival.min_price ),
        available_seats: Math.min( departure.available_seats, arrival.available_seats ),
        available_seats_info: mergeWith(
          Math.min,
          departure.available_seats_info,
          arrival.available_seats_info
        ),
        departure,
        arrival
      };
    });
};

export const getDateCriteria = ( date, hourFrom = 0, hourTo = 23 ) => {
  const dayStarts = toSeconds( moment( date )
      .startOf( 'day' )
      .hour( hourFrom )
    ),
    dayEnds = toSeconds( moment( date )
      .endOf( 'day' )
      .hour( hourTo )
    );
  return {
    '>=': dayStarts,
    '<=': dayEnds
  };
};


export const getPriceCriteria = ( min, max ) => {
  const attributes = {};
  if ( min ) {
    attributes[ '>=' ] = min;
  }
  if ( max ) {
    attributes[ '<=' ] = max;
  }
  return attributes;
};

export const getBoolPropsCriteria = attributes => {
  return omitEmptyBoolProps( attributes );
};

export const toSeconds = value => +Math.round( value / 1000 );

export const getSortAttribute = value => {
  const data = {
    date: 'date_depart',
    price: 'price_min',
    duration: 'duration',
  };

  if ( data[ value ] === undefined ) {
    return 'date_depart';
  }
  return data[ value ];
};

export const toAvailableSeats = boughtSeats => coach => {
  const eqCoach = eq( coach._id ),
    boughtCoachSeats = boughtSeats
      .filter(({ coach }) => eqCoach( coach )),
    seats = range( 0, coach.available_seats )
      .map( position => {
        const index = inc( position ),
          eqIndex = eq( index ),
          seat = boughtCoachSeats.find(({ index }) => eqIndex( index )),
          available = isNil( seat );
        return {
          index,
          available
        };
      });
  return {
    coach,
    seats
  };
};

export const toSeats = ( route, train, attributes ) => {
  const { coaches = [] } = train,
    criteria = omitEmptyBoolProps( attributes ),
    { bought_seats: boughtSeats = [] } = route;
  console.log( criteria );
  return coaches
    .filter( whereEq( criteria ))
    .map( toAvailableSeats( boughtSeats, criteria ));
};
