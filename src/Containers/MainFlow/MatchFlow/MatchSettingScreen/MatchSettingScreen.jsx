// @flow
import React, {
  useContext, useCallback, useState, useEffect,
} from 'react';
import {
  Text, View, ScrollView, ActivityIndicator, Linking, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import {
  find, get, map,
} from 'lodash';
import queryString from 'query-string';
import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomDropdown from '../../../../Components/CustomDropdown';
import styles from './MatchSettingScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext, UserContext } from '../../../../contexts';
import {
  getGames, createMatch, signInWithSteam,
} from '../../../../api';
import { steamSigninUrl } from '../../../../constants/oauth';

const restrictionLevels = [
  'Everyone',
  'FollowersOnly',
  'SubsOnly',
  'PasswordProtected',
];

const MatchSettingScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);

  const initData = useCallback(async () => {
    try {
      const apiGames = await getGames();
      setGames(apiGames);
    } catch (err) {
      //
    }
  });

  const handleOpenURL = useCallback(async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1]);
      let apiResponse;

      try {
        apiResponse = await signInWithSteam(parsedParams);

        setUser(apiResponse.user);
      } catch (err) {
        Alert.alert('Error', 'There was an error connecting the account');
      }
    }

    Linking.removeAllListeners('url');
  });

  const connectSteam = useCallback(async () => {
    Linking.addEventListener('url', handleOpenURL);
    Linking.openURL(steamSigninUrl);
  });

  const sendMatch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await createMatch(match);
      if (response && response.matchStatus === 'match_requested') {
        setMatch({
          ...match,
          match: response,
        });
        navigation.navigate('MatchTimerScreen');
      }
    } catch (err) {
      Alert.alert('Error', 'There was an error creating your game');
    }
    setLoading(false);
  }, [match]);

  useEffect(() => { initData(); }, []);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <View style={styles.header} />
      {get(user, 'apps.steam')
        ? (
          <>
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
              {loading
                ? (<ActivityIndicator color={colors.loginColor} size="large" />)
                : (
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
                )}
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
          </>
        )
        : (
          <ConfirmButton
            color={colors.loginColor}
            label="CONNECT STEAM"
            onClick={connectSteam}
            fontStyle={styles.fontSpacing}
            containerStyle={styles.mh48}
          />
        )}
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
