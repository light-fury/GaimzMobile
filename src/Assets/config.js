import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const baseUrl = 'https://sheets.googleapis.com/';

export const calcReal = (number) => (width > 450 || width < 400 ? (width / 420) * number : number);

export const colors = {
  primary: '#119DCD',
  primaryOpacity: '#11ABDFA8',
  secondary: '#1E1F20',
  secondaryOpacity: '#1E1F2030',
  white: '#FFF',
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
};
