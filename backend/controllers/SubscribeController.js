import Controller from './Controller';
import cors from 'cors';

class SubscribeController extends Controller {
  register() {
    const app = this.app.express;
    app.post( '/subscribe', cors(), this.actionSubscribe.bind( this ));
  }
  async actionSubscribe( req, res ) {
    return res.send({
      status: true
    });
  }
}

export default SubscribeController;
