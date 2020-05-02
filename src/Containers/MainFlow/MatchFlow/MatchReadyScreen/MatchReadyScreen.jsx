// @flow
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import ProgressCircle from 'react-native-progress-circle';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchReadyScreen.style';
import { colors, calcReal } from '../../../../Assets/config';

const WAIT_TEXT = 'Failing to accept may result in a temporary match making ban';
const TOTAL_CALL_DURATION = 60;

const MatchReadyScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [startedTime] = useState(moment());

  useEffect(() => {
    BackgroundTimer.start();
    const interval = setInterval(() => {
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
        clearInterval(interval);
        navigation.pop(2);
      }
      if (diff >= 5) {
        clearInterval(interval);
        setTimeout(() => {
          navigation.navigate('LobbyStartScreen');
        }, 1000);
      }
    }, 1000);
    setIntervalId(interval);
    BackgroundTimer.stop();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const endTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    navigation.navigate('LobbyStartScreen');
  };

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
        <Text style={styles.itemTitle}>Your Match is ready</Text>
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
        label="ACCEPT"
        onClick={endTimer}
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

MatchReadyScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default MatchReadyScreen;
