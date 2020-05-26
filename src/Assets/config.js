import { Dimensions, Platform } from 'react-native';
import LocalizedStrings from 'react-native-localization';

import en from './localization/en.json';

const { width, height } = Dimensions.get('window');

export const baseUrl = 'https://sheets.googleapis.com/';

export const DEFAULT_LANGUAGE = 'en';
export const APP_LANGUAGE = 'appLanguage';

export const languages = { en };

export const translations = new LocalizedStrings(languages);

export const calcReal = (number) => {
  const widthValue = (width / 375) * number;
  const heightValue = (height / 812) * number;
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
  primary: '#0659FD',
  secondary: '#79D0F1',
  fbColor: '#39579B',
  secondaryOpacity: '#1E1F2030',
  steamBlack: '#1E1F20',
  white: '#FFFFFF',
  gray: '#8F92A1',
  red: '#FF4E4E',
  redOpacity: '#FF4E4E30',
  green: '#53D769',
  lightGray: '#F7F7F7',
  darkGray: '#4F4F4F',
  grayOpacity: '#8F92A130',
  grayOpacity2: '#8F92A168',
  transparent: '#0000',
  loginColor: '#0C2362',
  signUpColor: '#FA7267',
  twitchPurple: '#613BFF',
  yellow: '#FFFF82',
  borderGreen: '#00FF29',
  black: '#000000',
  grayBorder: '#DDDDDD',
  grayText: '#979797',
  grayBackground: '#2E3134',
  ADSD: '#E5E5E5',
  whiteOpacity: '#FFFFFF30',
};
