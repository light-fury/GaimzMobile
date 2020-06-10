// @flow
import { StyleSheet } from 'react-native';
import { colors, calcReal } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  flexContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: calcReal(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: calcReal(38),
    height: calcReal(38),
    borderRadius: calcReal(12),
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
  headerTextContainer: {
    marginLeft: calcReal(8),
    flexDirection: 'column',
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
  onlineStatus: {
    alignSelf: 'flex-end',
    width: calcReal(12),
    height: calcReal(12),
    borderRadius: calcReal(6),
    backgroundColor: colors.green,
    borderWidth: calcReal(2),
    borderColor: colors.steamBlack,
  },
  profileName: {
    marginHorizontal: calcReal(18),
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.steamBlack,
  },
  itemButton: {
    width: calcReal(40),
    height: calcReal(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(12),
    backgroundColor: colors.transparent,
    borderWidth: calcReal(2),
    borderColor: colors.grayOpacity,
  },
  whiteBackground: {
    borderWidth: 0,
    backgroundColor: colors.white,
  },
  itemIcon: {
    width: calcReal(18),
    height: calcReal(18),
    tintColor: colors.steamBlack,
  },
  headerLeftIcon: {
    tintColor: colors.steamBlack,
  },
  headerRightIcon: {
    tintColor: colors.gray,
  },
  rightButton: {
    backgroundColor: colors.transparent,
  },
  arrowIcon: {
    width: calcReal(18),
    height: calcReal(18),
    marginRight: calcReal(28),
  },
  scrollIntent: {
    paddingHorizontal: calcReal(24),
    paddingBottom: calcReal(22),
  },
  itemContainer: {
    marginBottom: calcReal(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: calcReal(22),
    lineHeight: calcReal(30),
    fontWeight: 'bold',
    marginHorizontal: calcReal(24),
    marginBottom: calcReal(24),
    marginTop: calcReal(32),
    color: colors.steamBlack,
  },
});
