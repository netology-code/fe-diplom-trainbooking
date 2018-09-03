import SwaggerUI from 'swagger-ui';
import './sass/critical.sass';

SwaggerUI({
  dom_id: '#api-root',
  url: '/schema.json'
});
