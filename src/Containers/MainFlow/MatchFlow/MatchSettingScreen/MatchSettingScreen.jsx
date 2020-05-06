// @flow
import React, {
  useContext, useCallback, useState, useEffect,
} from 'react';
import {
  Text, View, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';
import {
  find, get, map,
} from 'lodash';

import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomDropdown from '../../../../Components/CustomDropdown';
import styles from './MatchSettingScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext, UserContext } from '../../../../contexts';
import { getGames, checkToken, createMatch } from '../../../../api';
import { setApiClientHeader } from '../../../../constants/api-client';

const restrictionLevels = [
  'Everyone',
  'FollowersOnly',
  'SubsOnly',
  'PasswordProtected',
];

const MatchSettingScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [, setUser] = useContext(UserContext);
  const [games, setGames] = useState([]);

  const initData = useCallback(async () => {
    try {
      const apiGames = await getGames();
      setGames(apiGames);
    } catch (err) {
      //
    }
  });

  const sendMatch = useCallback(async () => {
    try {
      const data = await checkToken();
      setUser(data.user);
      setApiClientHeader('Authorization', `Bearer ${data.authToken}`);
      await AsyncStorage.setItem('AuthToken', data.authToken);
      const response = await createMatch(match);
      if (response && response.matchStatus === 'match_requested') {
        setMatch({
          ...match,
          match: response,
        });
        navigation.navigate('MatchTimerScreen');
      }
    } catch (err) {
      //
    }
  }, [match]);

  useEffect(() => { initData(); }, []);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      <ScrollView
        style={styles.searchContainer}
        contentContainerStyle={styles.padding0}
      >
        <Text style={[styles.itemTitle, styles.fontSpacing]}>
          GAME SETTINGS
        </Text>
        <CustomDropdown
          label="GAME"
          labelStyle={styles.whiteColor}
          containerStyle={styles.inputContainer}
          options={map(games, (storeGame) => storeGame.gameName)}
          value={get(match, 'game.gameName', '')}
          onUpdateValue={(value) => setMatch({
            ...match,
            game: find(games, (storeGame) => storeGame.gameName === value),
          })}
        />
        <CustomDropdown
          label="GAME TYPE"
          labelStyle={styles.whiteColor}
          containerStyle={styles.inputContainer}
          options={map(get(match, 'game.gameTypes'), (gameType) => gameType.type)}
          value={get(match, 'gameType.type')}
          onUpdateValue={(value) => setMatch({
            ...match,
            gameType: find(get(match, 'game.gameTypes'), (gameType) => gameType.type === value),
            gameMode: undefined,
          })}
        />
        <View style={styles.rowContainer}>
          <CustomDropdown
            label="GAME MODE"
            labelStyle={styles.whiteColor}
            containerStyle={styles.flexContainer}
            options={get(match, 'gameType.gameModes', [])}
            value={get(match, 'gameMode')}
            onUpdateValue={(val) => setMatch({ ...match, gameMode: val })}
          />
          {/* <CustomDropdown
              label="REGION"
              labelStyle={styles.whiteColor}
              containerStyle={[styles.flexContainer, styles.ml20]}
              options={regionOption}
              value={region}
              onUpdateValue={(val) => this.setState({ region: val })}
            /> */}
        </View>
        {/* <CustomDropdown
            label="SELECT STREAMER"
            labelStyle={styles.whiteColor}
            containerStyle={styles.inputContainer}
            options={streamerOptions}
            value={streamer}
            onUpdateValue={(val) => this.setState({ streamer: val })}
          /> */}
        <CustomDropdown
          label="CREATE MATCH"
          labelStyle={styles.whiteColor}
          containerStyle={styles.inputContainer}
          options={restrictionLevels}
          value={match.restrictionLevel}
          onUpdateValue={(val) => setMatch({ ...match, restrictionLevel: val })}
        />
        <View style={styles.space} />
        <ConfirmButton
          color={colors.loginColor}
          label="MATCH UP"
          onClick={() => {
            if (match.restrictionLevel === 'PasswordProtected') {
              navigation.navigate('MatchPasswordScreen');
            } else {
              sendMatch();
            }
          }}
          fontStyle={styles.fontSpacing}
          containerStyle={styles.mh48}
        />
      </ScrollView>
      <View style={styles.space} />
      <ConfirmButton
        borderColor={colors.secondaryOpacity}
        textColor={colors.grayText}
        label="SEARCH GAME"
        onClick={() => navigation.replace('MatchSearchScreen')}
        fontStyle={styles.fontSpacing}
        containerStyle={styles.mh48}
      />
      <View style={styles.space} />
    </SafeAreaView>
  );
};

MatchSettingScreen.propTypes = {
  Secrets: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    secretsData: PropTypes.shape(),
    error: PropTypes.any,
  }).isRequired,
  navigation: PropTypes.shape().isRequired,
};

export default MatchSettingScreen;
