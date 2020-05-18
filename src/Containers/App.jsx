import React, { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import RootContainer from './RootContainer';
import createStore from '../State';
import LocalizationProvider from '../Components/Translation';
import { MatchContext, UserContext, LobbyContext } from '../contexts';

export const { store, persistor } = createStore();

export default () => {
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState({});
  const [lobby, setLobby] = useState({});

  const initMatches = useCallback(async () => {
    try {
      const storage = await AsyncStorage.getItem('MatchSettings');
      if (storage) {
        setMatch(JSON.parse(storage));
      }
    } catch (err) {
      //
    }
  }, []);

  useEffect(() => { initMatches(); }, []);

  const updateMatch = useCallback((newMatch) => {
    AsyncStorage.setItem('MatchSettings', JSON.stringify(newMatch));
    setMatch(newMatch);
  });

  return (
    <LocalizationProvider>
      <MatchContext.Provider value={[match, updateMatch]}>
        <UserContext.Provider value={[user, setUser]}>
          <LobbyContext.Provider value={[lobby, setLobby]}>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                  <RootContainer />
                </SafeAreaProvider>
              </PersistGate>
            </Provider>
          </LobbyContext.Provider>
        </UserContext.Provider>
      </MatchContext.Provider>
    </LocalizationProvider>
  );
};
