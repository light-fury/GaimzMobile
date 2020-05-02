import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootContainer from './RootContainer';
import createStore from '../State';
import { UserContext } from '../contexts';

export const { store, persistor } = createStore();

export default () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <RootContainer />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </UserContext.Provider>
  );
};
