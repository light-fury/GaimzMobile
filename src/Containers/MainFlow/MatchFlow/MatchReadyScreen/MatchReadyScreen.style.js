// @flow
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal, isIphoneX } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: isIphoneX() ? calcReal(80) : calcReal(50),
  },
  header: {
    paddingTop: getStatusBarHeight(true),
    height: getStatusBarHeight(true) + calcReal(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: calcReal(50),
  },
  fontSpacing: {
    letterSpacing: calcReal(1),
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: calcReal(24),
    paddingBottom: calcReal(60),
  },
  itemTitle: {
    fontSize: calcReal(18),
    lineHeight: calcReal(23),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: -0.25,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  itemText: {
    fontSize: calcReal(12),
    lineHeight: calcReal(17),
    marginHorizontal: calcReal(12),
    fontWeight: '300',
    color: colors.white,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  flexContainer: {
    flex: 1,
  },
  headerIcon: {
    tintColor: colors.black,
  },
  leftButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayOpacity,
  },
  rightButton: {
    backgroundColor: colors.green,
  },
});
