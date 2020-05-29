// @flow
import { StyleSheet } from 'react-native';
import { colors, calcReal, isIphoneX } from '../../Assets/config';

export default StyleSheet.create({
  flexStyle: {
    height: isIphoneX() ? calcReal(120) : calcReal(90),
    paddingBottom: isIphoneX() ? calcReal(30) : 0,
    paddingHorizontal: calcReal(12),
    borderTopRightRadius: calcReal(32),
    borderTopLeftRadius: calcReal(32),
    backgroundColor: colors.loginColor,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItemImage: {
    width: calcReal(25),
    height: calcReal(25),
    tintColor: colors.gray,
  },
  tabItem: {
    flex: 1,
    height: calcReal(90),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    width: calcReal(38),
    height: calcReal(38),
    borderRadius: calcReal(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteOpacity,
  },
  tabIcon: {
    width: calcReal(20),
    height: calcReal(20),
    tintColor: colors.white,
  },
  titleText: {
    fontSize: calcReal(15),
    lineHeight: calcReal(18),
    color: colors.gray,
  },
  titleFocused: {
    color: colors.steamBlack,
    fontWeight: 'bold',
  },
});
