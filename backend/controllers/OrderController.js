import { props, identity, filter, compose, flatten } from 'ramda';
import Controller from './Controller';
import cors from 'cors';
import { toSeats } from '../helpers/order';

class OrderController extends Controller {
  register() {
    const app = this.app.express;
    app.post( '/order', cors(), this.safeAction( this.actionOrder ));
  }
  async actionOrder( req, res ) {
    const { body } = req,
      { Seat } = this.app.db.models,
      processRequest = compose(
        toSeats,
        flatten,
        filter( identity ),
        props([ 'departure', 'arrival' ])
      ),
      seatsData = processRequest( body );
    for ( let attributes of seatsData ) {
      await Seat.create( attributes );
    }
    return res.send({
      status: true
    });
  }
}

export default OrderController;
