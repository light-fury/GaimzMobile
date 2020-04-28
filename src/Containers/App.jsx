import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import RootContainer from './RootContainer';
import createStore from '../State';
import { UserContext } from '../contexts';
import { setApiClientHeader } from '../constants/api-client';
import { checkToken } from '../api';

export const { store, persistor } = createStore();

export default () => {
  const [user, setUser] = useState(null);

  const initUser = async () => {
    try {
      const token = await AsyncStorage.getItem('AuthToken');

      if (token) {
        setApiClientHeader('Authorization', `Bearer ${token}`);
        const data = await checkToken();
        setUser(data.user);
      }
    } catch (err) {
      // continue regardless of error
    }
    SplashScreen.hide();
  };


  useEffect(() => {
    initUser();
  }, []);

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
