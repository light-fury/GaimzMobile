// @flow
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingBottom: calcReal(100),
  },
  flexContainer: {
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : calcReal(14),
    flexDirection: 'row',
    paddingTop: calcReal(8),
    paddingBottom: calcReal(22),
    paddingHorizontal: calcReal(20),
  },
  avatarImage: {
    borderRadius: calcReal(20),
    overflow: 'hidden',
    width: calcReal(78),
    height: calcReal(78),
  },
  userName: {
    fontSize: calcReal(22),
    lineHeight: calcReal(30),
    fontWeight: 'bold',
    color: colors.steamBlack,
    marginTop: calcReal(8),
    marginBottom: calcReal(4),
  },
  accountName: {
    fontSize: calcReal(14),
    lineHeight: calcReal(22),
    color: colors.gray,
  },
  itemStatus: {
    fontSize: calcReal(12),
    color: colors.gray,
    fontWeight: 'normal',
  },
  itemHeader: {
    marginTop: calcReal(12),
    marginBottom: calcReal(4),
    fontStyle: 'italic',
  },
  itemBackground: {
    height: calcReal(218),
    borderRadius: calcReal(12),
  },
  liveButton: {
    alignSelf: 'flex-start',
    margin: calcReal(8),
    paddingHorizontal: calcReal(10),
    height: calcReal(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(4),
    backgroundColor: colors.signUpColor,
  },
  eyeIcon: {
    width: calcReal(14),
    height: calcReal(10),
    marginLeft: calcReal(20),
    marginRight: calcReal(3),
  },
  smallFont: {
    fontSize: calcReal(14),
    marginLeft: calcReal(8),
  },
  heroImage: {
    width: calcReal(36),
    height: calcReal(48),
    borderRadius: calcReal(8),
  },
  scrollIntent: {
    paddingHorizontal: calcReal(24),
    paddingVertical: calcReal(20),
  },
  itemContainer: {
    marginBottom: calcReal(8),
    backgroundColor: colors.white,
    borderRadius: calcReal(12),
    paddingHorizontal: calcReal(12),
    paddingVertical: calcReal(20),
  },
  liveVideo: {
    width: width - calcReal(40),
    height: width * 0.6 - calcReal(24),
    marginBottom: calcReal(24),
    borderRadius: calcReal(12),
    marginHorizontal: calcReal(20),
    overflow: 'hidden',
  },
  // bottomContainer: {
  //   flex: 1,
  //   backgroundColor: colors.lightGray,
  //   borderTopLeftRadius: calcReal(32),
  //   borderTopRightRadius: calcReal(32),
  //   paddingTop: calcReal(40),
  //   paddingHorizontal: calcReal(20),
  // },
  leftButton: {
    backgroundColor: colors.steamBlack,
  },
  rightButton: {
    backgroundColor: colors.transparent,
    borderColor: colors.grayOpacity,
    borderWidth: 2,
  },
  rightIcon: {
    tintColor: colors.gray,
  },
  headerComponent: {
    height: getStatusBarHeight(true) + calcReal(184),
  },
  headerInnerComponent: {
    alignItems: 'flex-start',
    paddingTop: getStatusBarHeight(true) + calcReal(22),
    borderBottomLeftRadius: calcReal(32),
    borderBottomRightRadius: calcReal(32),
    shadowColor: colors.grayBorder,
  },
  userContainer: {
    position: 'absolute',
    top: getStatusBarHeight(true) + calcReal(22),
    height: calcReal(162),
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: calcReal(80),
  },
  horizontalScrollView: {
    height: calcReal(50),
  },
  horizontalInnerStyle: {
    paddingHorizontal: calcReal(38),
    height: calcReal(50),
    flexDirection: 'row',
  },
  horizontalTab: {
    height: calcReal(50),
    paddingHorizontal: calcReal(9),
    alignItems: 'center',
    paddingTop: calcReal(15),
    flexDirection: 'column',
  },
  tabText: {
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    fontWeight: 'bold',
    color: colors.steamBlack,
  },
  tabDot: {
    width: calcReal(5),
    height: calcReal(5),
    borderRadius: calcReal(2.5),
    backgroundColor: colors.steamBlack,
    margin: calcReal(5),
  },
  transparentBackground: {
    backgroundColor: colors.transparent,
  },
  grayText: {
    color: colors.gray,
  },
  whiteText: {
    color: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoUserImage: {
    width: calcReal(48),
    height: calcReal(48),
    borderRadius: calcReal(20),
  },
  mh10: {
    marginHorizontal: calcReal(10),
  },
});
