// @flow
import React, {
  useContext, useCallback, useState,
} from 'react';
import {
  Text, View, Linking, Alert, ScrollView, Image, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  find, get, map,
} from 'lodash';
import queryString from 'query-string';
import ConfirmButton from '../../../../Components/ConfirmButton';
import HeaderComponent from '../../../../Components/HeaderComponent';
import CustomDropdown from '../../../../Components/CustomDropdown';
import CustomInput from '../../../../Components/CustomInput';
import LoadingComponent from '../../../../Components/LoadingComponent';
import styles from './MatchSettingScreen.style';
import { colors } from '../../../../Assets/config';
import { MatchContext, UserContext, LocalizationContext } from '../../../../contexts';
import {
  getGames, createMatch, signInWithSteam,
} from '../../../../api';
import { steamSigninUrl } from '../../../../constants/oauth';
import {
  settingsIcon, searchIcon, gameBackgroundTemp1, gameBackgroundTemp2, gameBackgroundTemp3,
} from '../../../../Assets';

const restrictionLevels = [
  'Everyone',
  'FollowersOnly',
  'SubsOnly',
  'PasswordProtected',
];

const supportedGames = [
  {
    image: gameBackgroundTemp1,
    index: 0,
  },
  {
    image: gameBackgroundTemp2,
    index: 1,
  },
  {
    image: gameBackgroundTemp3,
    index: 2,
  },
];

const MatchSettingScreen = ({ navigation }) => {
  const [match, setMatch] = useContext(MatchContext);
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const { translations } = useContext(LocalizationContext);

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

      try {
        const signedInUser = await signInWithSteam(parsedParams);
        setUser(signedInUser);
      } catch (err) {
        Alert.alert(translations['alert.error.title'], translations['alert.error.connect']);
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
      Alert.alert(translations['alert.error.title'], translations['alert.error.game.create']);
    }
    setLoading(false);
  }, [match]);

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
      <KeyboardAwareScrollView
        bounces={false}
      >
        <NavigationEvents
          onWillFocus={() => initData()}
        />
        {get(user, 'apps.steam')
          ? (
            <>
              <ScrollView
                style={styles.searchContainer}
                contentContainerStyle={styles.padding0}
              >
                <View style={styles.topContainer}>

                  <View style={styles.rowContainer}>
                    <CustomDropdown
                      label={translations['match.setting.game.type']}
                      labelStyle={styles.blackColor}
                      containerStyle={[styles.flexContainer, styles.mr16]}
                      options={map(get(match, 'game.gameTypes'), (gameType) => gameType.type)}
                      value={get(match, 'gameType.type')}
                      onUpdateValue={(value) => setMatch({
                        ...match,
                        gameType: find(get(match, 'game.gameTypes'), (gameType) => gameType.type === value),
                        gameMode: undefined,
                      })}
                    />
                    <CustomDropdown
                      label={translations['match.setting.game.mode']}
                      labelStyle={styles.blackColor}
                      containerStyle={styles.flexContainer}
                      options={get(match, 'gameType.gameModes', [])}
                      value={get(match, 'gameMode')}
                      onUpdateValue={(val) => setMatch({ ...match, gameMode: val })}
                    />
                  </View>
                  <CustomDropdown
                    label={translations['match.setting.game.criteria']}
                    labelStyle={styles.blackColor}
                    containerStyle={styles.inputContainer}
                    options={restrictionLevels}
                    value={match.restrictionLevel}
                    onUpdateValue={(val) => setMatch({ ...match, restrictionLevel: val })}
                  />
                  {/* <CustomDropdown
                  label="GAME"
                  labelStyle={styles.blackColor}
                  containerStyle={styles.inputContainer}
                  options={map(games, (storeGame) => storeGame.gameName)}
                  value={get(match, 'game.gameName', '')}
                  onUpdateValue={(value) => setMatch({
                    ...match,
                    game: find(games, (storeGame) => storeGame.gameName === value),
                  })}
                /> */}
                  {/* <CustomDropdown
                  label="SELECT STREAMER"
                  labelStyle={styles.blackColor}
                  containerStyle={styles.inputContainer}
                  options={streamerOptions}
                  value={streamer}
                  onUpdateValue={(val) => this.setState({ streamer: val })}
                /> */}
                  <View style={styles.rowContainer}>
                    <CustomDropdown
                      label={translations['match.setting.game.region']}
                      labelStyle={styles.blackColor}
                      containerStyle={[styles.flexContainer, styles.mr16]}
                      options={map(games, (storeGame) => storeGame.gameName)}
                      value={get(match, 'game.gameName', '')}
                      onUpdateValue={(value) => setMatch({
                        ...match,
                        game: find(games, (storeGame) => storeGame.gameName === value),
                      })}
                    />
                    <CustomInput
                      label={translations['global.password']}
                      labelStyle={[styles.blackColor, styles.mv10]}
                      autoCorrect={false}
                      disabled={get(match, 'restrictionLevel') !== 'PasswordProtected'}
                      autoCapitalize="none"
                      value={get(match, 'password')}
                      onUpdateValue={(val) => setMatch({ ...match, password: val })}
                      borderColor={
                      (match.password || '').length === 0
                      && get(match, 'restrictionLevel') === 'PasswordProtected'
                        ? colors.red : colors.grayOpacity
                    }
                      containerStyle={styles.flexContainer}
                    />
                  </View>
                  <View style={styles.space} />
                  <ConfirmButton
                    color={colors.loginColor}
                    label={translations['match.setting.title']}
                    onClick={() => { sendMatch(); }}
                    fontStyle={styles.fontSpacing}
                    disabled={loading}
                  />
                </View>
                <Text style={styles.supportText}>
                  {translations['match.setting.supported']}
                </Text>
                <ScrollView horizontal contentContainerStyle={styles.gamesContainer}>
                  {supportedGames.map((item) => (
                    <Image source={item.image} key={`supported-${item.index}`} style={styles.gamesItem} />
                  ))}
                </ScrollView>
              </ScrollView>
            </>
          )
          : (
            <ConfirmButton
              color={colors.loginColor}
              label={translations['global.connect.steam']}
              onClick={connectSteam}
              fontStyle={styles.fontSpacing}
              containerStyle={styles.mh48}
            />
          )}
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
