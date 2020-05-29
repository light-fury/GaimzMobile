// @flow
import { StyleSheet, Dimensions } from 'react-native';
import { colors, calcReal, isIphoneX } from '../../../../Assets/config';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: isIphoneX() ? calcReal(80) : calcReal(50),
  },
  flexContainer: {
    flex: 1,
  },
  profileName: {
    marginHorizontal: calcReal(18),
    fontSize: calcReal(16),
    lineHeight: calcReal(22),
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  headerIcon: {
    tintColor: colors.black,
  },
  scrollIntent: {
    paddingHorizontal: calcReal(16),
    paddingBottom: calcReal(80),
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
