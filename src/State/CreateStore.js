// @flow

import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */
  let middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware();
  middleware = [sagaMiddleware];

  /* ------------ Logger Middleware ------------- */
  // if (DebugSetting.reduxLogging) {
  // middleware.push(createLogger());
  // }

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  /* ------------- AutoRehydrate Enhancer ------------- */

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['Secrets'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // in dev mode, we'll create the store through Reactotron
  const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(...middleware),
      global.reduxNativeDevTools
        ? global.reduxNativeDevTools({ name: 'FirstDerm' })
        : (nope) => nope,
    ),
  );
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};
