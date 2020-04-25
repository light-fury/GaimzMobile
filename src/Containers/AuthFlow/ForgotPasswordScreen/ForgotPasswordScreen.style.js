// @flow
import {StyleSheet, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors} from '../../../Assets/config';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  topContainer: {
    height: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getStatusBarHeight(false) + 40,
  },
  flexStyle: {
    flex: 1,
  },
  logoImage: {
    width: width / 3.5,
    height: width / 3.5,
  },
  absoluteFill: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  scrollInner: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 22,
    lineHeight: 30,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray,
    marginTop: 8,
  },
  socialButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    position: 'absolute',
    top: getStatusBarHeight(false),
    left: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${colors.lightGray}70`,
  },
  inputContainer: {
    marginBottom: 18,
  },
  lightFont: {
    fontWeight: '300',
  },
  space: {
    height: 20,
  },
  input: {
    fontSize: 18,
    lineHeight: 20,
    paddingVertical: 10,
    color: colors.white,
  },
  loginButton: {
    height: 40,
    borderRadius: 20,
    marginHorizontal: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  loginButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.white,
  },
  createButton: {
    height: 20,
    marginTop: 30,
    alignSelf: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
  },
  mh20: {
    marginHorizontal: 20,
  },
});
