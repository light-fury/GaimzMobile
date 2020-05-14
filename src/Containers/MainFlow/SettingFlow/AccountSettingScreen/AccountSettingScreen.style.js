// @flow
import { StyleSheet, Platform } from 'react-native';
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
  innerContainer: {
    paddingHorizontal: calcReal(48),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: calcReal(28),
    marginHorizontal: calcReal(48),
  },
  avatarImage: {
    borderRadius: calcReal(34),
    overflow: 'hidden',
    width: calcReal(108),
    height: calcReal(108),
  },
  headerButton: {
    width: calcReal(48),
    height: calcReal(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(15),
    backgroundColor: colors.grayBorder,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  headerTrashButton: {
    borderWidth: calcReal(1),
    borderColor: colors.white,
    backgroundColor: colors.transparent,
  },
  headerTrashIcon: {
    width: calcReal(22),
    height: calcReal(22),
    tintColor: colors.white,
  },
  headerIcon: {
    width: calcReal(22),
    height: calcReal(22),
    tintColor: colors.black,
  },
  titleText: {
    fontSize: calcReal(20),
    lineHeight: calcReal(20),
    fontWeight: 'bold',
    color: colors.lightGray,
  },
  inputContainer: {
    marginBottom: calcReal(18),
    marginHorizontal: calcReal(48),
  },
  mv10: {
    marginVertical: calcReal(8),
    marginHorizontal: calcReal(48),
  },
  header: {
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : calcReal(14),
    height: calcReal(78),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: calcReal(8),
    paddingBottom: calcReal(22),
    paddingHorizontal: calcReal(20),
  },
  headerText: {
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: calcReal(18),
  },
  arrowImage: {
    width: calcReal(38),
    height: calcReal(38),
    borderRadius: calcReal(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.lightGray}70`,
  },
  arrowIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
  labelStyle: {
    color: colors.lightGray,
  },
});
