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
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: colors.white,
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
  checkIcon: {
    width: calcReal(12),
    height: calcReal(12),
  },
  avatarImage: {
    width: calcReal(100),
    height: calcReal(100),
    borderRadius: calcReal(32),
    marginTop: calcReal(32),
    alignSelf: 'center',
    backgroundColor: colors.gray,
  },
  absolutePos: {
    marginTop: calcReal(20),
    marginHorizontal: calcReal(24),
  },
});
