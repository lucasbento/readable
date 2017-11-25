import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import modules from './modules';
import sagas from './sagas';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  ...modules,
  router: routerReducer,
});

const middlewares = [routeMiddleware, sagaMiddleware];

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
  ),
);

sagaMiddleware.run(sagas);

export { store, history };
