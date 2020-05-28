// @flow
import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import {
  Text, View, ActivityIndicator, Alert, ImageBackground, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import * as ProgressBar from 'react-native-progress';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import {
  get,
} from 'lodash';

import ConfirmButton from '../../../../Components/ConfirmButton';
import HeaderComponent from '../../../../Components/HeaderComponent';
import { updateMatchStatus, getMatchStatus, getUserById } from '../../../../api';
import { MatchContext, UserContext, LocalizationContext } from '../../../../contexts';
import styles from './MatchReadyScreen.style';
import { colors, calcReal, calculateTime } from '../../../../Assets/config';
import {
  settingsIcon, searchIcon, resetBackground,
} from '../../../../Assets';

const MatchReadyScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [user] = useContext(UserContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [startedTime] = useState(moment().add(30, 'seconds'));
  const [accepted, setAccepted] = useState(false);
  const { translations } = useContext(LocalizationContext);

  const checkMatchStatus = useCallback(async () => {
    try {
      const response = await getMatchStatus(get(match, 'match.matchId'));
      if (response && response.players && response.matchStatus === 'match_accepted') {
        const acceptedMatches = response.players.filter((item) => item.playerStatus === 'match_accepted');
        if (acceptedMatches && acceptedMatches.length === 2) {
          BackgroundTimer.stopBackgroundTimer();
          const targetUser = response.players.find((item) => item.userId !== user.userId);
          const opponent = await getUserById(targetUser.userId);
          if (opponent && opponent.user) {
            setMatch({
              ...match,
              match: response,
              opponent: opponent.user,
            });
            setTimeout(() => {
              navigation.navigate('LobbyStartScreen');
            }, 1000);
          }
        }
      }
    } catch (err) {
      //
    }
  });

  const acceptMatchRequest = useCallback(async () => {
    try {
      const params = {
        acceptMatch: true,
      };
      await updateMatchStatus(get(match, 'match.matchId'), params);
      setAccepted(true);
    } catch (err) {
      Alert.alert('Error', 'There was an error while accepting the match. Please try again.');
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
        navigation.pop(2);
      }, 1000);
    } catch (error) {
      //
    }
  });

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      const diff = moment().diff(startedTime, 'second');
      if (diff >= 0) {
        cancelMatchRequest();
      } else {
        setCurrentTime(diff);
        checkMatchStatus();
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
      <StatusBar barStyle="dark-content" />
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
            progress={-currentTime / 30}
            showsText
            textStyle={styles.itemTitle}
            formatText={() => `${calculateTime(-currentTime)}\n${translations['match.timer.ready']}`}
          />
          <View style={styles.flexContainer}>
            <Text style={styles.itemText}>
              {translations['match.timer.failure']}
            </Text>
          </View>
        </View>
        {accepted
          ? (<ActivityIndicator color={colors.loginColor} />)
          : (
            <ConfirmButton
              color={colors.loginColor}
              label={translations['global.accept']}
              onClick={acceptMatchRequest}
              fontStyle={styles.fontSpacing}
            />
          )}
      </ImageBackground>
    </SafeAreaView>
  );
};

MatchReadyScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
};

export default MatchReadyScreen;
