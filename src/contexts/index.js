import { createContext } from 'react';
import { translations, DEFAULT_LANGUAGE } from '../Assets/config';

export const MatchContext = createContext();
export const UserContext = createContext();
export const LobbyContext = createContext();
export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});
