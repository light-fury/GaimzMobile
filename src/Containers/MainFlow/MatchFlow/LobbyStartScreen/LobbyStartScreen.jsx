// @flow
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import ProgressCircle from 'react-native-progress-circle';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './LobbyStartScreen.style';
import { colors, calcReal } from '../../../../Assets/config';

const WAIT_TEXT = 'Double click the timer to hide the search and explore Gaimz. We will notify you when the match is found.';
const TOTAL_CALL_DURATION = 30;

const LobbyStartScreen = ({ navigation }) => {
  const [currentTime] = useState(0);

  const calculateTime = (time) => `${(
    `${time % 60}`
  ).slice(-2)} sec`;

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      <View style={styles.searchContainer}>
        <Text style={styles.itemTitle}>Finding Match...</Text>
        <ProgressCircle
          percent={(currentTime / TOTAL_CALL_DURATION) * 100}
          radius={calcReal(80)}
          borderWidth={calcReal(6)}
          color={colors.loginColor}
          shadowColor={colors.grayBackground}
          bgColor={colors.secondary}
        >
          <Text style={styles.itemTitle}>
            {calculateTime(currentTime)}
          </Text>
        </ProgressCircle>
        <Text style={styles.itemText}>
          {WAIT_TEXT}
        </Text>
      </View>
      <ConfirmButton
        color={colors.loginColor}
        label="CANCEL"
        onClick={() => navigation.pop()}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      />
      <View style={styles.space} />
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="SETTINGS"
        onClick={() => navigation.popToTop()}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      />
      <View style={styles.space} />
    </SafeAreaView>
  );
};

LobbyStartScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default LobbyStartScreen;
