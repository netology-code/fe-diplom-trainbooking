import { compose, map, flatten, isNil, not, pickBy } from 'ramda';

const isNotNil = compose( not, isNil ),
  omitNil = pickBy( isNotNil );

export const toDirectionSeats = route => route.seats.map(
  seat => omitNil({
    route: route.route_direction_id,
    coach: seat.coach_id,
    index: seat.seat_number,
    is_child: seat.is_child,
    include_children_seat: seat.include_children_seat,
    datetime: Math.round( new Date / 1000 )
  })
);
export const toSeats = compose(
  flatten,
  map( toDirectionSeats )
);
