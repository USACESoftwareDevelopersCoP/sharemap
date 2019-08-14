import { createRouteBundle } from 'redux-bundler';
import Home from '../containers/home';
import FourOhFour from '../containers/404';
import Map from '../containers/map/map';

export default createRouteBundle({
  '/': Home,
  '/map': Map,
  '*': FourOhFour
})