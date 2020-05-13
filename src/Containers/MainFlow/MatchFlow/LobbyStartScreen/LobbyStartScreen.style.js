// @flow
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ADSD,
    paddingBottom: calcReal(100),
  },
  header: {
    paddingTop: getStatusBarHeight(false),
    height: getStatusBarHeight(false) + calcReal(320),
    backgroundColor: colors.secondary,
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
  space: {
    height: calcReal(18),
  },
  fontSpacing: {
    letterSpacing: calcReal(1),
  },
  searchContainer: {
    flex: 1,
    paddingBottom: calcReal(22),
    paddingTop: calcReal(15),
    backgroundColor: colors.secondary,
  },
  flexContainer: {
    flex: 1,
  },
  headerInnerContainer: {
    flex: 1,
    paddingHorizontal: calcReal(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  teamItemContainer: {
    flex: 1,
    paddingHorizontal: calcReal(34),
  },
  profileText: {
    fontSize: calcReal(14),
    lineHeight: calcReal(20),
    letterSpacing: calcReal(1),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: colors.white,
  },
  matchProgressText: {
    textTransform: 'none',
    fontWeight: '300',
    letterSpacing: -0.25,
    lineHeight: calcReal(23),
    textAlign: 'center',
  },
  profileImage: {
    width: width / 3 - calcReal(16),
    height: width / 3 - calcReal(16),
  },
  mt8: {
    marginTop: calcReal(8),
  },
  fontBig: {
    fontSize: calcReal(24),
    lineHeight: calcReal(30),
  },
  fontMedium: {
    lineHeight: calcReal(20),
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
    marginHorizontal: calcReal(20),
  },
  individualPage: {
    width,
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
    marginHorizontal: calcReal(60),
    flexDirection: 'row',
    alignItems: 'center',
  },
  pt23: {
    paddingTop: calcReal(23),
  },
  heroImage: {
    width: calcReal(76),
    height: calcReal(34),
    borderWidth: calcReal(2),
    borderColor: colors.lightGray,
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
    alignItems: 'center',
  },
  mb4: {
    marginBottom: calcReal(4),
  },
  heroItemImage: {
    width: calcReal(15),
    height: calcReal(15),
    borderWidth: calcReal(1),
    borderColor: `${colors.white}B0`,
    marginHorizontal: calcReal(4),
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
    fontWeight: 'bold',
    color: colors.white,
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
});
