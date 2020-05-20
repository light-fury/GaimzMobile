// @flow
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../Assets/config';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getStatusBarHeight(true),
    paddingBottom: calcReal(120),
  },
  flexStyle: {
    flex: 1,
  },
  logoImage: {
    width: calcReal(160),
    height: calcReal(50),
  },
  absoluteFill: {
    backgroundColor: colors.white,
    paddingHorizontal: calcReal(24),
    borderTopLeftRadius: calcReal(32),
    borderTopRightRadius: calcReal(32),
    marginTop: calcReal(-126),
    paddingTop: calcReal(40),
    paddingBottom: calcReal(60),
  },
  title: {
    fontSize: calcReal(22),
    lineHeight: calcReal(30),
    color: colors.steamBlack,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    color: colors.gray,
    marginTop: calcReal(8),
  },
  socialContainer: {
    marginTop: calcReal(24),
    flexDirection: 'row',
    height: calcReal(58),
    marginBottom: calcReal(10),
  },
  socialButton: {
    width: calcReal(38),
    height: calcReal(38),
    position: 'absolute',
    top: getStatusBarHeight(false),
    borderRadius: calcReal(12),
    left: calcReal(23),
    backgroundColor: `${colors.lightGray}70`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: calcReal(18),
    height: calcReal(18),
    tintColor: colors.white,
  },
  googleIconStyle: {
    width: calcReal(22),
    height: calcReal(22),
  },
  googleContainer: {
    marginRight: 0,
    borderColor: colors.grayOpacity2,
    borderWidth: calcReal(2),
  },
  inputContainer: {
    marginBottom: calcReal(16),
  },
  extraInstruction: {
    fontSize: calcReal(12),
    textAlign: 'center',
    marginBottom: calcReal(32),
  },
  lightFont: {
    fontWeight: '300',
  },
  space: {
    height: calcReal(46),
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
  headerIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
  successIcon: {
    width: calcReal(56),
    height: calcReal(56),
    marginTop: calcReal(42),
    marginBottom: calcReal(40),
    alignSelf: 'center',
  },
});
