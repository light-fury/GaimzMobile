// @flow
import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import ProgressCircle from 'react-native-progress-circle';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import {
  get,
} from 'lodash';

import ConfirmButton from '../../../../Components/ConfirmButton';
import styles from './MatchTimerScreen.style';
import { getMatchStatus, updateMatchStatus } from '../../../../api';
import { MatchContext } from '../../../../contexts';
import { colors, calcReal, calculateTime } from '../../../../Assets/config';

const WAIT_TEXT = 'Double click the timer to hide the search and explore Gaimz. We will notify you when the match is found.';
const TOTAL_CALL_DURATION = 600;

const MatchTimerScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [startedTime] = useState(moment());

  const checkMatchStatus = useCallback(async () => {
    try {
      const response = await getMatchStatus(get(match, 'match.matchId'));
      if (response && response.matchStatus === 'players_found') {
        BackgroundTimer.stopBackgroundTimer();
        setMatch({
          ...match,
          match: response,
        });
        setTimeout(() => {
          navigation.navigate('MatchReadyScreen');
        }, 1000);
      }
    } catch (err) {
      //
    }
  });

  const cancelMatchRequest = useCallback(async () => {
    try {
      const params = {
        acceptMatch: false,
      };
      await updateMatchStatus(get(match, 'match.matchId'), params);
      setMatch({
        ...match,
        match: {},
      });
      BackgroundTimer.stopBackgroundTimer();
      setTimeout(() => {
        navigation.pop();
      }, 1000);
    } catch (error) {
      //
    }
  });

  useEffect(() => {
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
          checkMatchStatus();
        }
      } else {
        cancelMatchRequest();
      }
    }, 1000);
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

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
        onClick={() => cancelMatchRequest()}
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
