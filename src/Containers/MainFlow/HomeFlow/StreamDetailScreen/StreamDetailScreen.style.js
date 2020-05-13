// @flow
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  flexContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  webView: {
    width,
    height: width / 1.4,
    backgroundColor: colors.transparent,
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
  headerIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
});
