// @flow

import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from './Sagas';
import { reducer as Secrets } from './Secrets/Reducer';

export default () => {
  const rootReducer = combineReducers({
    Secrets,
  });

  return configureStore(rootReducer, rootSaga);
};
