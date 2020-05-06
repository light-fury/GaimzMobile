// @flow
import { StyleSheet } from 'react-native';
import { colors, calcReal } from '../Assets/config';

export default StyleSheet.create({
  headerRightButton: {
    paddingHorizontal: calcReal(20),
    width: calcReal(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mh10: {
    marginHorizontal: calcReal(10),
  },
  imageStyle: {
    width: calcReal(22),
    height: calcReal(22),
  },
  headerTextButton: {
    width: calcReal(100),
    justifyContent: 'center',
  },
  headerLeftTextStyle: {
    marginLeft: calcReal(20),
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    letterSpacing: calcReal(1),
    color: colors.white,
    textAlign: 'left',
  },
  headerRightTextStyle: {
    marginRight: calcReal(20),

    fontSize: calcReal(16),
    lineHeight: calcReal(18),
    letterSpacing: calcReal(1),
    color: colors.white,
    textAlign: 'right',
  },
});
