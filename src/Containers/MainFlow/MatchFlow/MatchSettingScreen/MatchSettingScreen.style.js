// @flow
import { StyleSheet } from 'react-native';
import { colors, calcReal, isIphoneX } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: isIphoneX() ? calcReal(80) : calcReal(50),
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
  mr16: {
    marginRight: calcReal(16),
  },
  mv10: {
    marginTop: calcReal(10),
    marginBottom: calcReal(10),
  },
  padding0: {
    padding: 0,
    paddingBottom: calcReal(60),
  },
  mh48: {
    marginHorizontal: calcReal(48),
  },
  space: {
    height: calcReal(32),
  },
  fontSpacing: {
    letterSpacing: calcReal(1),
  },
  searchContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  topContainer: {
    paddingHorizontal: calcReal(24),
    paddingBottom: calcReal(12),
  },
  blackColor: {
    color: colors.steamBlack,
  },
  inputContainer: {
    marginTop: calcReal(6),
  },
  flexContainer: {
    flex: 1,
  },
  rowContainer: {
    marginTop: calcReal(6),
    flexDirection: 'row',
  },
  supportText: {
    lineHeight: calcReal(30),
    fontSize: calcReal(22),
    marginVertical: calcReal(22),
    fontWeight: '500',
    textAlign: 'left',
    color: colors.darkGray,
    marginHorizontal: calcReal(28),
  },
  gamesItem: {
    width: calcReal(120),
    height: calcReal(160),
    borderRadius: calcReal(12),
    marginRight: calcReal(18),
  },
  gamesContainer: {
    paddingHorizontal: calcReal(28),
  },
});
