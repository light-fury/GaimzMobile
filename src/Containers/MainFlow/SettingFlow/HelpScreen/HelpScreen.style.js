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
  headerLeftIcon: {
    tintColor: colors.steamBlack,
  },
  headerRightIcon: {
    tintColor: colors.gray,
  },
  rightButton: {
    backgroundColor: colors.transparent,
  },
  scrollIntent: {
    paddingHorizontal: calcReal(24),
    paddingVertical: calcReal(32),
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
  itemDescriptionText: {
    fontSize: calcReal(12),
    fontStyle: 'normal',
    color: colors.gray,
  },
  itemButton: {
    width: calcReal(28),
    height: calcReal(28),
    borderRadius: calcReal(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: calcReal(2),
    borderColor: colors.grayOpacity,
  },
  itemIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
});
