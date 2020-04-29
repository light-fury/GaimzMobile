// @flow
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import ProgressCircle from 'react-native-progress-circle';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchTimerScreen.style';
import { colors, calcReal } from '../../../../Assets/config';

const WAIT_TEXT = 'Double click the timer to hide the search and explore Gaimz. We will notify you when the match is found.';
const TOTAL_CALL_DURATION = 30;

const MatchTimerScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [startedTime] = useState(moment());

  const runnable = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      let diff = moment().diff(startedTime, 'second');
      if (diff < TOTAL_CALL_DURATION) {
        if (diff > TOTAL_CALL_DURATION) {
          diff = TOTAL_CALL_DURATION;
        } else if (diff < 0) {
          diff = 0;
        }
        if (currentTime !== diff) {
          setCurrentTime(diff);
        }
      } else {
        BackgroundTimer.stopBackgroundTimer();
        navigation.pop();
      }
    }, 1000);
  };

  useEffect(() => {
    runnable();

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

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

MatchTimerScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default MatchTimerScreen;
