import { createRouteBundle } from 'redux-bundler';
import Home from '../containers/home';
import FourOhFour from '../containers/404';

export default createRouteBundle({
  '/': Home,
  '*': FourOhFour
})