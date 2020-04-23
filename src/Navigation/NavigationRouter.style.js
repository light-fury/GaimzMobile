// @flow
import {StyleSheet} from 'react-native';
import {colors} from '../Assets/config';

export default StyleSheet.create({
  headerRightButton: {
    paddingHorizontal: 20,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mh10: {
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 22,
    height: 22,
  },
  headerTextButton: {
    width: 100,
    justifyContent: 'center',
  },
  headerLeftTextStyle: {
    marginLeft: 20,
    
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 1,
    color: colors.white,
    textAlign: 'left',
  },
  headerRightTextStyle: {
    marginRight: 20,
    
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 1,
    color: colors.white,
    textAlign: 'right',
  },
});
