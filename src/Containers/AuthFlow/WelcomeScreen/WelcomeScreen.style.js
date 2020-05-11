// @flow
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainer: {
    height: calcReal(240),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getStatusBarHeight(false),
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
    paddingHorizontal: calcReal(28),
  },
  topBorderContainer: {
    height: calcReal(40),
    backgroundColor: colors.lightGray,
  },
  topWhiteContainer: {
    flex: 1,
    borderTopLeftRadius: calcReal(32),
    borderTopRightRadius: calcReal(32),
    backgroundColor: colors.white,
  },
  scrollInner: {
    paddingTop: calcReal(40),
    paddingHorizontal: calcReal(28),
  },
  title: {
    fontSize: calcReal(22),
    lineHeight: calcReal(30),
    color: colors.secondary,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: calcReal(14),
    lineHeight: calcReal(22),
    color: colors.gray,
    marginTop: calcReal(8),
  },
  socialContainer: {
    marginTop: calcReal(38),
    flexDirection: 'row',
    alignItems: 'center',
    height: calcReal(38),
    marginBottom: calcReal(28),
  },
  socialButton: {
    width: calcReal(50),
    height: calcReal(50),
    borderRadius: calcReal(12),
    borderColor: '#000000',
    borderWidth: 1,
    marginRight: calcReal(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: calcReal(18),
  },
  lightFont: {
    fontWeight: '300',
  },
  space: {
    height: calcReal(40),
  },
  input: {
    fontSize: calcReal(18),
    lineHeight: calcReal(20),
    paddingVertical: calcReal(10),
    color: colors.white,
  },
  loginButton: {
    height: calcReal(40),
    borderRadius: calcReal(20),
    marginHorizontal: calcReal(60),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: calcReal(60),
  },
  loginButtonText: {
    fontSize: calcReal(15),
    lineHeight: calcReal(20),
    fontWeight: '500',
    color: colors.white,
  },
  createButton: {
    height: calcReal(20),
    marginTop: calcReal(30),
    alignSelf: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: calcReal(1),
  },
});
