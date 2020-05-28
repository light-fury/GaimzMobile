// @flow
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  mh70: {
    marginHorizontal: calcReal(97),
    height: calcReal(39),
    marginBottom: calcReal(32),
  },
  mb0: {
    marginBottom: 0,
  },
  space: {
    height: calcReal(18),
  },
  fontSpacing: {
    letterSpacing: calcReal(1),
  },
  flexContainer: {
    flex: 1,
  },
  headerInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  userInnerContainer: {
    backgroundColor: colors.white,
    borderRadius: calcReal(8),
    height: calcReal(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamItemContainer: {
    flex: 1,
    paddingHorizontal: calcReal(34),
  },
  profileText: {
    fontSize: calcReal(22),
    lineHeight: calcReal(30),
    fontWeight: 'bold',
    color: colors.white,
  },
  matchProgressText: {
    textTransform: 'none',
    letterSpacing: -0.25,
    textAlign: 'center',
    color: colors.gray,
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
  },
  alignLeft: {
    textAlign: 'left',
    color: colors.steamBlack,
    marginTop: calcReal(10),
    marginBottom: calcReal(8),
  },
  profileImage: {
    width: calcReal(78),
    height: calcReal(78),
    borderRadius: calcReal(20),
  },
  mt8: {
    marginTop: calcReal(8),
  },
  fontBig: {
    color: colors.steamBlack,
    lineHeight: calcReal(46),
  },
  fontMedium: {
    fontWeight: '300',
  },
  progressText: {
    textAlign: 'center',
    marginHorizontal: calcReal(10),
    letterSpacing: 0,
  },
  reportContainer: {
    height: calcReal(32),
    marginHorizontal: calcReal(25),
    borderBottomWidth: calcReal(1),
    borderBottomColor: `${colors.white}26`,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: calcReal(16),
    justifyContent: 'space-between',
  },
  endButtonStyle: {
    marginHorizontal: calcReal(97),
    height: calcReal(39),
    marginBottom: calcReal(10),
  },
  arrowImage: {
    width: calcReal(16),
    height: calcReal(16),
  },
  description: {
    color: colors.grayText,
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
  },
  individualPage: {
    width,
    paddingHorizontal: calcReal(15),
  },
  hideConfirm: {
    marginBottom: calcReal(71),
  },
  seperatorLine: {
    height: calcReal(1),
    backgroundColor: `${colors.white}26`,
    marginVertical: calcReal(15),
    marginHorizontal: calcReal(60),
  },
  inProgressContainer: {
    marginBottom: calcReal(16),
  },
  pt23: {
    paddingTop: calcReal(23),
  },
  heroImage: {
    width: calcReal(70),
    height: calcReal(40),
    borderRadius: calcReal(7),
  },
  absoluteOne: {
    position: 'absolute',
    top: calcReal(28) + getStatusBarHeight(false),
    left: width / 4,
    right: width / 4,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: calcReal(60),
  },
  mb4: {
    marginBottom: calcReal(4),
  },
  heroItemImageContainer: {
    width: calcReal(15),
    height: calcReal(15),
    marginHorizontal: calcReal(4),
    backgroundColor: colors.grayText,
    shadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: calcReal(15),
    shadowOffset: {
      width: 0,
      height: calcReal(4),
    },
  },
  heroItemImage: {
    width: calcReal(15),
    height: calcReal(15),
  },
  teamDetailHeader: {
    height: calcReal(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamDetailHeaderText: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    letterSpacing: calcReal(1),
    textTransform: 'uppercase',
    fontWeight: '300',
    color: colors.gray,
    textAlign: 'center',
  },
  memberContainer: {
    height: calcReal(70),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: calcReal(8),
    backgroundColor: colors.white,
    marginBottom: calcReal(6),
  },
  memberHeroImage: {
    borderRadius: calcReal(12),
    height: calcReal(40),
    width: calcReal(70),
  },
  memberDetailText: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    color: colors.gray,
    textAlign: 'center',
  },
  memberItemImage: {
    width: calcReal(12),
    height: calcReal(12),
    borderWidth: calcReal(1),
    borderColor: `${colors.white}B0`,
    marginHorizontal: calcReal(3),
  },
  headerIcon: {
    tintColor: colors.black,
  },
  rightButton: {
    backgroundColor: colors.green,
  },
  joinHeader: {
    height: calcReal(52),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.signUpColor,
    marginBottom: calcReal(28),
  },
  joinText: {
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
  profileContainer: {
    height: calcReal(132),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamTitleText: {
    fontSize: calcReal(10),
    fontStyle: 'italic',
    fontWeight: 'normal',
    color: colors.gray,
  },
  modalStyle: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000020',
    justifyContent: 'flex-end',
  },
  roundedRect: {
    borderTopLeftRadius: calcReal(32),
    borderTopRightRadius: calcReal(32),
    backgroundColor: colors.white,
    paddingHorizontal: calcReal(24),
  },
  modalHeader: {
    height: calcReal(5),
    width: calcReal(38),
    borderRadius: calcReal(3),
    backgroundColor: colors.steamBlack,
    opacity: 0.4,
    marginVertical: calcReal(24),
    alignSelf: 'center',
  },
  modalButtonIconContainer: {
    width: calcReal(28),
    height: calcReal(28),
    borderRadius: calcReal(8),
    backgroundColor: colors.secondaryOpacity,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: calcReal(16),
  },
  modalButtonIcon: {
    width: calcReal(14),
    height: calcReal(14),
    tintColor: colors.black,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: calcReal(24),
  },
  modalButtonTitle: {
    color: colors.steamBlack,
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    fontStyle: 'italic',
  },
  modalButtonDescription: {
    fontSize: calcReal(12),
    lineHeight: calcReal(20),
    color: colors.gray,
  },
});
