// @flow
import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../Assets/config';

const drawerWidth = Dimensions.get('window').width * 0.7;

export default StyleSheet.create({
  flexStyle: {
    height: 80,
    backgroundColor: colors.secondary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabItemTitle: {
    color: colors.gray,
    fontSize: 14,
    lineHeight: 26,
    textAlign: 'center',
  },
  tabItemImage: {
    width: 25,
    height: 25,
    tintColor: colors.gray,
  },
  tabItem: {
    flex: 1,
    height: 90,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: colors.gray,
  },
});
