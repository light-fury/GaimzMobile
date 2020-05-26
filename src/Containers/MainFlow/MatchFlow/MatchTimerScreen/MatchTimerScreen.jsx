// @flow
import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import { Text, View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import BackgroundTimer from 'react-native-background-timer';
import * as ProgressBar from 'react-native-progress';
import moment from 'moment';
import {
  get,
} from 'lodash';

import ConfirmButton from '../../../../Components/ConfirmButton';
import HeaderComponent from '../../../../Components/HeaderComponent';
import styles from './MatchTimerScreen.style';
import { getMatchStatus, updateMatchStatus } from '../../../../api';
import { MatchContext, LocalizationContext } from '../../../../contexts';
import { colors, calcReal, calculateTime } from '../../../../Assets/config';
import {
  settingsIcon, searchIcon, resetBackground,
} from '../../../../Assets';

const TOTAL_CALL_DURATION = 600;

const MatchTimerScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [startedTime] = useState(moment());
  const [cancellingMatch, setCancellingMatch] = useState(false);
  const { translations } = useContext(LocalizationContext);

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
    setCancellingMatch(true);
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
        setCancellingMatch(false);
      }, 300);
    } catch (error) {
      //
      setCancellingMatch(false);
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
      <HeaderComponent
        label={translations['match.setting.title']}
        rightIcon={settingsIcon}
        rightStyle={styles.rightButton}
        rightClick={() => navigation.navigate('AccountScreen', { from: 'MatchFlow' })}
        leftIcon={searchIcon}
        leftClick={() => navigation.navigate({ key: 'MatchSearchScreen', routeName: 'MatchSearchScreen' })}
        leftIconStyle={styles.headerIcon}
        leftStyle={styles.leftButton}
      />
      <ImageBackground
        source={resetBackground}
        style={styles.topContainer}
        resizeMode="cover"
        imageStyle={styles.flexContainer}
      >
        <View style={styles.innerContainer}>
          <View style={styles.flexContainer} />
          <ProgressBar.Circle
            size={calcReal(180)}
            thickness={calcReal(6)}
            unfilledColor={colors.grayBackground}
            color={colors.primary}
            borderWidth={0}
            progress={(currentTime / TOTAL_CALL_DURATION)}
            showsText
            textStyle={styles.itemTitle}
            formatText={() => `${calculateTime(currentTime)}\n${translations['match.timer.find']}...`}
          />
          <View style={styles.flexContainer}>
            <Text style={styles.itemText}>
              {translations['match.timer.wait']}
            </Text>
          </View>
        </View>
        <ConfirmButton
          color={colors.loginColor}
          label={translations['global.cancel']}
          disabled={cancellingMatch}
          onClick={() => cancelMatchRequest()}
          fontStyle={styles.fontSpacing}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

MatchTimerScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default MatchTimerScreen;
