// @flow
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flexContainer: {
    flex: 1,
  },
  webView: {
    width,
    height: width / 1.4,
    borderBottomLeftRadius: calcReal(12),
    borderBottomRightRadius: calcReal(12),
  },
  socialButton: {
    width: calcReal(38),
    height: calcReal(38),
    borderRadius: calcReal(12),
    position: 'absolute',
    top: getStatusBarHeight(false),
    left: calcReal(23),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.lightGray}70`,
  },
});
