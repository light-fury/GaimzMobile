// @flow
import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-native-progress-circle';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './LobbyStartScreen.style';
import { colors, calcReal } from '../../../../Assets/config';

const TOTAL_CALL_DURATION = 600;

const PageScreen = ({
  currentTime, pageText, buttonVisible, sendInviteAgain,
}) => (
  <View style={styles.individualPage}>
    <View style={[styles.itemContainer, !buttonVisible && styles.hideConfirm]}>
      <ProgressCircle
        percent={(currentTime / TOTAL_CALL_DURATION) * 100}
        radius={calcReal(85)}
        borderWidth={calcReal(6)}
        color={colors.loginColor}
        shadowColor={colors.grayBackground}
        bgColor={colors.secondary}
      >
        <Text style={[styles.profileText, styles.progressText]}>
          {pageText}
        </Text>
      </ProgressCircle>
    </View>
    {buttonVisible && (
    <ConfirmButton
      color={colors.loginColor}
      label="SEND INVITE AGAIN"
      onClick={sendInviteAgain}
      fontStyle={styles.fontSpacing}
      containerStyle={styles.mh70}
    />
    )}
  </View>
);

PageScreen.propTypes = {
  currentTime: PropTypes.number.isRequired,
  sendInviteAgain: PropTypes.func,
  pageText: PropTypes.string.isRequired,
  buttonVisible: PropTypes.bool.isRequired,
};

PageScreen.defaultProps = {
  sendInviteAgain: () => {},
};

export default PageScreen;