// @flow
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: calcReal(100),
  },
  flexContainer: {
    flex: 1,
    paddingHorizontal: calcReal(48),
  },
  header: {
    paddingTop: getStatusBarHeight(false),
    height: getStatusBarHeight(false) + calcReal(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.signUpColor,
  },
  profileName: {
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  mh48: {
    marginHorizontal: calcReal(48),
  },
  space: {
    height: calcReal(18),
  },
  fontSpacing: {
    letterSpacing: calcReal(1),
  },
  scrollIntent: {
    paddingBottom: calcReal(32),
    paddingTop: calcReal(24),
  },
  itemContainer: {
    marginRight: calcReal(96),
  },
  itemBackground: {
    width: width - calcReal(96),
    height: height - calcReal(358) - getStatusBarHeight(false),
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  itemImage: {
    flex: 1,
    borderRadius: calcReal(12),
    backgroundColor: colors.primary,
  },
});
