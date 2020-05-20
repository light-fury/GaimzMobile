// @flow
import React, {
  useState, useEffect, useCallback, useContext,
} from 'react';
import {
  Text, View, ActivityIndicator, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import ProgressCircle from 'react-native-progress-circle';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import {
  get,
} from 'lodash';

import ConfirmButton from '../../../../Components/ConfirmButton';
import { updateMatchStatus, getMatchStatus, getUserById } from '../../../../api';
import { MatchContext, UserContext } from '../../../../contexts';
import styles from './MatchReadyScreen.style';
import { colors, calcReal, calculateTime } from '../../../../Assets/config';

const WAIT_TEXT = 'Failing to accept may result in a temporary match making ban';

const MatchReadyScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [user] = useContext(UserContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [startedTime] = useState(moment().add(30, 'seconds'));
  const [accepted, setAccepted] = useState(false);

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
      <View style={styles.header} />
      <View style={styles.searchContainer}>
        <Text style={styles.itemTitle}>Your Match is ready</Text>
        <ProgressCircle
          percent={-currentTime / 0.3}
          radius={calcReal(80)}
          borderWidth={calcReal(6)}
          color={colors.loginColor}
          shadowColor={colors.grayBackground}
          bgColor={colors.steamBlack}
        >
          <Text style={styles.itemTitle}>
            {calculateTime(-currentTime)}
          </Text>
        </ProgressCircle>
        <Text style={styles.itemText}>
          {WAIT_TEXT}
        </Text>
      </View>
      {accepted
        ? (<ActivityIndicator color={colors.loginColor} />)
        : (
          <ConfirmButton
            color={colors.loginColor}
            label="ACCEPT"
            onClick={acceptMatchRequest}
            fontStyle={styles.fontSpacing}
            containerStyle={styles.mh48}
          />
        )}
      <View style={styles.space} />
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="CANCEL"
        onClick={() => cancelMatchRequest()}
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
