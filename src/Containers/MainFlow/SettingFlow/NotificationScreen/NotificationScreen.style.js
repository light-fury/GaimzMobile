// @flow
import { StyleSheet } from 'react-native';
import { colors, calcReal } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingBottom: calcReal(100),
  },
  flexContainer: {
    flex: 1,
  },
  flexCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: calcReal(60),
  },
  reloadButton: {
    width: calcReal(64),
    height: calcReal(64),
    borderRadius: calcReal(12),
    backgroundColor: colors.grayOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reloadIcon: {
    width: calcReal(30),
    height: calcReal(30),
  },
  reloadText: {
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    fontStyle: 'italic',
    color: colors.steamBlack,
    marginTop: calcReal(16),
    textAlign: 'center',
  },
  headerNameText: {
    fontStyle: 'italic',
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    color: colors.steamBlack,
  },
  grayText: {
    color: colors.gray,
  },
  headerLeftIcon: {
    tintColor: colors.steamBlack,
  },
  scrollIntent: {
    paddingHorizontal: calcReal(24),
    paddingVertical: calcReal(16),
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    height: calcReal(20),
    backgroundColor: colors.red,
    borderRadius: calcReal(4),
    paddingHorizontal: calcReal(14),
    marginHorizontal: calcReal(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    color: colors.white,
  },
  pageTitle: {
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.steamBlack,
  },
  itemContainer: {
    marginBottom: calcReal(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: calcReal(12),
    backgroundColor: colors.white,
    height: calcReal(76),
    paddingHorizontal: calcReal(18),
  },
});
