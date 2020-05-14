// @flow
import React, {
  useContext, useCallback, useState,
} from 'react';
import {
  Text, View, Linking, Alert, ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  find, get, map,
} from 'lodash';
import queryString from 'query-string';
import AsyncStorage from '@react-native-community/async-storage';
import ConfirmButton from '../../../../Components/ConfirmButton';
import CustomDropdown from '../../../../Components/CustomDropdown';
import CustomInput from '../../../../Components/CustomInput';
import LoadingComponent from '../../../../Components/LoadingComponent';
import styles from './MatchSettingScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext, UserContext } from '../../../../contexts';
import {
  getGames, createMatch, signInWithSteam,
} from '../../../../api';
import { steamSigninUrl } from '../../../../constants/oauth';
import { setApiClientHeader } from '../../../../constants/api-client';

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
      const realMatch = get(match, 'match');
      if (realMatch && realMatch.matchStatus && realMatch.matchStatus !== 'match_ended') {
        switch (realMatch.matchStatus) {
          case 'match_requested':
            navigation.navigate('MatchTimerScreen');
            break;
          case 'match_accepted':
          case 'invites_sent':
          case 'match_started':
            navigation.navigate('LobbyStartScreen');
            break;
          case 'players_found':
            navigation.navigate('MatchReadyScreen');
            break;
          default:
            break;
        }
        return;
      }
      setLoading(true);
      const apiGames = await getGames();
      setGames(apiGames);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  });

  const handleOpenURL = useCallback(async (params) => {
    if (params.url) {
      const parsedParams = queryString.parse(params.url.split('?')[1].replace(/(openid)(.)([a-z_]+)(=)/g, '$1_$3$4'));
      let apiResponse;

      try {
        apiResponse = await signInWithSteam(parsedParams);
        setApiClientHeader('Authorization', `Bearer ${apiResponse.authToken}`);
        await AsyncStorage.setItem('AuthToken', apiResponse.authToken);
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

      if (response) {
        setMatch({
          ...match,
          match: response,
        });

        switch (response.matchStatus) {
          case 'match_requested':
            navigation.navigate('MatchTimerScreen');
            break;
          case 'match_accepted':
          case 'invites_sent':
            navigation.navigate('LobbyStartScreen');
            break;
          case 'players_found':
            navigation.navigate('MatchReadyScreen');
            break;
          default:
            break;
        }
      }
    } catch (err) {
      Alert.alert('Error', 'There was an error creating your game');
    }
    setLoading(false);
  }, [match]);

  return (
    <SafeAreaView
      forceInset={{ bottom: 'never', top: 'never' }}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.contentIntent}
      >
        <NavigationEvents
          onWillFocus={() => initData()}
        />
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
                {get(match, 'restrictionLevel') === 'PasswordProtected' && (
                <CustomInput
                  label="Password"
                  labelStyle={styles.whiteColor}
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={get(match, 'password')}
                  onUpdateValue={(val) => setMatch({ ...match, password: val })}
                  borderColor={(match.password || '').length === 0 ? colors.red : colors.grayOpacity}
                  containerStyle={styles.inputContainer}
                />
                )}

                <View style={styles.space} />
                <ConfirmButton
                  color={colors.loginColor}
                  label="MATCH UP"
                  onClick={() => { sendMatch(); }}
                  fontStyle={styles.fontSpacing}
                  disabled={loading}
                />
              </ScrollView>
              <Text style={styles.orText}>OR</Text>
              <ConfirmButton
                borderColor={colors.secondary}
                textColor={colors.grayText}
                label="SEARCH GAME"
                onClick={() => navigation.navigate({ key: 'MatchSearchScreen', routeName: 'MatchSearchScreen' })}
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
      </KeyboardAwareScrollView>
      {loading && (
        <LoadingComponent />
      )}
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
