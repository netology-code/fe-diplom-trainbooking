class Controller {
  constructor( app ) {
    this.app = app;
  }
  safeAction( action ) {
    return ( req, res ) => {
      const sendError = error => res.send({
        error: error.message
      });
      try {
        action
          .call( this, req, res )
          .catch( sendError );
      } catch ( e ) {
        sendError( e );
      }
    };
  }
  register() {

  }
}

export default Controller;
