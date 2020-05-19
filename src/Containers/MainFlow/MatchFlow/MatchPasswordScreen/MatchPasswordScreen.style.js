// @flow
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: calcReal(100),
  },
  header: {
    paddingTop: getStatusBarHeight(true),
    height: getStatusBarHeight(true) + calcReal(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentIntent: {
    height: calcReal(796),
  },
  padding0: {
    flex: 1,
  },
  mh48: {
    marginHorizontal: calcReal(48),
  },
  mh16: {
    marginTop: calcReal(12),
    marginHorizontal: calcReal(16),
    height: calcReal(42),
    backgroundColor: `${colors.loginColor}D8`,
  },
  disabledColor: {
    backgroundColor: `${colors.loginColor}30`,
  },
  space: {
    height: calcReal(18),
  },
  fontSpacing: {
    letterSpacing: calcReal(1),
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: calcReal(48),
    marginBottom: calcReal(32),
    marginTop: calcReal(24),
    backgroundColor: colors.steamBlack,
    borderRadius: calcReal(12),
    paddingHorizontal: calcReal(48),
    paddingVertical: calcReal(12),
  },
  itemTitle: {
    fontSize: calcReal(18),
    lineHeight: calcReal(23),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  whiteColor: {
    color: colors.white,
    marginBottom: 0,
  },
  inputContainer: {
    marginBottom: calcReal(30),
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: calcReal(12),
    lineHeight: calcReal(17),
    fontWeight: '300',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: -calcReal(0.25),
    marginVertical: calcReal(24),
    marginHorizontal: calcReal(16),
  },
});
