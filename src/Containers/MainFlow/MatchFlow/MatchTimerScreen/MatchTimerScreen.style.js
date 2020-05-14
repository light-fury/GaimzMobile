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
  flex2: {
    flex: 2,
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
    marginBottom: calcReal(32),
    marginTop: calcReal(24),
    backgroundColor: colors.secondary,
    borderRadius: calcReal(12),
    paddingHorizontal: calcReal(38),
    paddingVertical: calcReal(12),
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: calcReal(18),
    lineHeight: calcReal(23),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
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
});
