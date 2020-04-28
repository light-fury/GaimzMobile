import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootContainer from './RootContainer';
import createStore from '../State';

export const { store, persistor } = createStore();

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <RootContainer />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);
