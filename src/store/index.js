import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import rootReducer from './reducers';

export default function configureStore() {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // dev tools middleware
  const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      reduxDevTools
    )
  );

  // run the saga
  sagaMiddleware.run(rootSaga);

  // console.log('TCL: configureStore -> module.hot', module.hot);
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     console.log('TCL: configureStore -> reducers');
  //     const nextRootReducer = require('./reducers').default;
  //     store.replaceReducer(combineReducers(nextRootReducer));
  //   });
  // }

  return store;
}
