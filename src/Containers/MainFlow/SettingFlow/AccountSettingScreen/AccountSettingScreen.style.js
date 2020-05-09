// @flow
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: getStatusBarHeight(false),
    paddingBottom: calcReal(100),
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: calcReal(18),
    borderTopLeftRadius: calcReal(32),
    borderTopRightRadius: calcReal(32),
    backgroundColor: colors.white,
  },
  innerContainer: {
    paddingHorizontal: calcReal(28),
    paddingVertical: calcReal(38),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: calcReal(38),
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
    backgroundColor: colors.secondary,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  headerTrashButton: {
    borderWidth: calcReal(1),
    borderColor: `${colors.gray}A0`,
    backgroundColor: colors.white,
  },
  headerIcon: {
    width: calcReal(22),
    height: calcReal(22),
  },
  titleText: {
    fontSize: calcReal(20),
    lineHeight: calcReal(20),
    fontWeight: 'bold',
    color: colors.secondary,
  },
  inputContainer: {
    marginBottom: calcReal(18),
  },
  mv10: {
    marginVertical: calcReal(8),
  },
});
