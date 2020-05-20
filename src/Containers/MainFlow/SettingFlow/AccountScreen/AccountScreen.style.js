// @flow
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.steamBlack,
    paddingBottom: calcReal(100),
  },
  flexContainer: {
    flex: 1,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight(true) : calcReal(14),
    height: calcReal(78),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: calcReal(8),
    paddingBottom: calcReal(22),
    paddingHorizontal: calcReal(20),
  },
  avatarImage: {
    borderRadius: calcReal(12),
    overflow: 'hidden',
    width: calcReal(48),
    height: calcReal(48),
  },
  profileName: {
    marginHorizontal: calcReal(18),
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'right',
  },
  itemHeader: {
    fontSize: calcReal(18),
    lineHeight: calcReal(20),
    fontWeight: '300',
    letterSpacing: calcReal(1),
    color: colors.steamBlack,
  },
  itemDescription: {
    marginLeft: 'auto',
  },
  smallFont: {
    fontSize: calcReal(14),
    marginLeft: calcReal(8),
  },
  headerContainer: {
    height: calcReal(30),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: calcReal(20),
    marginRight: calcReal(26),
  },
  headerButton: {
    width: calcReal(38),
    height: calcReal(38),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(12),
    backgroundColor: `${colors.lightGray}70`,
  },
  headerIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
  heroImage: {
    width: calcReal(52),
    height: calcReal(38),
    borderRadius: calcReal(12),
    borderWidth: calcReal(1),
    borderColor: colors.borderGreen,
  },
  scrollIntent: {
    paddingLeft: calcReal(20),
    paddingRight: calcReal(26),
    paddingBottom: calcReal(20),
  },
  itemContainer: {
    marginTop: calcReal(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: calcReal(22),
    lineHeight: calcReal(30),
    fontWeight: 'bold',
    marginHorizontal: calcReal(20),
    marginBottom: calcReal(6),
    color: colors.grayBorder,
  },
  liveVideo: {
    width: width - calcReal(40),
    height: width * 0.6 - calcReal(24),
    marginBottom: calcReal(24),
    borderRadius: calcReal(12),
    marginHorizontal: calcReal(20),
    overflow: 'hidden',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderTopLeftRadius: calcReal(32),
    borderTopRightRadius: calcReal(32),
    paddingTop: calcReal(40),
    paddingHorizontal: calcReal(20),
  },
});
