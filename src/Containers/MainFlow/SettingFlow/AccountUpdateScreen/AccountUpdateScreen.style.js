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
  headerTextContainer: {
    marginHorizontal: calcReal(36),
    marginBottom: calcReal(24),
  },
  inputContainer: {
    marginBottom: calcReal(16),
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
  centerText: {
    textAlign: 'center',
  },
  headerLeftIcon: {
    tintColor: colors.steamBlack,
  },
  scrollIntent: {
    paddingHorizontal: calcReal(24),
    paddingVertical: calcReal(32),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: calcReal(24),
    height: calcReal(24),
    borderRadius: calcReal(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginLeft: calcReal(20),
  },
  checkBoxBorder: {
    backgroundColor: colors.transparent,
    borderWidth: calcReal(2),
    borderColor: colors.gray,
  },
  checkIcon: {
    width: calcReal(12),
    height: calcReal(12),
  },
});
