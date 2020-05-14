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
    padding: 0,
    paddingBottom: calcReal(30),
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
  searchContainer: {
    flex: 1,
    marginHorizontal: calcReal(48),
    marginTop: calcReal(24),
    backgroundColor: colors.secondary,
    borderRadius: calcReal(12),
    paddingHorizontal: calcReal(23),
    paddingVertical: calcReal(12),
  },
  itemTitle: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  whiteColor: {
    color: colors.white,
    marginBottom: 0,
  },
  inputContainer: {
    marginTop: calcReal(12),
  },
  flexContainer: {
    flex: 1,
  },
  rowContainer: {
    marginTop: calcReal(6),
    flexDirection: 'row',
  },
  ml20: {
    marginLeft: calcReal(26),
  },
  orText: {
    lineHeight: calcReal(58),
    fontSize: calcReal(14),
    fontWeight: 'bold',
    letterSpacing: calcReal(1),
    textAlign: 'center',
  },
});
