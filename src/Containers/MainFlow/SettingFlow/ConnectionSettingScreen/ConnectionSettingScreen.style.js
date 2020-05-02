// @flow
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingBottom: calcReal(100),
  },
  flexContainer: {
    flex: 1,
  },
  header: {
    marginTop: getStatusBarHeight(false),
    height: calcReal(78),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: calcReal(8),
    paddingBottom: calcReal(22),
    paddingHorizontal: calcReal(20),
  },
  avatarImage: {
    borderRadius: calcReal(12),
    overflow: 'hidden',
    width: calcReal(48),
    height: calcReal(48),
  },
  profileName: {
    marginHorizontal: calcReal(18),
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.white,
  },
  headerButton: {
    width: calcReal(38),
    height: calcReal(38),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(12),
    borderWidth: calcReal(1),
    borderColor: `${colors.lightGray}70`,
    backgroundColor: colors.transparent,
    marginRight: calcReal(5),
  },
  itemButton: {
    width: calcReal(48),
    height: calcReal(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(12),
    backgroundColor: `${colors.white}30`,
  },
  itemIcon: {
    width: calcReal(36),
    height: calcReal(36),
    tintColor: colors.white,
  },
  headerIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
  arrowIcon: {
    width: calcReal(18),
    height: calcReal(18),
    marginRight: calcReal(28),
  },
  arrowConnectedIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
  arrowConnectedContainer: {
    width: calcReal(38),
    height: calcReal(38),
    marginRight: calcReal(18),
    borderRadius: calcReal(12),
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollIntent: {
    paddingHorizontal: calcReal(35),
    paddingBottom: calcReal(22),
  },
  itemContainer: {
    marginTop: calcReal(22),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: calcReal(22),
    lineHeight: calcReal(30),
    fontWeight: 'bold',
    marginHorizontal: calcReal(35),
    marginBottom: calcReal(6),
    color: colors.white,
  },
});
