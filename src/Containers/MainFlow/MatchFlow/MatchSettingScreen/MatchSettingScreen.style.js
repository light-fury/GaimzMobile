// @flow
import {StyleSheet} from 'react-native';
import {colors, calcReal} from '../../../../Assets/config';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: calcReal(100),
  },
  header: {
    paddingTop: getStatusBarHeight(false),
    height: getStatusBarHeight(false) + calcReal(50),
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: calcReal(32),
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
    marginTop: calcReal(28),
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
});