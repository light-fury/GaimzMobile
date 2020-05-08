// @flow
import { StyleSheet } from 'react-native';
import { colors, calcReal } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: calcReal(100),
  },
  header: {
    height: calcReal(30),
  },
  flexContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    letterSpacing: calcReal(1),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  orText: {
    lineHeight: calcReal(58),
    fontSize: calcReal(14),
    fontWeight: 'bold',
    letterSpacing: calcReal(1),
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: calcReal(18),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.white,
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
  itemContainer: {
    marginTop: calcReal(23),
  },
  itemBackground: {
    width: calcReal(48),
    height: calcReal(48),
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  lockImage: {
    width: calcReal(20),
    height: calcReal(20),
  },
  itemImage: {
    flex: 1,
    borderRadius: calcReal(12),
    backgroundColor: colors.grayBackground,
  },
  padding0: {
    paddingHorizontal: calcReal(40),
    paddingBottom: calcReal(30),
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: calcReal(48),
    backgroundColor: colors.secondary,
    borderRadius: calcReal(12),
    paddingTop: calcReal(30),
  },
  ph12: {
    paddingHorizontal: calcReal(12),
  },
  gameDetails: {
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    fontWeight: 'bold',
    color: `${colors.white}50`,
    letterSpacing: calcReal(1),
    textTransform: 'uppercase',
  },
});
