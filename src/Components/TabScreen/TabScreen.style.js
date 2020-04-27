// @flow
import {StyleSheet} from 'react-native';
import {colors, calcReal} from '../../Assets/config';

export default StyleSheet.create({
  flexStyle: {
    height: calcReal(100),
    paddingBottom: calcReal(20),
    paddingHorizontal: calcReal(22),
    backgroundColor: colors.white,
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
    height: calcReal(80),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    width: calcReal(56),
    height: calcReal(56),
    borderRadius: calcReal(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: calcReal(30),
    height: calcReal(30),
    tintColor: colors.secondary,
  },
});
