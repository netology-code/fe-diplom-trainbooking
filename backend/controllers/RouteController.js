import cors from 'cors';
import {
  toRouteItems,
  getDateCriteria,
  getPriceCriteria,
  getBoolPropsCriteria,
  getSortAttribute,
  toSeats
} from '../helpers/route';
import Controller from './Controller';

class RouteController extends Controller {
  register() {
    const app = this.app.express;
    app.get( '/routes', cors(), this.safeAction( this.actionRoutes ));
    app.get( '/routes/:id/seats', cors(), this.safeAction( this.actionSeats ));
    app.get( '/routes/cities', cors(), this.safeAction( this.actionCities ));
    app.get( '/routes/last', cors(), this.safeAction( this.actionLastRoutes ));
  }
  async actionLastRoutes( req, res ) {
    const { Route } = this.app.db.models,
      routes = await Route.find({})
        .populate( 'train' )
        .populate( 'from_city' )
        .populate( 'to_city' )
        .populate( 'from_railway_station' )
        .populate( 'to_railway_station' )
        .limit( 5 )
        .sort( '_id DESC' ),
      items = toRouteItems( routes );
    return res.send( items );
  }
  async actionSeats( req, res ) {
    const { params } = req,
      { id } = params;
    if ( !id ) {
      return res.send({
        error: 'Поле id обязательно для заполнения'
      });
    }
    const { Route, Train } = this.app.db.models,
      route = await Route.findOne({
        _id: id
      })
        .populate( 'bought_seats' );
    if ( !route ) {
      return res.send({
        error: 'Направление не найдено'
      });
    }
    const train = await Train.findOne({
        _id: route.train
      })
        .populate( 'coaches' ),
      seats = toSeats( route, train, req.query );
    return res.send( seats );
  }
  async actionRoutes( req, res ) {
    const { query } = req,
      {
        from_city_id: fromCityId,
        to_city_id: toCityId,
        date_start: dateStart,
        date_end: dateEnd,
        price_from: priceFrom,
        price_to: priceTo,
        offset = 0,
        sort = 'date'
      } = query,
      sortBy = getSortAttribute( sort ),
      limit = Math.min( 20, query.limit || 5 );
    if ( !fromCityId && !toCityId ) {
      return res.send({
        error: 'Поля from_city_id и to_city_id обязательны для заполнения'
      });
    }
    const { Route } = this.app.db.models,
      fromAttributes = {
        from_city: fromCityId,
        to_city: toCityId
      },
      results = {};

    if ( dateStart ) {
      fromAttributes.date_depart = getDateCriteria(
        dateStart,
        query.start_departure_hour_from,
        query.start_departure_hour_to
      );
    }
    if ( query.date_start_arrival ) {
      fromAttributes.date_arrival = getDateCriteria(
        query.date_start_arrival,
        query.start_arrival_hour_from,
        query.start_arrival_hour_to
      );
    }

    if ( priceFrom || priceTo ) {
      fromAttributes.min_price = getPriceCriteria( priceFrom, priceTo );
    }
    Object.assign( fromAttributes, getBoolPropsCriteria( query ));
    const fromData = await Route.find( fromAttributes )
        .populate( 'train' )
        .populate( 'from_city' )
        .populate( 'to_city' )
        .populate( 'from_railway_station' )
        .populate( 'to_railway_station' )
        .skip( offset )
        .limit( limit )
        .sort( sortBy ),
      fromTotalCount = await Route.count( fromAttributes );
    if ( dateEnd ) {
      const toAttributes = {
        from_city: toCityId,
        to_city: fromCityId
      };

      if ( priceFrom || priceTo ) {
        toAttributes.min_price = getPriceCriteria( priceFrom, priceTo );
      }

      toAttributes.date_depart = getDateCriteria(
        dateEnd,
        query.end_departure_hour_from,
        query.end_departure_hour_to
      );
      if ( query.date_end_arrival ) {
        toAttributes.date_arrival = getDateCriteria(
          query.date_end_arrival,
          query.end_arrival_hour_from,
          query.end_arrival_hour_to
        );
      }

      Object.assign( toAttributes, getBoolPropsCriteria( query ));

      const toData = await Route.find( toAttributes )
          .populate( 'train' )
          .populate( 'from_city' )
          .populate( 'to_city' )
          .populate( 'from_railway_station' )
          .populate( 'to_railway_station' )
          .skip( offset )
          .limit( limit )
          .sort( sortBy ),
        toTotalCount = await Route.count( fromAttributes );
      results.total_count = Math.min( fromTotalCount, toTotalCount );
      results.items = results.total_count > 0 ? toRouteItems( fromData, toData ) : [];
    } else {
      results.total_count = fromTotalCount;
      results.items = results.total_count > 0 ? toRouteItems( fromData ) : [];
    }
    return res.send( results );
  }
  async actionCities( req, res ) {
    const { name } = req.query;
    if ( !name ) {
      return res.send({
        error: 'Поле name обязательно для заполнения'
      });
    }
    const { City } = this.app.db.models,
      data = await City.find({
        name: {
          contains: name.toLowerCase()
        }
      })
        .limit( 10 );
    return res.send( data );
  }
}

export default RouteController;
