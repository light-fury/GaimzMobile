// @flow
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, calcReal } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.darkGray,
  },
  textRight: {
    textAlign: 'right',
  },
  headerButton: {
    marginTop: calcReal(10),
    width: calcReal(38),
    height: calcReal(38),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcReal(12),
    backgroundColor: colors.signUpColor,
    marginRight: calcReal(10),
  },
  headerIcon: {
    width: calcReal(18),
    height: calcReal(18),
  },
  scrollIntent: {
    paddingHorizontal: calcReal(16),
    paddingBottom: calcReal(28),
  },
  itemContainer: {
    paddingTop: calcReal(28),
  },
  itemBackground: {
    width: width - calcReal(32),
    height: (width - calcReal(32)) / 1.8,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  itemImage: {
    flex: 1,
    borderRadius: calcReal(12),
  },
  statusContainer: {
    height: calcReal(28),
    borderRadius: calcReal(4),
    padding: calcReal(4),
    backgroundColor: colors.signUpColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: calcReal(18),
    height: calcReal(18),
    tintColor: colors.lightGray,
  },
  statusText: {
    marginLeft: calcReal(5),
    fontWeight: '300',
    fontSize: calcReal(14),
    color: colors.lightGray,
  },
  itemHostContainer: {
    height: calcReal(48),
    flexDirection: 'row',
    marginTop: calcReal(5),
    alignItems: 'center',
  },
  hostAvatar: {
    width: calcReal(48),
    height: calcReal(48),
    borderRadius: calcReal(12),
  },
  hostDetailsContainer: {
    marginLeft: calcReal(5),
  },
  hostNameText: {
    marginHorizontal: calcReal(0),
    marginRight: calcReal(18),
    fontSize: calcReal(18),
  },
  gameTitleText: {
    marginHorizontal: calcReal(0),
    marginRight: calcReal(18),
    fontSize: calcReal(16),
    fontWeight: 'normal',
  },
});
