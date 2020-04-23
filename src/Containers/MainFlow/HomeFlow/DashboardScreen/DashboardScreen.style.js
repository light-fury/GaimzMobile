// @flow
import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../../Assets/config';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  topContainer: {
    marginTop: 40,
    marginBottom: 40,
    height: 90,
    alignItems: 'center',
  },
  logoImage: {
    width: 130,
    height: 90,
  },
  flexContainer: {
    flex: 1,
  },
});
