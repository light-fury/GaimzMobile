import { Dimensions, Platform } from 'react-native';
import LocalizedStrings from 'react-native-localization';

import en from './localization/en.json';
import ru from './localization/ru.json';

const { width, height } = Dimensions.get('window');

export const baseUrl = 'https://sheets.googleapis.com/';

export const DEFAULT_LANGUAGE = 'en';
export const APP_LANGUAGE = 'appLanguage';

export const languages = { en, ru };

export const translations = new LocalizedStrings(languages);

export const calcReal = (number) => {
  const widthValue = (width / 420) * number;
  const heightValue = (height / 900) * number;
  return widthValue > heightValue ? heightValue : widthValue;
};

export const calculateTime = (time) => {
  const minutes = Math.floor(time / 60);
  let str = '';
  if (minutes > 0) {
    str = `${minutes} min `;
  }
  return `${str} ${(`${time % 60}`).slice(-2)} sec`;
};

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isIphoneX = () => Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && ((height === 812 || width === 812) || (height === 896 || width === 896));

export const colors = {
  primary: '#119DCD',
  primaryOpacity: '#11ABDFA8',
  secondary: '#1E1F20',
  secondaryOpacity: '#1E1F2030',
  white: '#FFFFFF',
  gray: '#8F92A1',
  darkGray: '#474747',
  grayOpacity: '#8F92A130',
  lightGray: '#F7F7F7',
  transparent: '#0000',
  fbColor: '#39579B',
  loginColor: '#613BFF',
  signUpColor: '#FA7267',
  steamBlack: '#1E1F20',
  twitchPurple: '#613BFF',
  yellow: '#FFFF82',
  green: '#4BDD08',
  borderGreen: '#00FF29',
  red: '#FF3A3A',
  black: '#000000',
  grayBorder: '#DDDDDD',
  grayText: '#979797',
  grayBackground: '#2E3134',
  ADSD: '#333333',
};
