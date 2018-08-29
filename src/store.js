import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import * as services from './services';

/**
 * Reducers
 */
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reduxThunk.withExtraArgument(services)];

export default createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);
